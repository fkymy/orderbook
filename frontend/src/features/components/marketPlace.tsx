import { Avatar, Box, Stack } from "@chakra-ui/react";

interface Props {
  mainColor: string;
}


export function MarketPlace() {
  return (
    <>
      <Stack spacing={0}>
        <Box
          backgroundColor='#fff0f0'
          height='100px'
        >
          <Avatar
            width='80px'
            height='80px'
            margin='10px'
            src=""
          />
        </Box>
        <Box backgroundColor='#f0fff0'>
          説明
        </Box>
        <Box backgroundColor='#f0f0ff'>
          item list, my Item
        </Box>
      </Stack>
    </>
  );
}
