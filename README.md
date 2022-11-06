【サービス概要】

- サービス名：「Orderbook」
- 主要マーケットプレイスの売買注文を集約し、単一のAPIで流動性を提供する
- APIだけでなくSDKも提供

【解決したい課題】

- 現在あらゆるマーケットプレイスがNFTのn次流通から起きるロイヤリティを0%にし始めている
- NFT事業者はロイヤリティというモデルだけではなく、よりサステナブルなビジネスモデルに転換することが求められている

【解決へのアプローチ】

- 自社のマーケットプレイスやOpenSea、LooksRareなどを横断してNFTの売買注文を集約し、単一のAPIで流動性を提供

【工夫した点】

- APIファーストにすることで多くのフロントエンドからアクセス可能な単一の流動性プールを共有することができる
- APIだけでなくSDKも用意、ユーザは自由に選択できる

### 使用したtech stack
Docker, NestJS, Redis, Postges, Prisma, Bull, WAGMI, Ethers.js, Next.js, ChakraUI, Solidity

### 使用したBlockchain
Ethereum Testnet (Goerli)

### DeployしたContract

デモ用マーケットプレイス
- 0xe20c7f1208e258873Ccd16c4cd68754f18B6631c

デモ用NFTコレクション
- 0xd79bd2d47ae835e61e6cd9471b5b52efeee40fba
- 0x410c317e057555d0a979da029ea5fb05521bf803
- 0xf0c75430ceb4aa92d624f4d3b30a9eb5a3ef5cb5

---

### コントラクト
```
cd contracts
npm install
npx hardhat compile
```

### バックエンド

URL: http://localhost:3001

OpenAPI: http://localhost:3001/api

```
cd backend
yarn install
yarn db:dev:up # yarn db:dev:restart
yarn start:dev
```
Postgresをブラウザで閲覧・操作
```
npx prisma studio
```

マイグレーション（backend/prisma/schema.prismaを変更した場合）
```
npx prisma migrate dev
yarn db:dev:restart
```

### フロントエンド

URL: http://localhost:3000

```
cd frontend
yarn install
yarn dev
```
