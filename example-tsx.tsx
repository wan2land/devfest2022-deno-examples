import * as React from "https://esm.sh/react@18.2.0";
import { renderToReadableStream } from "https://esm.sh/react-dom@18.2.0/server";

const App = () => (
  <html>
    <body>
      <h1>Hello World</h1>
    </body>
  </html>
);

Deno.serve(
  { port: 4500 },
  async () =>
    new Response(await renderToReadableStream(<App />), {
      headers: {
        "Content-Type": "text/html",
      },
    }),
);

// $ deno run -A --unstable example-tsx.tsx
