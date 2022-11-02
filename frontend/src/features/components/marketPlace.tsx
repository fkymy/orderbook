import { AspectRatio, Avatar, Box, Center, Container, Grid, GridItem, Image, SimpleGrid, Square, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
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
  console.log(props.collectionData?.data?.nfts[0]?.media[0]?.gateway);

  return (
    <Box style={{backgroundColor: '#ffffff'}}>
      <Stack spacing={0}>
        <Box>
          <Image
            width='100px'
            height='100px'
            borderRadius='10'
            margin='40px'
            objectFit='contain'
            shadow='md'
            src={`${props.collectionData?.data?.nfts[0]?.media[0]?.gateway}`}
            alt="card image"
            // src={`${props.collectionData?.data?.nfts[0]?.metadata?.image}`}
          />
        </Box>
        <Box padding='24px 40px 24px 40px'>
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
        <Box minHeight='calc(100vh - 141px - 142px)'>
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
                      return (
                        <Box bg="#ffffff" maxWidth='510px' shadow='md' rounded='10px' key={n}>
                          <Stack marginBottom='10px'>
                            {/* <Square style={{width: "100%"}}> */}
                            {/* <AspectRatio maxW="100%" ratio={1}> */}
                            <Box style={{
                              paddingTop: '100%',
                              overflow: 'hidden',
                              position: 'relative',
                            }}>
                              <Image
                                // src={nft?.metadata?.image}
                                src={nft?.media[0]?.gateway}
                                alt="nft image"
                                // boxSize="100%"
                                // height="1000px"
                                // width="1000px"
                                // objectFit="contain"
                                style={{
                                  borderTopRightRadius: '10px',
                                  borderTopLeftRadius: '10px',
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: '100%',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  // width: '100%',
                                  // height: '100%'
                                  // paddingBottom: '100%',
                                  // height: '0'
                                }}
                              />
                            </Box>
                            {/* </AspectRatio> */}
                            {/* </Square> */}
                            <Container>
                              <Text as='b'>
                                {nft?.metadata?.name}
                              </Text>
                              <Text color="gray">
                                {'　price'}
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
    </Box>
  );
}
