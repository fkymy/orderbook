import { Avatar, Box, Center, Container, Grid, GridItem, Image, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Nft } from "alchemy-sdk";

interface Props {
  // mainColor: string;
  collectionData: any;
  style: {
    collectionDescription: string;
  }
}


export function MarketPlace(props: Props) {
  // console.log("icon", props.collectionData?.data);
  // console.log("icon", props.collectionData?.data?.nfts[0]?.metadata?.image);
  const width: any = {
    sm: '100%', 
    md: '50%', 
    lg: '33%', 
    xl: '25%',
  }

  return (
    <>
      <Stack spacing={0}>
        <Box backgroundColor='#ffffff'>
          <Image
            width='100px'
            height='100px'
            borderRadius='10'
            margin='40px'
            src={`${props.collectionData?.data?.nfts[0]?.metadata?.image}`}
          />
        </Box>
        <Box backgroundColor='#ffffff' padding='24px 40px 24px 40px'>
          <Box marginBottom='8px'>
            <Text as="b" fontSize='2xl'>
              {props.collectionData?.data?.nfts[0]?.contractMetadata?.name}
            </Text>
          </Box>
          {
            props.style.collectionDescription != ''
              ? (
                  <Box>
                    <Text color="gray">
                      {props.style.collectionDescription}
                    </Text>
                  </Box>
                )
              : <></>
          }
        </Box>
        <Box backgroundColor='#ffffff' minHeight='calc(100vh - 141px - 142px)'>
          {/* item list, my Item */}
          <Tabs colorScheme='black'>
            <TabList style={{paddingLeft: '30px'}}>
              <Tab>Items</Tab>
              <Tab>My NFTs</Tab>
            </TabList>
            <TabPanels style={{padding: '24px 40px 40px 40px'}}>
              <TabPanel style={{padding: '0'}} maxWidth={`${props.collectionData?.data?.nfts?.length * 300}px`}>
                <SimpleGrid minChildWidth='250px' spacing={4}>
                  {
                    props.collectionData?.data?.nfts.map((nft: any, n: number) => {
                      // if (n > 1) {
                      //   return <></>
                      // }
                      return (
                        <Box bg="#ffffff" maxWidth='510px' shadow='md' rounded='10px'>
                          <Stack marginBottom='10px'>
                            <Image
                              src={nft?.metadata?.image}
                              style={{
                                borderTopRightRadius: '10px',
                                borderTopLeftRadius: '10px',
                              }}
                            />
                            <Container>
                              <Text as='b'>
                                {nft?.metadata?.name}
                              </Text>
                              <Text color="gray">
                                {'　'}
                              </Text>
                            </Container>
                          </Stack>
                        </Box>
                      )
                    })
                  }
                </SimpleGrid>
              </TabPanel>
              <TabPanel>My NFTs</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </>
  );
}
