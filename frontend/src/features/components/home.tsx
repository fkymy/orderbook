import { Box, HStack } from "@chakra-ui/layout";
import { CreateForm } from "./form";

export function ConnectedTop() {
  return (
    <Box width={'100%'}>
      <HStack
        minH={'100vh'}
        width={'100%'}
        spacing={0}
      >
        <Box style={{
          width: '300px',
          minHeight: '100vh',
          backgroundColor: '#f0f0f0',
          // maxHeight: '250px'
        }}>
          <CreateForm />
        </Box>
        <Box style={{
          width: '70%',
          minHeight: '100vh',
          backgroundColor: '#ffffff',
        }}>
          preview
        </Box>
      </HStack>
    </Box>
  );
}
