import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function (req: VercelRequest, res: VercelResponse) {
  const { message = null } = req.query;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({
    message: message ?? null,
    version: "v1",
  }));
}
