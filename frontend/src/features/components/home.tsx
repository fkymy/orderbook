import { Box, HStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useOpenseaAssetsData } from "../hooks/useOpenseaAssetsData";
import { CreateForm } from "./form";
import { Item } from "./Item";
import { MarketPlace } from "./marketPlace";

export function ConnectedTop() {
  const [previewMode, setPreviewMode] = useState('market');
  const [isGetCollectionData, setIsGetCollectionData] = useState();
  const { assetsData, getAssetsData } = useOpenseaAssetsData("0x739b366548117dd5BEf5b8B5573246dE841AF950");

  useEffect(() => {
    getAssetsData();
  }, []);

  console.log("assets", assetsData.data.assets[0].image_url);
  return (
    <Box width={'100%'}>
      <HStack
        minH={'100vh'}
        width={'100%'}
        spacing={0}
      >
        <Box style={{
          width: '350px',
          minHeight: '100vh',
          backgroundColor: '#f0f0f0',
          // maxHeight: '250px'
        }}>
          <CreateForm
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
          />
        </Box>
        <Box style={{
          width: 'calc(100vw - 350px)',
          height: '100vh',
          // minHeight: '100vh',
          backgroundColor: '#ffffff',
          overflowY: 'scroll',
        }}>
          {
            previewMode == 'market' ? <MarketPlace/> : <Item/>
          }
        </Box>
      </HStack>
    </Box>
  );
}
