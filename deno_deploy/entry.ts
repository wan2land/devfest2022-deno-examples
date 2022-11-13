import { serve } from "https://deno.land/std@0.163.0/http/server.ts";

serve((req: Request) => {
  const url = new URL(req.url);
  return Response.json({
    message: url.searchParams.get("message") ?? null,
    version: "v1",
  });
});
