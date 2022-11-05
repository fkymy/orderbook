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
} from '@chakra-ui/react'

export function ApiDoc() {
  return (
    <Tabs variant='line'>
      <TabList
        style={{
          paddingLeft: '30px',
          borderBottomColor: '#4C4C4C',
          borderBottomWidth: '1px',
        }}
        color='#ffffff'
        bg='#151414'
      >
        <Tab>OpenAPI</Tab>
        <Tab>Docs</Tab>
        <Tab>SDK</Tab>
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
            <Flex color='white' h='700px'>
              <Box margin='30px' w='50%' h='500px' justifyContent='left' alignItems='left'>
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
                    maketplaced
                  </Text>
                  <Input placeholder='1' />
                </Box>
                <Box margin='20px'>
                  <Text as='b' fontSize='2xl'>
                    contractAddress
                  </Text>
                  <Input placeholder='0xtest' />
                </Box>
                <Box margin='20px'>
                  <Text as='b' fontSize='2xl'>
                    tokenId
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
                  margin='20px'
                  color='white'
                  fontWeight='bold'
                  borderRadius='md'
                  bgGradient='linear(to-r, teal.500, green.500)'
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                  }}
                >
                  Test it
                </Button>
              </Box>

              <Box>
                <Box w='500px' h='30px' bg='#D9D9D9' border-top-Radius='md'></Box>
                <Box w='500px' h='550px' bg='#3F3F3F' borderRadius='md'></Box>
              </Box>
            </Flex>
            <Flex color='white' h='750px'>
              <Box margin='30px' w='50%' h='500px' justifyContent='left' alignItems='left'>
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
                    maketplaced
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
                  margin='20px'
                  color='white'
                  fontWeight='bold'
                  borderRadius='md'
                  bgGradient='linear(to-r, teal.500, green.500)'
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                  }}
                >
                  Test it
                </Button>
              </Box>

              <Box>
                <Box w='500px' h='30px' bg='#D9D9D9'>
                  <Text></Text>
                </Box>
                <Box w='500px' h='550px' bg='#3F3F3F' borderRadius='md'></Box>
              </Box>
            </Flex>

            <Flex color='white' h='750px'>
              <Box margin='30px' w='50%' h='500px' justifyContent='left' alignItems='left'>
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
                <Box w='500px' h='30px' bg='#D9D9D9' border-top-Radius='md'></Box>
                <Box w='500px' h='550px' bg='#3F3F3F' borderRadius='md'></Box>
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
