export type TrendCardDataType = {
  collectionAddress: string
  tokenId: number
  imageURL: string
}

export type TrendDataType = {
  title: string
  subTitle: string
  deck: TrendCardDataType[]
}

export type TrendDataListType = TrendDataType[]
