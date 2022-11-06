import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Flex,
  Spacer,
  Center,
  Square,
  Button,
  Img,
} from '@chakra-ui/react'

export function ApiDoc() {
  return (
    <Tabs variant='line' as='b'>
      <TabList
        style={{
          paddingLeft: '30px',
          borderBottomColor: '#4C4C4C',
          borderBottomWidth: '1px',
        }}
        color='#ffffff'
        bg='#151414'
      >
        <Tab color='#8F8F8F' _selected={{ color: 'white', fontWeight: 'bold' }}>
          OpenAPI
        </Tab>
        <Tab color='#8F8F8F' _selected={{ color: 'white', fontWeight: 'bold' }}>
          Docs
        </Tab>
        <Tab color='#8F8F8F' _selected={{ color: 'white', fontWeight: 'bold' }}>
          SDK
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Container
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRightColor: '#4D4D4D',
            }}
            maxW='100%'
          >
            <Flex color='white' h='900px'>
              <Box margin='10px' w='50%' h='500px' justifyContent='left' alignItems='left'>
                <Box margin='10px'>
                  <Text as='b' fontSize='3xl'>
                    Get Aggregated Orders
                  </Text>
                  <br></br>
                  <Flex>
                    <Box w='30px' backgroundColor='#2AD100' margin='0px 10px 0px 0px'>
                      <Text as='b' fontSize='1.5xl' color='#000000'>
                        Get
                      </Text>
                    </Box>
                    <Text as='b' fontSize='1.5xl' color='Brack'>
                      api.orderbook.com/v0/orders/aggregate
                    </Text>
                  </Flex>
                </Box>
                <Box margin='20px'>
                  <Text as='b' fontSize='2xl'>
                    Maketplace Id
                  </Text>
                  <Input placeholder='1' />
                </Box>
                <Box margin='20px'>
                  <Text as='b' fontSize='2xl'>
                    Contract Address
                  </Text>
                  <Input placeholder='0xtest' />
                </Box>
                <Box margin='20px'>
                  <Text as='b' fontSize='2xl'>
                    Token Id
                  </Text>
                  <Input placeholder='0' />
                </Box>
                <Box margin='20px'>
                  <Text as='b' fontSize='2xl'>
                    API Key
                  </Text>
                  <Input placeholder='demo' />
                </Box>
                <Button
                  as='b'
                  margin='20px'
                  color='#1C1C1C'
                  fontWeight='bold'
                  borderRadius='md'
                  bg='#F9FFD5'
                >
                  Test it
                </Button>
              </Box>
              <Box>
                <Box w='425px' h='30px' bg='#D9D9D9' borderRadius='md'>
                  <Center color='#000000' as='b'>
                    Response
                  </Center>
                </Box>
                <Box w='425px' h='725px' bg='#3F3F3F' borderRadius='md'>
                  <Text margin='0px 10px 5px 10px'>
                    <br></br> ｛<br></br>”orders”: ［<br></br>&nbsp; ｛ <br></br>&nbsp; &nbsp; ”id”:
                    ”0x12dad3a4771d318a722e37c5a21f92cffb359ac4f8a5289c524fe1421ff82e9d”,
                    <br></br>&nbsp; &nbsp; ”kind”: ”looks-rare”,
                    <br></br>&nbsp; &nbsp; ”side”: ”sell”,
                    <br></br>&nbsp; &nbsp; ”status”: ”active”,
                    <br></br>&nbsp; &nbsp; ”tokenSetId”:
                    ”token:0x24e5bba6218d711ee675a844fc237f1ebfe83fe9:0”,
                    <br></br>&nbsp; &nbsp; ”contract”: ”0x24e5bba6218d711ee675a844fc237f1ebfe83fe9”,
                    <br></br> &nbsp; &nbsp;”maker”: ”0x96b1bd9e8af7e3a0d840080690ca7e30a7b3c852”,
                    <br></br>&nbsp; &nbsp; ”taker”: ”0x000000000000000000000000000000000000000”,
                    <br></br> &nbsp; &nbsp;”price”: ｛ <br></br> ”currency”:｛
                    <br></br> &nbsp; &nbsp;”contract”: ”0x000000000000000000000000000000000000000”,
                    <br></br> &nbsp; &nbsp;”name”: ”Ether”,
                    <br></br> &nbsp; &nbsp;”symbol”: ”ETH”,
                    <br></br> &nbsp; &nbsp;”decimals”: 18 ｝,
                    <br></br> &nbsp; &nbsp;”amount”: ｛<br></br> &nbsp; &nbsp; ”raw”:
                    ”42000000000000000000”,
                    <br></br> &nbsp; &nbsp; ”decimal”: 42, <br></br> &nbsp; &nbsp; ”usd”: null,
                  </Text>
                </Box>
              </Box>
            </Flex>
            <Flex color='white' h='800px'>
              <Box margin='10px' w='50%' h='500px' justifyContent='left' alignItems='left'>
                <Box margin='10px'>
                  <Text as='b' fontSize='3xl'>
                    Get Native Orders
                  </Text>
                  <br></br>
                  <Flex>
                    <Box w='30px' backgroundColor='#2AD100' margin='0px 10px 0px 0px'>
                      <Text as='b' fontSize='1.5xl' color='#000000'>
                        Get
                      </Text>
                    </Box>
                    <Text as='b' fontSize='1.5xl' color='Brack'>
                      api.orderbook.com/v0/orders/native
                    </Text>
                  </Flex>
                </Box>
                <Box margin='20px'>
                  <Text as='b' fontSize='2xl'>
                    Maketplace Id
                  </Text>
                  <Input placeholder='1' />
                </Box>
                <Box margin='20px'>
                  <Text as='b' fontSize='2xl'>
                    API Key
                  </Text>
                  <Input placeholder='demo' />
                </Box>
                <Button
                  as='b'
                  margin='20px'
                  color='#1C1C1C'
                  fontWeight='bold'
                  borderRadius='md'
                  bg='#F9FFD5'
                >
                  Test it
                </Button>
              </Box>
              <Box>
                <Box w='425px' h='30px' bg='#D9D9D9' borderRadius='md'>
                  <Center color='#000000' as='b'>
                    Response
                  </Center>
                </Box>
                <Box w='425px' h='650px' bg='#3F3F3F' borderRadius='md'>
                  <Text margin='0px 5px 10px 20px'>
                    <br></br>｛<br></br>&nbsp;&nbsp;”nativeOrders”: ［<br></br>&nbsp;&nbsp;｛
                    <br></br>
                    &nbsp;&nbsp;&nbsp;&nbsp;”kind”: ”orderbook”, <br></br>
                    &nbsp;&nbsp;&nbsp;&nbsp; ”side”: ”ASK”,”status”:
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”ACTIVE”,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”cancelled”: false,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”finalized”: false,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”signature”: ”none”,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”contract”:
                    ”0x24e5bba6218d711ee675a844fc237f1ebfe83fe9”,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”tokenId”: 0,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”maker”:”0xtest”,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”taker“: null,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”currencyName”: ”Ether”,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”currencySymbol”: ”ETH”,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”decimals”: 18,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”rawAmount”: null,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”decimalAmount”: 999,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”isOrderbook”: true,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”createdAt”: ”2022-11-01T20:12:44.925Z”,
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;”updatedAt”: ”2022-11-01T20:12:44.925Z”
                    <br></br>&nbsp;&nbsp;&nbsp;&nbsp;｝<br></br>&nbsp;&nbsp;］
                    <br></br>｝
                  </Text>
                </Box>
              </Box>
            </Flex>

            <Flex color='white' h='750px'>
              <Box margin='10px' w='50%' h='500px' justifyContent='left' alignItems='left'>
                <Box margin='10px'>
                  <Text as='b' fontSize='3xl'>
                    Get NFT data
                  </Text>
                  <br></br>
                  <Flex>
                    <Box w='30px' backgroundColor='#2AD100' margin='0px 10px 0px 0px'>
                      <Text as='b' fontSize='1.5xl' color='#000000'>
                        Get
                      </Text>
                    </Box>
                    <Text as='b' fontSize='1.5xl' color='Brack'>
                      api.orderbook.com/v0/nft
                    </Text>
                  </Flex>
                </Box>
              </Box>
              <Box>
                <Box w='425px' h='30px' bg='#D9D9D9' borderRadius='md'>
                  <Center color='#000000' as='b'>
                    Response
                  </Center>
                </Box>
                <Box w='425px' h='650px' bg='#3F3F3F' borderRadius='md'>
                  <Text margin='0px 10px 5px 10px'>
                    <br></br>｛<br></br>&nbsp;&nbsp;”contract”:｛
                    <br></br>&nbsp;&nbsp;”address”: <br></br>
                    &nbsp;&nbsp;”0x24e5bba6218d711ee675a844fc237f1ebfe83fe9”,
                    <br></br>&nbsp;&nbsp;”name”: ”yu-gi-dama_1st_gen”,
                    <br></br>&nbsp;&nbsp;”totalSupply”: ”10”,
                    <br></br>&nbsp;&nbsp;”tokenType”: ”ERC721” <br></br>&nbsp;&nbsp;｝,
                    <br></br>&nbsp;&nbsp;”tokenId”: ”0”,
                    <br></br>&nbsp;&nbsp;”tokenType”: ”ERC721”,
                    <br></br>&nbsp;&nbsp;”title”: ”ホワイトマジシャンガール”,
                    <br></br>&nbsp;&nbsp;”rawMetadata”: ｛ ”name”: ”ホワイトマジシャンガール”,
                    <br></br>&nbsp;&nbsp;”description”:
                    ”1ターンに1度。このカードのXyz素材を1つ切り離し、相手がコントロールするモンスター1体を対象として、そのモンスターを破壊し、破壊した場合、相手に元々のATKと同じ値のダメージを与える。フェアリー・タイプXyz」のこの効果は1ターンに1度しか使用できない。”,
                    <br></br>&nbsp;&nbsp;”image”:
                    ”ipfs://QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/0.jpg”,
                    <br></br>&nbsp;&nbsp;”attributes”: [...]
                    <br></br>｝,
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Container>
        </TabPanel>

        <TabPanel>
          <p>Docs</p>
        </TabPanel>
        <TabPanel>
          <p>SDK</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
