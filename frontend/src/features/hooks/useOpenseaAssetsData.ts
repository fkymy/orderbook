import axios from "axios";
import { useCallback, useState } from "react";
import { constUrl } from "../constant/constURL";

export const useOpenseaAssetsData = (address: string, owner?: string, offset: number = 0, limit: number = 20) => {
  const [assetsData, setData] = useState<any>();

  const getAssetsData = useCallback(() => {
    if (address) {
      axios
        .get(constUrl.openseaV1TestnetURL + `/assets`, {
          params: {
            asset_contract_address: address,
            asset_owner: owner,
            offset: offset,
            limit: limit,
            order_direction: 'desc',
            include_orders: 'true',
          }
        })
        .then(res => setData(res))
        .catch(() => console.log('error'));
    }
    // eslint-disable-next-line
  }, []);
  return { assetsData, getAssetsData };
};
