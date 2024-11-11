// Utility functions from
// https://github.com/ScopeLift/stealth-address-sdk/tree/main/src/utils/crypto
import * as secp256k1 from "@noble/secp256k1";
import { hexToBytes, keccak256 } from "viem";
import {
  publicKeyToAddress as publicKeyToAddressViem,
  bytesToHex,
} from "viem/utils";

function randomPrivateKey() {
  var randPrivateKey = secp.utils.randomPrivateKey();
  return BigInt(`0x${Buffer.from(randPrivateKey, "hex").toString("hex")}`);
}

const secp = secp256k1;
let isCompressed = true;

export function getEphemeralKey() {
  const ephemeralPrivateKey = randomPrivateKey();
  const ephemeralPublicKey = uintArrayToHex(
    secp.getPublicKey(ephemeralPrivateKey, (isCompressed = true))
  );
  return ["0x" + ephemeralPrivateKey.toString(16), "0x" + ephemeralPublicKey];
}

export function generateRandomStealthMetaAddress() {
  const spendingPrivateKey = randomPrivateKey();
  const viewingPrivateKey = randomPrivateKey();
  const spendingPublicKey = uintArrayToHex(
    secp.getPublicKey(spendingPrivateKey, (isCompressed = true))
  );
  const viewingPublicKey = uintArrayToHex(
    secp.getPublicKey(viewingPrivateKey, (isCompressed = true))
  );
  const stealthMetaAddress = "st:eth:0x" + spendingPublicKey + viewingPublicKey;
  return [
    "0x" + spendingPrivateKey.toString(16),
    "0x" + viewingPrivateKey.toString(16),
    "0x" + spendingPublicKey,
    "0x" + viewingPublicKey,
    stealthMetaAddress,
  ];
}

export function getSharedSecret(ephemeralPrivateKey, viewingPrivateKey) {
  return secp.getSharedSecret(
    ephemeralPrivateKey.replace("0x", ""),
    viewingPrivateKey.replace("0x", "")
  );
}

export function getStealthPublicKey({ spendingPublicKey, hashedSharedSecret }) {
  const hashedSharedSecretPoint = secp.ProjectivePoint.fromPrivateKey(
    hexToBytes(hashedSharedSecret)
  );
  return secp.ProjectivePoint.fromHex(spendingPublicKey.replace("0x", ""))
    .add(hashedSharedSecretPoint)
    .toRawBytes(false);
}

export function computeStealthKey({
  ephemeralPublicKey,
  spendingPrivateKey,
  viewingPrivateKey,
}) {
  const sharedSecret = secp.getSharedSecret(
    viewingPrivateKey.replace("0x", ""),
    ephemeralPublicKey.replace("0x", "")
  );

  const hashedSharedSecret = getHashedSharedSecret({ sharedSecret });
  console.log("Compute Stealth Hashed Secret:", hashedSharedSecret);

  const spendingPrivateKeyBigInt = BigInt(spendingPrivateKey);
  const hashedSecretBigInt = BigInt(hashedSharedSecret);

  // Compute the stealth private key by summing the spending private key and the hashed shared secret.
  const stealthPrivateKeyBigInt = addPriv({
    a: spendingPrivateKeyBigInt,
    b: hashedSecretBigInt,
  });

  const stealthPrivateKeyHex = `0x${stealthPrivateKeyBigInt
    .toString(16)
    .padStart(64, "0")}`;

  return stealthPrivateKeyHex;
}

export function publicKeyToAddress({ publicKey }) {
    // Use viem to convert the public key to an address
    return publicKeyToAddressViem(
      typeof publicKey !== "string"
        ? bytesToHex(publicKey)
        : publicKey.replace("0x", "")
    );
  }

export function getHashedSharedSecret({ sharedSecret }) {
  return keccak256(sharedSecret);
}

function addPriv({ a, b }) {
  const curveOrderBigInt = BigInt(secp256k1.CURVE.n);
  return (a + b) % curveOrderBigInt;
}

function uintArrayToHex(uintArray) {
  return Array.from(uintArray) // Convert the Uint8Array to a regular array
    .map((byte) => byte.toString(16).padStart(2, "0")) // Convert each byte to a 2-digit hex string
    .join("");
}
