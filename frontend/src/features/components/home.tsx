import { Box, HStack } from '@chakra-ui/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { constUrl } from '../constant/constURL'
import { useCollectionData } from '../hooks/useNFTContractsAddress'
import { useOpenseaAssetsData } from '../hooks/useOpenseaAssetsData'
import { Item } from './Item'
import { CreateForm } from './form'
import { MarketPlace } from './marketPlace'

export function ConnectedTop() {
  const [previewMode, setPreviewMode] = useState('market')
  const [collectionData, setCollectionData] = useState<any>()
  const [collectionAddress, setCollectionAddress] = useState<string>('')
  const [collectionDescription, setCollectionDescription] = useState<string>('')

  // const [isGotCollectionData, setIsGotCollectionData] = useState(false);
  // const { assetsData, getAssetsData } = useOpenseaAssetsData("0x5d424ce3fe2c56f2cee681f0c44ae965b41e9043");
  // const { collectionData, getCollectionData } = useCollectionData("0x5d424ce3fe2c56f2cee681f0c44ae965b41e9043");
  // const { collectionData, getCollectionData } = useCollectionData("0x0429ac207f335E1e90C36A860404195e7b1Eb11F");

  useEffect(() => {
    // getAssetsData();
    // getCollectionData();

    // if (collectionAddress != "") {
    if (collectionAddress != '') {
      axios
        // .get(`${constUrl.alchemyMumbaiNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection/`, {
        .get(
          `${constUrl.alchemyGoerliNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection/`,
          {
            params: {
              contractAddress: collectionAddress,
              withMetadata: true,
              startToken: 0,
              limit: 100,
            },
          }
        )
        .then((res) => setCollectionData(res))
    }
  }, [collectionAddress])

  console.log('collection', collectionData?.data)
  // console.log("assets", assetsData?.data.assets[0].image_url);
  return (
    <Box width={'100%'}>
      <HStack minH={'100vh'} width={'100%'} spacing={0}>
        <Box
          style={{
            width: '350px',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            // maxHeight: '250px'
            overflowY: 'scroll',
          }}
        >
          <CreateForm
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            collectionAddress={collectionAddress}
            setCollectionAddress={setCollectionAddress}
            collectionDescription={collectionDescription}
            setCollectionDescription={setCollectionDescription}
            // isGotCollectionData={isGotCollectionData}
            // setIsGotCollectionData={setIsGotCollectionData}
          />
        </Box>
        <Box
          style={{
            width: 'calc(100vw - 350px)',
            height: '100vh',
            // minHeight: '100vh',
            backgroundColor: '#ffffff',
            overflowY: 'scroll',
          }}
        >
          {collectionAddress != '' ? (
            previewMode == 'market' ? (
              <MarketPlace
                collectionData={collectionData}
                style={{
                  collectionDescription: collectionDescription,
                }}
              />
            ) : (
              <Item nftdata={collectionData?.data?.nfts[0]} />
            )
          ) : (
            'Loading'
          )}
        </Box>
      </HStack>
    </Box>
  )
}
