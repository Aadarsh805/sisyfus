# Sisyfus🍊

Sisyfus, rolling Bitcoin privacy forward with programmable stealth addresses on [Citrea](https://citrea.xyz/). Cheap and native Bitcoin stealth address achieved through verifiable off-chain cryptography.

[![Discord Image 1](https://private-user-images.githubusercontent.com/95094057/385163238-db25f007-090a-4137-ad3b-04a7a0a48a27.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzEzOTI2NDEsIm5iZiI6MTczMTM5MjM0MSwicGF0aCI6Ii85NTA5NDA1Ny8zODUxNjMyMzgtZGIyNWYwMDctMDkwYS00MTM3LWFkM2ItMDRhN2EwYTQ4YTI3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTEyVDA2MTkwMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZiYzNjOGZhN2U2ZDMwYTNjNDE4ZGFmZDBiNjliMzEzM2UzMGFkMDI0MWM5ODc2ZGIxM2E3MjAzYTAzNzIxNjgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0._ciQiTi83do6HZDETytjPVU74_MMi6Phof9qQ4XOWds)](https://vitalik.eth.limo/general/2023/01/20/stealth.html)

---

## Get Started

The product contains three code bases: a **Registry contract** to maintain stealth meta addresses, and a **client** to generate and interact with the stealth address. The relayer code base is still in progress. You may also take a look at the crypto utility file inspired by [Umbra](https://www.umbra.cash/) to generate and handle stealth addresses.

1. [Contracts](https://github.com/leostelon/sisyfus/tree/main/src/contracts)
2. [CLI](https://github.com/leostelon/sisyfus)
3. [Crypto](https://github.com/leostelon/sisyfus/blob/main/src/utils/crypto.js)

**Website**: [Sisyfus.xyz](https://sisyfus.xyz)

## Technology

- **Citrea Chain**: Integrated with **Citrea Chain** for blockchain interactions, bringing decentralized infrastructure to the project. [[Learn more]](https://citrea.xyz).
- **Next.js** for frontend development, utilizing **React** and **TypeScript**, hosted on **Vercel**.

---

### Citrea Usage in Sisyfus:

1. **Registry Maintenance**:
   - Leo registers his **stealth meta-address** (M) on **Citrea** using the **ENS registry** (`leo.crypto`).

2. **BTC to CBTC Deposit**:
   - Jane deposits BTC into a **BTC-to-CBTC bridge**.
   - The bridge locks BTC on Bitcoin and mints **CBTC** on **Citrea**.

3. **CBTC Transfer**:
   - Jane generates a **stealth address** using her ephemeral key and Leo’s meta-address.
   - Sends **CBTC** to Leo’s stealth address on **Citrea**.

4. **Withdrawal (CBTC to BTC)**:
   - Leo requests to withdraw **CBTC** back to **Bitcoin** via the **CBTC-to-BTC bridge**.
   - **CBTC** is locked and **BTC** is released to Leo’s Bitcoin address.

### Citrea's Role:
- Stores and manages **stealth addresses** and **ephemeral keys**.
- Facilitates **BTC-to-CBTC bridging** and **CBTC transfers**.
- Allows **CBTC-to-BTC withdrawal**.

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
    REGISTRY_CONTRACT=<< YOUR CONTRACT HERE >>
    ```

4. Run the client!
> $ npm run dev

## Todo👨‍💻
- [x] MVP
- [x] Registry
- [ ] Simple relayer using Bitcoin webhooks
- [ ] Trusted Relayer
