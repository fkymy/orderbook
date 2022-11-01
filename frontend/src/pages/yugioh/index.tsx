import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { MarketPlace } from "src/features/components/marketPlace";
import { YuGiOhItem } from "src/features/components/yugioh/ItemPage";
import { YuGiOhMarketPlace } from "src/features/components/yugioh/marketPlace";
import { constUrl } from "src/features/constant/constURL";
import { accordionTheme } from "src/features/theme/accordion";

const Home: NextPage = () => {
  // const collectionAddress = "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c";
  // const collectionAddress = "0x5d424ce3fe2c56f2cee681f0c44ae965b41e9043";
  // const collectionAddress = "0x739b366548117dd5bef5b8b5573246de841af950"; // OMOCHI_Goerli Network
  // const collectionAddress = "0x2F33B8870f86B319258380377076147a59E29135";
  const collectionAddress = "0x0bacc0e4fb3fe96b33d43b20a2f107f6cea31741";
  const [collectionData, setCollectionData] = useState<any>();

  useEffect(() => {
    // getAssetsData();
    // getCollectionData();

    // if (collectionAddress != "") {

    // if (collectionAddress != "") {
      axios
        // .get(`${constUrl.alchemyMumbaiNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection/`, {
        .get(`${constUrl.alchemyGoerliNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection/`, {
          params: {
            contractAddress: collectionAddress,
            withMetadata: true,
            startToken: 0,
            limit: 100,
          }
        })
        .then((res) => setCollectionData(res))
    // }
  }, [collectionAddress]);

  const providerTheme = extendTheme({
    components: {
      Accordion: accordionTheme,
    },
  });

  return (
    <div>
      <main>
        <ChakraProvider theme={providerTheme}>
          {/* <MarketPlace
          /> */}
          <YuGiOhMarketPlace
            collectionData={collectionData}
          />
        </ChakraProvider>
      </main>
    </div>
  )
}

export default Home
