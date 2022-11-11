import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Square,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { Nft } from 'alchemy-sdk'
import orderData from './yugioh/assets/demoOrderData.json';
import { useState, useEffect } from 'react'
import NextImage, { StaticImageData } from 'next/image'

import StoreLooksrareIcon from './yugioh/assets/storeIcon/looksrare.png'
import StoreOpenseaIcon from './yugioh/assets/storeIcon/opensea.png'
import StoreX2Y2Icon from './assets/storeIcon/x2y2.png'
import StoreYugidamaIcon from './yugioh/assets/storeIcon/yugidama.png'

export function getStoreIcon(store: 'seaport' | 'looks-rare' | 'orderbook') {
  switch (store) {
    case 'orderbook':
      return StoreYugidamaIcon
    case 'seaport':
      return StoreOpenseaIcon
    case 'looks-rare':
      return StoreLooksrareIcon
  }
}


const OverflowEllipsis = ({ children }: { children: string }) => (
  <div style={{ display: 'table', width: '100%' }}>
    <p
      style={{
        display: 'table-cell',
        maxWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </p>
  </div>
)

interface ItemCardProps {
  nftData: any,
  idx: number
}

function ItemCard(props: ItemCardProps) {
  // console.log("order", props?.nftData?.order?.orders);
  const [mode, setMode] = useState('card');

  if (mode === 'listing') {
    return (
      <Box
        bg='#000000' 
        maxWidth='510px' 
        // shadow='md' 
        rounded='8px' 
        borderWidth="1px" 
        borderColor="#4D4D4D" 
        color="#ffffff"
        key={props.idx}
        style={{
          // backgroundColor: "red",
          height: "100%"
        }}
      >
        <Grid templateRows="34px 1fr 36px" height="100%">
          <Center borderBottomWidth="1px" borderBottomColor="#4d4d4d">
            <Box width="100%" paddingLeft="10px">
              <Text as="b" fontSize="14px">
                すべてのリスティング
              </Text>
            </Box>
          </Center>
          <Stack padding="8px" marginTop="0px" gap="6px">
            {
              props.nftData?.order?.orders?.map((orderData, idx) => {
                // console.log(orderData);
                return (
                  <Box padding="4px 8px" bg="#4D4D4D" borderRadius="4px" key={idx}>
                    <Box>
                      <Flex>
                        <Text w="54px" fontSize="10px" color="#D8D8D8">
                          <OverflowEllipsis>
                            {orderData?.maker}
                          </OverflowEllipsis>
                        </Text>
                        <Spacer/>
                        <Text fontSize="10px" color="#FAFAFA">
                          {`あと${2}日${3}時間`}
                        </Text>
                      </Flex>
                      <Box marginTop="2px">
                        <HStack>
                          <NextImage
                            src={getStoreIcon(orderData?.kind)}
                            width="14px"
                            height="14px"
                          />
                          <Box marginLeft="6px">
                            <Text fontSize="14px">
                              <b>{`${(orderData?.price?.amount?.decimal).toFixed(2)} ETH`}</b><span style={{fontSize: "10px"}}>{` (${(orderData?.price?.amount?.decimal * 242000).toFixed(2)}円)`}</span>
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    </Box>
                    <Button color="#000000" borderRadius="4px" fontSize="10px" bg="#D8D8D8" height="22px" width="100%">
                      購入
                    </Button>
                  </Box>
                )
              })
            }
          </Stack>
          <Box borderTopWidth="1px" borderTopColor="#4d4d4d" padding="7px">
            {/* <Button>閉じる</Button> */}
            <Center 
              borderRadius="8px" 
              borderWidth="1px" 
              borderColor="#8F8F8F" 
              as="button" 
              w="100%" 
              h="100%" 
              onClick={() => {
                setMode('card')
              }}
            >
              <Text as="b" fontSize="10px">
                閉じる
              </Text>
            </Center>
          </Box>
        </Grid>
      </Box>
    );
  }
  return (
    <Box 
      bg='#000000' 
      maxWidth='510px' 
      // shadow='md' 
      rounded='8px' 
      borderWidth="1px" 
      borderColor="#4D4D4D" 
      key={props.idx}
    >
      <Stack spacing="0px">
        <Box width="100%" justifyContent="center" padding="auto">
          <Center padding="10px" width="100%">
            <Box margin="auto" width="95%">
              <Text as='b' fontSize="14px" textAlign="left" color="#ffffff">
                <OverflowEllipsis>
                  {props.nftData?.name}
                </OverflowEllipsis>
              </Text>
            </Box>
          </Center>
        </Box>
        <Box
          style={{
            paddingTop: '82%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Image
            src={props.nftData?.image_url}
            alt='nft image'
            style={{
              borderTopRightRadius: '10px',
              borderTopLeftRadius: '10px',
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </Box>
        <Box>
          <Grid templateColumns="1fr 1fr" padding="6px">
            <Box padding="4px 8px">
              <Box>
                <Text color="#D8D8D8" fontSize="10px">
                  オファー(42)
                </Text>
              </Box>
              <Box marginTop="2px">
                <Text as="b" fontSize="12px" color="#ffffff">
                  {(props.nftData?.order?.orders?.at(0)?.price?.amount?.native - 0.13)?.toFixed(2)} ETH
                </Text>
              </Box>
            </Box>
            <Box padding="4px 8px" as="button" onClick={() => {
              // console.log('click listing')
              setMode('listing')
            }}>
              <Box>
                <Text 
                  color="#D8D8D8" 
                  fontSize="10px"
                >
                  リスティング({props.nftData?.order?.orders?.length})
                </Text>
              </Box>
              <Box marginTop="2px">
                <Text as="b" fontSize="12px" color="#ffffff">
                  {(props.nftData?.order?.orders?.at(0)?.price?.amount?.native)?.toFixed(2)} ETH
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box padding="8px">
          <Grid templateColumns="1fr 1fr" gap="8px">
            <Button
              fontSize="12px"
              bg="#000000"
              color="#ffffff"
              borderColor="#8F8F8F"
              borderWidth="1px"
              borderRadius="12px"
            >
              オファー
            </Button>
            <Button
              fontSize="12px"
              bg="#F9FFD5"
              borderRadius="12px"
              color="#000000"
            >
              購入
            </Button>
          </Grid>
        </Box>
        {/* <Container>
          <Grid templateColumns="1fr 1fr" gap="3px">
            <Box>
              <Text color='gray'>
                {props.nftData?.order?.orders?.at(0)?.price?.amount?.native}
              </Text>
            </Box>
            <Box>
                {props.nftData?.order?.orders?.at(0)?.price?.amount?.native}
            </Box>
          </Grid>
        </Container> */}
      </Stack>
    </Box>
  );
}

interface Props {
  // mainColor: string;
  collectionData: any
  style: {
    serviceName: string,
    collectionDescription: string
  }
}

export function MarketPlace(props: Props) {
  // console.log("icon", props.collectionData?.data);
  // console.log("icon", props.collectionData?.data?.nfts[0]?.metadata?.image);
  const [sortedArray, setSortedArray] = useState<any>([]);
  const [floorPrice, setFloorPrice] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [collectionNameList, setCollectionNameList] = useState([]);

  const width: any = {
    sm: '100%',
    md: '50%',
    lg: '33%',
    xl: '25%',
  }
  console.log("preview market", props.collectionData?.data?.assets);
  // console.log(props.collectionData?.data?.nfts?.at(0)?.media[0]?.gateway)

  let tmpFloorPrice = 99999999999;
  let tmpTotalVolume = 0;

  useEffect(() => {
    let parsedArray = props.collectionData?.data?.assets;
    if (parsedArray) {
      let tmpCollectionNameList = []
      for (let i = 0; i < parsedArray.length; i++) {
        // console.log(i, parsedArray[i])
        const name = parsedArray?.at(i)?.asset_contract?.name;
        if (tmpCollectionNameList.indexOf(name) === -1) {
          tmpCollectionNameList.push(name);
        }
        parsedArray.at(i).order = orderData.filter((nft, idx) => {
          return parsedArray?.at(i)?.asset_contract?.address === nft?.contract?.address && parsedArray?.at(i)?.token_id === nft?.tokenId
        })?.at(0)
        if (parsedArray.at(i).order) {
          let tmp = parsedArray.at(i)?.order?.orders?.at(0)?.price?.amount?.native;
          if (tmp) {
            // console.log("navigate", tmp);
            if (tmp < tmpFloorPrice) {
              tmpFloorPrice = tmp;
            }
            tmpTotalVolume += tmp;
          }
        }
      }
      tmpCollectionNameList.sort()
      console.log(tmpCollectionNameList);
      setCollectionNameList(tmpCollectionNameList);
      setFloorPrice(tmpFloorPrice);
      setTotalVolume(tmpTotalVolume);
      // console.log("parsedArray", parsedArray);

      parsedArray.sort((a, b) => {
        const f = (v) => {
          // console.log("v", v?.order?.orders?.at(0)?.price?.amount?.native);
          let tmp = v?.order?.orders?.at(0)?.price?.amount?.native;
          if (!tmp) {
            return 999999999;
          }
          return tmp;
        }
        let aOrder = f(a);
        let bOrder = f(b);
        // console.log("ab", aOrder, bOrder)
        return aOrder - bOrder;
      });
      setSortedArray(parsedArray);
    }
  }, [props.collectionData])

  const backgorund = "rgba(21, 20, 20, 0.60)";
  return (
    <Box>
      <Stack spacing={0}>
        <Box bg={backgorund} padding="24px 32px 16px 32px">
          <HStack gap={3}>
            <Image
              width='98px'
              height='98px'
              borderRadius='4px'
              objectFit='contain'
              shadow='md'
              src={props.collectionData?.data?.assets?.at(0)?.image_url}
              // src={`${props.collectionData?.data?.nfts[0]?.media[0]?.gateway}`}
              alt='card image'
              // src={`${props.collectionData?.data?.nfts[0]?.metadata?.image}`}
            />
            <Grid height="98px" paddingLeft="72px" alignContent="end">
              <Grid templateColumns="1fr 1fr 1fr 1fr" color="#ffffff" gap="24px">
                <Box textAlign="center">
                  <Text fontSize="14px">
                    アイテム
                  </Text>
                  <Text as="b" fontSize="20px">
                    {props.collectionData?.data?.assets?.length}
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text fontSize="14px">
                    オーナー
                  </Text>
                  <Text as="b" fontSize="20px">
                    {parseInt(`${props.collectionData?.data?.assets?.length * 0.8}`)}
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text fontSize="14px">
                    フロア
                  </Text>
                  <Text as="b" fontSize="20px">
                    {floorPrice.toFixed(2)}
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text fontSize="14px">
                    ボリューム
                  </Text>
                  <Text as="b" fontSize="20px">
                    {totalVolume.toFixed(2)}
                  </Text>
                </Box>
              </Grid>
            </Grid>
          </HStack>
        </Box>
        <Box padding='0px 32px' bg={backgorund}>
          <Flex>
            <Box marginBottom='8px'>
              <Text as='b' fontSize='32px' color="#ffffff">
                {/* {props.collectionData?.data?.nfts[0]?.contractMetadata?.name} */}
                {props.style.serviceName}
              </Text>
            </Box>
            <Spacer/>
            <Button bg="#ffffff" color="#000000">
              ウォレットに接続
            </Button>
          </Flex>
          {
            props.style.collectionDescription != '' ? (
              <Box>
                <Text color='gray'>{props.style.collectionDescription}</Text>
              </Box>
            ) : (
              <></>
            )
          }
        </Box>
        <Box minHeight='calc(100vh - 141px - 142px)'>
          {/* item list, my Item */}
          <Tabs variant="line">
            <TabList 
              style={{
                paddingLeft: '30px',
                borderBottomColor: "#4C4C4C",
                borderBottomWidth: "1px",
              }} 
              color="#ffffff" 
              bg={backgorund}
              // bg="#151414"
            >
              <Tab 
                _selected={{
                  fontWeight: "bold",
                  borderBottomColor: "#ffffff"
                }}
                style={{
                  
                }}
              >
                <Text color="#ffffff">
                  すべて
                </Text>
              </Tab>
              {
                collectionNameList.map((name, idx) => {
                  return (
                    <Tab key={idx} _selected={{
                      fontWeight: "bold"
                    }}>
                      {name}
                    </Tab>
                  )
                })
              }
            </TabList>
            <TabPanels bg="#000000" style={{ padding: '24px 36px 0px 36px' }}>
              <TabPanel
                style={{ padding: '0' }}
                maxWidth={`${props.collectionData?.data?.assets?.length * 230}px`}
              >
                <SimpleGrid minChildWidth='200px' spacing="24px">
                  {
                    sortedArray?.map((nft, n) => {
                      return (
                        <ItemCard
                          idx={n}
                          nftData={nft}
                        />
                      )
                    })
                  }
                  {/* {props.collectionData?.data?.assets?.map((nft: any, n: number) => {
                    return (
                      <Box 
                        bg='#ffffff' 
                        maxWidth='510px' 
                        shadow='md' 
                        rounded='10px' 
                        borderWidth="1px" 
                        borderColor="gray.200" 
                        key={n}
                      >
                        <Stack marginBottom='10px'>
                          <Container width="100%">
                            <Text as='b'>
                              <OverflowEllipsis>
                                {nft?.name}
                              </OverflowEllipsis>
                            </Text>
                          </Container>
                          <Box
                            style={{
                              paddingTop: '100%',
                              overflow: 'hidden',
                              position: 'relative',
                            }}
                          >
                            <Image
                              src={nft?.image_url}
                              alt='nft image'
                              style={{
                                borderTopRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                              }}
                            />
                          </Box>
                          <Container>
                            <Text color='gray'>{'　price'}</Text>
                          </Container>
                        </Stack>
                      </Box>
                    )
                  })} */}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>My NFTs</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Box>
  )
}
