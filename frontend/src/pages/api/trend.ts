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
      title: 'Yu-Gi-Oh! CHAMPIONSHIP SERIES JAPAN OSAKA 2022',
      subTitle: '優勝者デッキ',
      deck: [
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 8,
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 1,
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 2,
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 3,
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
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 5,
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 2,
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 1,
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
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 1,
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 7,
        },
        {
          collectionAddress: '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741',
          tokenId: 5,
        },
      ],
    },
  ])
}
