import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { YuGiOhItem } from 'src/features/components/yugioh/ItemPage'
import { constUrl } from 'src/features/constant/constURL'

const Item: NextPage = () => {
  const router = useRouter()
  const [nftData, setNftData] = useState<any>();
  const [nftAllData, setNftAllData] = useState<any>();
  // const collectionAddress = "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c";
  // const collectionAddress = "0x739b366548117dd5bef5b8b5573246de841af950";
  // const collectionAddress = "0x5d424ce3fe2c56f2cee681f0c44ae965b41e9043";
  // const collectionAddress = "0x739b366548117dd5bef5b8b5573246de841af950"; // OMOCHI_Goerli Network
  const collectionAddress = '0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741';
  // const [collectionData, setCollectionData] = useState<any>();

  // console.log('addr, id');

  useEffect(() => {
    // console.log(router.query.tokenId, router.query.contractAddress);
    if (router.query.tokenId && router.query.contractAddress) {
      console.log(`${constUrl.alchemyGoerliNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata/`);
      axios
        // .get(`${constUrl.alchemyMumbaiNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata/`, {
        .get(
          `${constUrl.alchemyGoerliNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata/`,
          {
            params: {
              contractAddress: router.query.contractAddress,
              tokenId: router.query.tokenId,
            },
          }
        )
        .then((res) => {
          setNftData(res?.data)
        })
    }
  }, [router.query.tokenId, router.query.contractAddress]);

  useEffect(() => {
    if (router.query.tokenId && router.query.contractAddress) {
      console.log(`${constUrl.orderbookApiURL}/nft/${router.query.contractAddress}/${router.query.tokenId}`);
      axios
        .get(`${constUrl.orderbookApiURL}/nft/${router.query.contractAddress}/${router.query.tokenId}`)
        .then((res) => {
          setNftAllData(res?.data);
        })
    }
  }, [router.query.tokenId, router.query.contractAddress]);

  // useEffect(() => {
  //   console.log("nftdata:", router.query?.nftData);
  // }, [router.query.nftData]);

  // console.log("nftData", router.query?.nftData);

  // console.log(nftData);

  if (nftAllData) {
    return (
      <>
        <ChakraProvider>
          <YuGiOhItem
            nftdata={nftData}
            contractAddress={router.query.contractAddress as string}
            tokenId={parseInt(router.query.tokenId as string, 10)}
            nftAllData={nftAllData}
          />
        </ChakraProvider>
      </>
    )
  } else {
    return <></>
  }
}

export default Item
