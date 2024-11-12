# Sisyfus🍊

 
Sisyfus, rolling Bitcoin privacy forward with programmable stealth addresses on [Citrea](https://citrea.xyz/). Cheap and native Bitcoin stealth address achieved through verifiable off-chain cryptography.

![Home Page](https://cdn.discordapp.com/attachments/1252933761709113394/1305790512803872798/Screenshot_2024-11-12_at_2.05.11_PM.png?ex=67344fae&is=6732fe2e&hm=6e435e3d74b43655e54e9812869e160774a3b668cfcfb8a2bd5500902a68b3db&)

## Get Started

The product contains three code bases: a **registry contract** to maintain stealth meta addresses, and a **client** to generate and interact with the stealth address. The relayer code base is still in progress. You may also take a look at the crypto utility file inspired by [Umbra](https://www.umbra.cash/) to generate and handle stealth addresses.

  

1.  [Contracts](https://github.com/leostelon/sisyfus/tree/main/src/contracts)

2.  [CLI](https://github.com/leostelon/sisyfus)

3.  [Crypto](https://github.com/leostelon/sisyfus/blob/main/src/utils/crypto.js)

  

**Website**: [Sisyfus.xyz](https://sisyfus.xyz)

  

## Technology

  

-  **Citrea Chain**: Integrated with **Citrea Chain** for blockchain interactions, bringing decentralized infrastructure to the project. [[Learn more]](https://citrea.xyz).
-   **Cryptography** for frontend development, utilizing **React** and **TypeScript**, hosted on **Vercel**.

-  **Next.js** for frontend development, utilizing **React** and **TypeScript**, hosted on **Vercel**.

  

---

  

### Citrea:

  

1.  **Registry Maintenance**:

- Leo registers his **stealth meta-address** (M) on **Citrea** using the **ENS registry** (`leo.crypto`).

  

2.  **BTC to CBTC Deposit**:

- Jane deposits BTC into a **BTC-to-CBTC bridge**.

- The bridge locks BTC on Bitcoin and mints **CBTC** on **Citrea**.

  

3.  **CBTC Transfer**:

- Jane generates a **stealth address** using her ephemeral key and Leo’s meta-address.

- Sends **CBTC** to Leo’s stealth address on **Citrea**.

  

4.  **Withdrawal (CBTC to BTC)**:

- Leo requests to withdraw **CBTC** back to **Bitcoin** via the **CBTC-to-BTC bridge**.

-  **CBTC** is locked and **BTC** is released to Leo’s Bitcoin address.

  

### Citrea's Role:

- Stores and manages **stealth addresses** and **ephemeral keys**.

- Facilitates **BTC-to-CBTC bridging** and **CBTC transfers**.

- Allows **CBTC-to-BTC withdrawal**.


![](https://cdn.discordapp.com/attachments/1252933761709113394/1305797903725629482/385163238-db25f007-090a-4137-ad3b-04a7a0a48a27.png?ex=67345690&is=67330510&hm=c881e2e0c4eb8536c4add552ecf25a85c4f7fb99b00e483e1646a21a55aba5b6&)
  

---

  

## Running Locally

  

### Server⚙️

⚠️ Work in progress to build a relayer ⚠️

  

### Client💻

  

1. Clone the Repo.

> $ git clone https://github.com/leostelon/sisyfus sisyfus

> $ cd sisyfus

  

2. Change the contract address to the one you have deployed or use the existing one. (Optional) Add the `.env` file in the root directory and replace the values accordingly.

```bash

REGISTRY_CONTRACT=<<YOUR CONTRACT HERE >>

```

4. Run the client!

> $ npm run dev

  

## Todo👨‍💻

-  [x] MVP

-  [x] Registry

- [ ] Simple relayer using Bitcoin webhooks

- [ ] Trusted Relayer
