import { serve } from "https://deno.land/std@0.163.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  if (url.pathname.endsWith(".html")) {
    try {
      const body = await Deno.readFile(`./${url.pathname}`);
      return new Response(body, { headers: { "content-type": "text/html" } });
    } catch {
      //
    }
  }

  return new Response("not found", { status: 404 });
});
