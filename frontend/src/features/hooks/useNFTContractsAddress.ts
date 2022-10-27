import { useCallback, useState } from "react";
// import { Network, Alchemy } from "alchemy-sdk";
import axios from "axios";
import { constUrl } from "../constant/constURL";
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";

export const useCollectionData = (address: string, owner?: string, offset: number = 0, limit: number = 100) => {
  const [collectionData, setData] = useState<any>();

  const getCollectionData = useCallback(async () => {
    if (address) {
      // const settings = {
      //   apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      //   network: Network.MATIC_MUMBAI,
      // }
      // const alchemy = new Alchemy(settings);
      // alchemy.nft
      //   .getNftsForContract("0x61fce80d72363b731425c3a2a46a1a5fed9814b2", {  })
      //   .then(console.log);
      // const web3 = createAlchemyWeb3(
      //   constUrl.alchemyMumbaiNetApiURL + `/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      // );
      // const nfts = await web3.alchemy.getNFTsFor({ contractAddresses: address });
      // console.log(`${constUrl.alchemyGoerliNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection/`);
      axios
        // .get(`${constUrl.alchemyMumbaiNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection/`, {
          .get(`${constUrl.alchemyGoerliNetApiURL}/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForCollection`, {
          params: {
            contractAddress: address,
            withMetadata: true,
            startToken: offset,
            limit: limit,
          }
        })
        .then((res) => setData(res))
    }
    // eslint-disable-next-line
  }, []);
  return { collectionData, getCollectionData };
};
