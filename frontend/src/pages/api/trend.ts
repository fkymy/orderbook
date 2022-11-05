// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TrendDataListType, TrendDataType } from 'src/types/trendData'

// interface Data {
//   collectionAddress: string;
//   tokenId: number;
// }
// type newData = Data[][]

export default function handler(req: NextApiRequest, res: NextApiResponse<TrendDataListType>) {
  res.status(200).json([
    {
      title: '遊戯玉 CHAMPIONSHIP SERIES JAPAN OSAKA 2022',
      subTitle: '優勝者デッキ',
      deck: [
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 8,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/8.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 1,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/1.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 2,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/2.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 3,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/3.jpg",
        },
      ],
    },
    {
      title: '日本選手権 2022',
      subTitle: '優勝者デッキ',
      deck: [
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 4,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/4.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 5,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/5.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 2,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/2.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 1,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/1.jpg",
        },
      ],
    },
    {
      title: 'COLLEGE CHAMPIONSHIP 2022',
      subTitle: '優勝者デッキ',
      deck: [
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 2,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/2.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 1,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/1.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 7,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/7.jpg",
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 5,
          imageURL: "https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/5.jpg",
        },
      ],
    },
  ])
}
