import { Box, HStack } from '@chakra-ui/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { constUrl } from '../constant/constURL'
import { useCollectionData } from '../hooks/useNFTContractsAddress'
import { useOpenseaAssetsData } from '../hooks/useOpenseaAssetsData'
import { Item } from './Item'
import { CreateForm } from './form'
import { MarketPlace } from './marketPlace'
import qs from 'qs'

export function ConnectedTop() {
  const [previewMode, setPreviewMode] = useState('market')
  const [collectionData, setCollectionData] = useState<any>()
  const [collectionAddress, setCollectionAddress] = useState<string>('')
  const [collectionDescription, setCollectionDescription] = useState<string>('')
  const [serviceName, setServiceName] = useState("")
  const [collectionAddressList, setCollectionAddressList] = useState<string[]>([]);
  // 0xd79bd2d47ae835e61e6cd9471b5b52efeee40fba
  // 0x410c317e057555d0a979da029ea5fb05521bf803
  // 0xf0c75430ceb4aa92d624f4d3b30a9eb5a3ef5cb5

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

  useEffect(() => {
    console.log("collection address list", collectionAddressList);
    if (collectionAddressList.length > 0) {
      axios
        .get(
          // order_direction=desc&offset=0&limit=50&include_orders=false
          `${constUrl.openseaV1TestnetURL}/assets`, {
            params: {
              asset_contract_addresses: collectionAddressList,
              order_direction: "desc",
              offset: 0,
              limit: 50,
              include_orders: false,
            },
            paramsSerializer: {
              serialize: function(params) {
                return qs.stringify(
                  params, {
                    arrayFormat: 'repeat'
                  }
                )
              }
            }
          }
        )
        .then((res) => {
          console.log("response", res);
          setCollectionData(res);
        })
    }
  }, [collectionAddressList]);

  console.log('collection', collectionData)
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
            collectionAddressList={collectionAddressList}
            setCollectionAddressList={setCollectionAddressList}
            collectionDescription={collectionDescription}
            setCollectionDescription={setCollectionDescription}
            serviceName={serviceName}
            setServiceName={setServiceName}
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
          {/* {collectionAddress != '' ? ( */}
          {collectionData ? (
            previewMode == 'market' ? (
              <MarketPlace
                collectionData={collectionData}
                style={{
                  collectionDescription: collectionDescription,
                  serviceName: serviceName
                }}
              />
            ) : (
              <>API Page</>
              // <Item nftdata={collectionData?.data?.nfts[0]} />
            )
          ) : (
            'Loading'
          )}
        </Box>
      </HStack>
    </Box>
  )
}
