# Sisyfus🍊

Sisyfus, rolling Bitcoin privacy forward with programmable stealth addresses on [Citrea](https://citrea.xyz/). Cheap and native Bitcoin stealth address achieved through verifieble off-chain cryptography.

![image](https://github.com/user-attachments/assets/db25f007-090a-4137-ad3b-04a7a0a48a27)

# Get Started

The product contains three code bases, a Registry contract to maintain stealth meta addresses, and client to generate and interact with the stealth address. The relayer code base is still in progress. Also you may take a look at a crypto utility file inspired from [Umbra](https://www.umbra.cash/) to generate and handle stealth addresses.

1. [Contracts](https://github.com/leostelon/sisyfus/tree/main/src/contracts)
2. [CLI](https://github.com/leostelon/sisyfus)
3. [Crypto](https://github.com/leostelon/sisyfus/blob/main/src/utils/crypto.js)

**Website**

[Sisyfus.xyz](https://sisyfus.xyz)

# Technology

- Node.js and Express.js server, hosted on **Spheron Decentralized Compute** [[know more]](https://spheron.network/#decentralised-compute)
- Database, **Polybase** is the database for web3. [[know more]](https://polybase.xyz/) - Find schemas and logic [here](https://github.com/leostelon/dedock-server/tree/main/src/polybase).
- Docker images are stored in Decentralized storage using **Spheron Storage SDK**, [[know more]](https://spheron.network/#storage-sdk)
- React.js, hosted on **Spheron Decentralized Hosting** [[know more]](https://spheron.network/#decentralized-hosting)

Follow belows steps to run it locally.

## Server⚙️

⚠️Work in progress to build a relayer⚠️

## Client💻

1.  Clone Repo.
    > $ git clone https://github.com/leostelon/sisyfus sisyfus
    > $ cd sisyfus
2.  Change the contract address to the one you have deployed or use the one which already exists. (Optional)Add the .env file in the root directory. Replace the value accordingly.

          REGISTRY_CONTRACT=<< YOU CA HERE>>

3.  Run client!
    > $ npm run dev

## Todo👨‍💻

- [x] MVP
- [x] Registry
- [ ] Simple relayer using bitcoin webhooks.
- [ ] Trusted Relayer.
