import { Avatar, Box, Center, Image, Stack, Text } from "@chakra-ui/react";

interface Props {
  // mainColor: string;
  collectionData: any;
  // style: {
  // }
}


export function MarketPlace(props: Props) {
  // console.log("icon", props.collectionData?.data);
  // console.log("icon", props.collectionData?.data?.nfts[0]?.metadata?.image);

  return (
    <>
      <Stack spacing={0}>
        <Box backgroundColor='#fff0f0'>
          <Image
            width='100px'
            height='100px'
            borderRadius='10'
            margin='40px'
            src={`${props.collectionData?.data?.nfts[0]?.metadata?.image}`}
          />
        </Box>
        <Box backgroundColor='#f0fff0' padding='24px 40px 24px 40px'>
          <Box marginBottom='8px'>
            <Text as="b" fontSize='2xl'>
              {"The NFT Name"}
            </Text>
          </Box>
          <Box>
            <Text color="gray">
              SuperRare makes it easy to create, sell, and collect rare digital art. SuperRare's smart contract platform allows artists to release limited-edition digital artwork tracked on the blockchain, making the pieces rare, verified, and collectible. Filter the crypto art world's best selling works by artist name, creation type, and year of birth on OpenSea.
            </Text>
          </Box>
        </Box>
        <Box backgroundColor='#f0f0ff' minHeight='calc(100vh - 141px - 142px)'>
          item list, my Item
        </Box>
      </Stack>
    </>
  );
}
