import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { YuGiOhItem } from 'src/features/components/yugioh/ItemPage'
import { constUrl } from 'src/features/constant/constURL'

const Item: NextPage = () => {
  const router = useRouter()
  const [nftData, setNftData] = useState<any>()
  // const collectionAddress = "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c";
  // const collectionAddress = "0x739b366548117dd5bef5b8b5573246de841af950";
  // const collectionAddress = "0x5d424ce3fe2c56f2cee681f0c44ae965b41e9043";
  const collectionAddress = '0x739b366548117dd5bef5b8b5573246de841af950' // OMOCHI_Goerli Network
  // const [collectionData, setCollectionData] = useState<any>();

  useEffect(() => {
    console.log(router.query.tokenid)
    if (router.query.tokenid) {
      axios
        // .get(`${constUrl.alchemyMumbaiNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata/`, {
        .get(
          `${constUrl.alchemyGoerliNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata/`,
          {
            params: {
              contractAddress: collectionAddress,
              tokenId: router.query.tokenid,
            },
          }
        )
        .then((res) => {
          setNftData(res?.data)
        })
    }
  }, [router.query.tokenid])

  // console.log(nftData);

  if (nftData) {
    return (
      <>
        <ChakraProvider>
          <YuGiOhItem
            nftdata={nftData}
            contractAddress={collectionAddress}
            tokenId={parseInt(router.query.tokenid as string, 10)}
          />
        </ChakraProvider>
      </>
    )
  } else {
    return <></>
  }
}

export default Item
