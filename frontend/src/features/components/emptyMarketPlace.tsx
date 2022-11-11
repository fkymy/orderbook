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
  Skeleton,
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
  idx: number
}

function ItemCard(props: ItemCardProps) {

  return (
    <Box 
      bg='#000000' 
      maxWidth='510px' 
      rounded='8px' 
      borderWidth="1px" 
      borderColor="#4D4D4D" 
      key={props.idx}
    >
      <Stack spacing="0px">
        <Box width="100%" justifyContent="center" padding="auto">
          <Center padding="10px" width="100%">
            <Box margin="auto" width="95%">
              <Skeleton
                width="35px"
                height="12px"
              />
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
          <Skeleton
            style={{
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
              <Skeleton
                height="12px"
                width="61px"
                marginBottom="8px"
              />
              <Skeleton
                height="12px"
                width="50px"
              />
            </Box>
            <Box padding="4px 8px">
              <Skeleton
                height="12px"
                width="61px"
                marginBottom="8px"
              />
              <Skeleton
                height="12px"
                width="50px"
              />
            </Box>
          </Grid>
        </Box>
        <Box padding="8px">
          <Grid templateColumns="1fr 1fr" gap="8px">
            <Skeleton
              width="71px"
              height="18px"
            />
            <Skeleton
              width="71px"
              height="18px"
            />
          </Grid>
        </Box>
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

export function EmptyMarketPlace(props: Props) {

  const backgorund = "rgba(21, 20, 20, 0.60)";
  return (
    <Box>
      <Stack spacing={0}>
        <Box bg={backgorund} padding="24px 32px 16px 32px">
          <HStack gap={3}>
            {/* <Skeleton
              width='98px'
              height='98px'
              borderRadius='4px'
            /> */}
            <Box
              bg="#383838"
              width='98px'
              height='98px'
              borderRadius='4px'
            >
            </Box>
            <Grid height="98px" paddingLeft="72px" alignContent="end">
              <Grid templateColumns="1fr 1fr 1fr 1fr" color="#ffffff" gap="24px">
                <Stack
                  height="42px"
                  width="58px"
                  spacing="0"
                >
                  <Center>
                    <Text fontSize="14px">
                      アイテム
                    </Text>
                  </Center>
                  <Center>
                    <Text as="b" fontSize="20px">
                      {"-"}
                    </Text>
                  </Center>
                </Stack>
                
                <Stack
                  height="42px"
                  width="58px"
                  spacing="0"
                >
                  <Center>
                    <Text fontSize="14px">
                      ボルダー
                    </Text>
                  </Center>
                  <Center>
                    <Text as="b" fontSize="20px">
                      {"-"}
                    </Text>
                  </Center>
                </Stack>
                
                <Stack
                  height="42px"
                  width="58px"
                  spacing="0"
                >
                  <Center>
                    <Text fontSize="14px">
                      フロア
                    </Text>
                  </Center>
                  <Center>
                    <Text as="b" fontSize="20px">
                      {"-"}
                    </Text>
                  </Center>
                </Stack>
                
                <Stack
                  height="42px"
                  width="70px"
                  spacing="0"
                >
                  <Center>
                    <Text fontSize="14px">
                      ボリューム
                    </Text>
                  </Center>
                  <Center>
                    <Text as="b" fontSize="20px">
                      {"-"}
                    </Text>
                  </Center>
                </Stack>
              </Grid>
            </Grid>
          </HStack>
        </Box>
        <Box padding='0px 32px' bg={backgorund}>
          <Flex>
            <Box marginBottom='8px'>
              <Text as='b' fontSize='16px' color="#8f8f8f">
                {"コレクション"}
              </Text>
            </Box>
            <Spacer/>
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
          <Tabs variant="line">
            <TabList 
              style={{
                paddingLeft: '30px',
                borderBottomColor: "#4C4C4C",
                borderBottomWidth: "1px",
              }} 
              color="#ffffff" 
              bg={backgorund}
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
            </TabList>
            <TabPanels bg="#000000" style={{ padding: '96px 36px 0px 36px' }}>
              <TabPanel
                style={{ padding: '0' }}
                height="1vh"
              >
                <Center>
                  <Text as="b" color="#8f8f8f">
                    {"コレクションが見つかりません"}
                  </Text>
                </Center>
              </TabPanel>
              <TabPanel>My NFTs</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Box>
  )
}
