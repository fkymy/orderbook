import { Box, HStack, Flex, Text, Grid, Center, Spacer } from '@chakra-ui/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import NextImage, { StaticImageData } from 'next/image'
import { constUrl } from '../constant/constURL'
import { useCollectionData } from '../hooks/useNFTContractsAddress'
import { useOpenseaAssetsData } from '../hooks/useOpenseaAssetsData'
import { Item } from './Item'
import { CreateForm } from './form'
import { MarketPlace } from './marketPlace'
import qs from 'qs'
import { SkeletonMarketPlace } from './skeltonMarketPlace'
import Logo from './assets/logo.png';
import { ApiDoc } from './apiDoc'


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
      <Center height="56px" width="100%" bg="#000000" borderBottomWidth="1px" borderBottomColor="#4c4c4c">
        {/* <HStack>
          <Text color="#ffffff">
            Order Boo
          </Text>
        </HStack> */}
        <Box width="100%" marginLeft="24px">
          <NextImage
            src={Logo}
            width="170px"
            height="24px"
          />
        </Box>
      </Center>
      <HStack minH={'100vh'} width={'100%'} spacing={0}>
        <Box
          style={{
            width: '468px',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            // maxHeight: '250px'
            // overflowY: 'scroll',
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
          <Box padding="25px 64px" bg="#000000">
            <Box style={{
              position: "absolute",
              width: "499px",
              height: "492px",
              left: "1000px",
              top: "50px",
              background: "linear-gradient(135deg, rgba(151, 150, 152, 0.4) 2.88%, rgba(221, 166, 250, 0.47) 98.14%)",
              filter: "blur(73.5px)",
              transform: "rotate(-90.23deg)",
            }}>

            </Box>
            <Box width="100%">
              <Flex>
                <Center h="44px" alignContent="center">
                  <Text color="#ffffff">
                    プレビュー
                  </Text>
                </Center>
                <Spacer/>
                <Grid width="420px" templateColumns="1fr 1fr" borderRadius="12px" bg="#1C1C1C" padding="4px" h="44px">
                  <Center bg={previewMode === 'market' ? '#4D4D4D' : '#1C1C1C'} borderRadius="10px" color="#ffffff">
                    <Text fontSize="14px" as="b">
                      テンプレート
                    </Text>
                  </Center>
                  <Center bg={previewMode === 'market' ? '#1c1c1c' : '#4d4d4d'} borderRadius="10px" color="#ffffff">
                    <Text fontSize="14px" as="b">
                      API
                    </Text>
                  </Center>
                </Grid>
                <Spacer/>
                <Text>
                  {`　　　　`}
                </Text>
              </Flex>
            </Box>
            <Box 
              marginTop="36px"
              borderWidth="1px"
              borderColor="#4c4c4c"
              borderRadius="4px"
            >
              {
                previewMode === 'market' ? (
                  collectionAddressList.length > 0
                    ? <MarketPlace
                        collectionData={collectionData}
                        style={{
                          collectionDescription: collectionDescription,
                          serviceName: serviceName
                        }}
                      />
                    : <SkeletonMarketPlace
                        collectionData={collectionData}
                        style={{
                          collectionDescription: collectionDescription,
                          serviceName: serviceName
                        }}
                      />
                ) : (
                  <ApiDoc/>
                )
              }
              {/* {collectionData ? (
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
                <></>
              )} */}
            </Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  )
}
