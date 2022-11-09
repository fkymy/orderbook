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
