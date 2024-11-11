import * as secp256k1 from "@noble/secp256k1";

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

function uintArrayToHex(uintArray) {
  return Array.from(uintArray) // Convert the Uint8Array to a regular array
    .map((byte) => byte.toString(16).padStart(2, "0")) // Convert each byte to a 2-digit hex string
    .join("");
}
