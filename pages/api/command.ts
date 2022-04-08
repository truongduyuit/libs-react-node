import type { NextApiRequest, NextApiResponse } from "next";
import { run } from "../../design-patterns/behavioral/command/example";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  run();
  res.status(200).json({ name: "John Doe" });
}
