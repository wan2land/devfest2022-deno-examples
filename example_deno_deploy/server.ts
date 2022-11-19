// url devfest2022-deno-deploy.deno.dev

import { serve } from "https://deno.land/std@0.163.0/http/server.ts";

const routes = [] as [
  pattern: URLPattern,
  handler: (match: URLPatternResult, req: Request) => Response,
][];

routes.push([
  new URLPattern({ pathname: "/" }),
  () => new Response("pong :D"),
]);

routes.push([
  new URLPattern({ pathname: "/books/:id(\\d+)" }),
  (match) => new Response(`Book: ${match.pathname.groups.id}`),
]);

function handler(req: Request): Response {
  for (const [pattern, handler] of routes) {
    const match = pattern.exec(req.url);
    if (match) {
      return handler(match, req);
    }
  }

  return new Response("Not Found", { status: 404 });
}

serve(handler);
