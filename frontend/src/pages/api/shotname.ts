import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  let name = "第一世代";

  switch (req.query.address) {
    case "0x24e5bba6218d711ee675a844fc237f1ebfe83fe9":
      name = "第一世代"
      break;
    case "":
      name = "第一世代"
      break;
    case "":
      name = "第一世代"
      break;
  }

  res.status(200).json({
    name: name
  });
  // switch () {
  // }
}