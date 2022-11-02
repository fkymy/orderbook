import { Box, Button, Center, Container, Flex, Grid, HStack, Image, Spacer, Square, Stack, Text, VStack } from "@chakra-ui/react";
import ShowMoreText from "react-show-more-text";

interface Props {
  nftdata: any;
}

export function Item(props: Props) {
  return (
    <Box padding="80px 96px">
      <Grid templateColumns='6fr 4fr' gap={10}>
        <Box>
          <Box style={{
              paddingTop: '100%',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '45px',
              // height: '100%',
            }}
            shadow='2xl'
          >
            <Image
              // src={`${props.nftdata?.metadata?.image}`}
              alt="card image"
              src={`${props.nftdata?.media[0]?.gateway}`}
              style={{
                borderRadius: '45px',
                objectFit: 'contain',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </Box>
        </Box>
        <Box>
          <Stack>
            <Text as="b" fontSize='5xl' lineHeight='45px'>
              {props.nftdata?.metadata?.name}
            </Text>
            <Container h="100px" padding="25px" borderRadius='30px' shadow='md' borderWidth="1px" style={{marginTop: '40px'}}>
              <Flex h="100%">
                <Box h="100%">
                  <Center h="100%">
                    <Text as="b" fontSize='2xl' alignContent='center'>
                      4.0 ETH (TODO)
                    </Text>
                  </Center>
                </Box>
                <Spacer/>
                <Box h="100%">
                  <Button h="100%" bg="#3772ff" color="#ffffff" borderRadius="full">
                    Buy now
                  </Button>
                </Box>
              </Flex>
            </Container>
            <Container h="100px" padding="25px" borderRadius='30px' shadow='md' borderWidth="1px" style={{marginTop: '40px'}}>
              <Flex h="100%">
                <Box h="100%" w="45%">
                  <Button h="100%" w="100%" bg="#3772ff" color="#ffffff" borderRadius="full">
                    Fixed Price
                  </Button>
                </Box>
                <Spacer/>
                <Box h="100%" w="45%">
                  <Button h="100%" w="100%" bg="#3772ff" color="#ffffff" borderRadius="full">
                    Auction
                  </Button>
                </Box>
              </Flex>
            </Container>
            <Box style={{marginTop: '45px'}}>
              <Stack>
                {/* <Text as="b">collection 詳細</Text> */}
                <Text color="gray">
                  {/* MELODY is a Web3 lifestyle application based on BSC chain and OKC chain which completely combines Game-Fi and Social-Fi. With it, players can earn money by singing with NFT equipped with microphones. There are various modes in the game such as solo, chorus ,karaoke and so on. Join the game: https://www.ammelody.com */}
                  {props.nftdata?.metadata?.description}
                </Text>
                {/* <ShowMoreText
                  lines={3}
                  more="Show more"
                  less="Show less"
                  className="content-css"
                  anchorClass="show-more-less-clickable"
                  onClick={() => {}}
                  expanded={false}
                  width={280}
                  truncatedEndingComponent={"... "}>
                  MELODY is a Web3 lifestyle application based on BSC chain and OKC chain which completely combines Game-Fi and Social-Fi. With it, players can earn money by singing with NFT equipped with microphones. There are various modes in the game such as solo, chorus ,karaoke and so on. Join the game: https://www.ammelody.com
                </ShowMoreText> */}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
}
