import { Box, Center, Flex, Grid, propNames, Spacer, Text } from "@chakra-ui/react";
import { CollectionMetadataType } from "src/types/collectionMetadata";
import NextImage, { StaticImageData } from 'next/image';

import TypeDarkIcon from "./assets/typeIcon/dark.png";
import TypeDivineIcon from "./assets/typeIcon/divine.png";
import TypeEarthIcon from "./assets/typeIcon/earth.png";
import TypeFireIcon from "./assets/typeIcon/fire.png";
import TypeLightIcon from "./assets/typeIcon/light.png";
import TypeWaterIcon from "./assets/typeIcon/water.png";
import TypeWindIcon from "./assets/typeIcon/wind.png";
import LevelIcon from "./assets/level.png";

function getTypeIcon(type: string) {
  switch (type) {
    case "闇":
      return TypeDarkIcon;
    case "神":
      return TypeDivineIcon;
    case "地":
      return TypeEarthIcon;
    case "炎":
      return TypeFireIcon;
    case "光":
      return TypeLightIcon;
    case "水":
      return TypeWaterIcon;
    case "風":
      return TypeWindIcon;
    default:
      return undefined;
  }
}

interface Props {
  metadata: CollectionMetadataType;
}

export function MonstorMetadataTable(props: Props) {
  console.log(props.metadata);

  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)">
        {
          ["属性", "レベル", "攻撃力", "防御力"].map((colName, idx) => {
            return (
              <Box 
                backgroundColor="#353052" 
                borderColor="#8F8F8F"
                borderTopWidth="1px"
                borderBottomWidth="1px"
                borderRightWidth="1px"
                borderLeftWidth={idx === 0 ? "1px" : "0px"}
                textAlign="center"
                key={idx}
              >
                <Center height="32px">
                  {colName}
                </Center>
              </Box>
            );
          })
        }
      </Grid>
      <Grid height="42px" templateColumns="repeat(4, 1fr)">
        <Box
          borderWidth="0px 1px 1px 1px"
          borderColor="#8F8F8F"
        >
          <Flex alignItems="center" height="42px">
            <Spacer/>
            <Box>
              <Center>
                <NextImage
                  src={getTypeIcon(props.metadata?.monsterAttributes.attribute)}
                  width="24px"
                  height="24px"
                />
              </Center>
            </Box>
            <Spacer/>
            <Text as="b" fontSize="20">
              {`${props.metadata?.monsterAttributes.attribute}属性`}
            </Text>
            <Spacer/>
          </Flex>
        </Box>
        <Box
          borderWidth="0px 1px 1px 0px"
          borderColor="#8F8F8F"
        >
          <Flex justify="center" alignItems="center" height="42px">
            <Spacer/>
            <Spacer/>
            <Box>
              <Center>
                <NextImage
                  src={LevelIcon}
                  width="24px"
                  height="24px"
                />
              </Center>
            </Box>
            <Spacer/>
            <Text as="b" fontSize="20">
              {props.metadata?.monsterAttributes.level}
            </Text>
            <Spacer/>
            <Spacer/>
          </Flex>
        </Box>
        <Box
          borderWidth="0px 1px 1px 0px"
          borderColor="#8F8F8F"
        >
          <Center height="42px">
            <Text as="b" fontSize="20">
              {props.metadata?.monsterAttributes.atk}
            </Text>
          </Center>
        </Box>
        <Box
          borderWidth="0px 1px 1px 0px"
          borderColor="#8F8F8F"
        >
          <Center height="42px">
            <Text as="b" fontSize="20">
              {props.metadata?.monsterAttributes.def}
            </Text>
          </Center>
        </Box>
      </Grid>
    </Box>
  );
}