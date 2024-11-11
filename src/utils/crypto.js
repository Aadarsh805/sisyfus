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
