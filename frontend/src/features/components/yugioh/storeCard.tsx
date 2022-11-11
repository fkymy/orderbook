import { Box, Center, Flex, Grid, Spacer, Text } from '@chakra-ui/react'
import NextImage, { StaticImageData } from 'next/image'

import StoreLooksrareIcon from './assets/storeIcon/looksrare.png'
import StoreOpenseaIcon from './assets/storeIcon/opensea.png'
import StoreX2Y2Icon from './assets/storeIcon/x2y2.png'
import StoreYugidamaIcon from './assets/storeIcon/yugidama.png'

interface StorePriceCardProps {
  store: 'orderbook' | 'seaport' | 'x2y2' | 'looks-rare'
  price: number
}

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

export function StorePriceCard(props: StorePriceCardProps) {
  let storeName: string = ''
  let storeIcon: StaticImageData

  switch (props.store) {
    case 'orderbook':
      storeIcon = StoreYugidamaIcon
      storeName = 'Yugidama'
      break
    case 'seaport':
      storeIcon = StoreOpenseaIcon
      storeName = 'OpenSea'
      break
    case 'x2y2':
      storeIcon = StoreX2Y2Icon
      storeName = 'X2Y2'
      break
    case 'looks-rare':
      storeIcon = StoreLooksrareIcon
      storeName = 'LooksRare'
      break
  }

  return (
    <Box
      // height="84px"
      borderRadius='10px'
      borderColor='#4D4762'
      borderWidth='1px'
      padding='16px 18.5px'
      _hover={{
        backgroundColor: "#353052"
      }}
    >
      <Grid templateColumns='52px 1fr'>
        <Box height='52px'>
          <NextImage src={storeIcon} width='52px' height='52px' />
        </Box>
        <Box>
          <Flex margin='8px 0px 8px 16px'>
            <Flex>
              <Box marginRight='14px'>
                <Text fontSize='24px' as='b'>
                  {props.price.toFixed(2)}
                </Text>
              </Box>
              <Center>
                <Text>ETH</Text>
              </Center>
            </Flex>
            <Spacer />
            <Box padding='6px 0px'>
              <Text alignContent='center'>
                {'出品者：'}
                <b>{storeName}</b>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}
