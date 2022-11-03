import { Box, Center } from '@chakra-ui/react'
import { CollectionMetadataType } from 'src/types/collectionMetadata'

interface Props {
  metadata: CollectionMetadataType
}

export function TrapAndMagicMetadataTable(props: Props) {
  // console.log(props.metadata)
  return (
    <Box>
      <Box
        backgroundColor='#353052'
        borderColor='#8F8F8F'
        borderWidth='1px 1px 0px 1px'
        textAlign='center'
      >
        <Center height='32px'>{'効果'}</Center>
      </Box>
      <Box borderWidth='1px' borderColor='#8F8F8F'>
        <Center height='42px'>{props.metadata?.otherAttributes?.effect}</Center>
      </Box>
    </Box>
  )
}
