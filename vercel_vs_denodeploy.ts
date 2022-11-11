const denoDeployUrl = "https://devfest2022-deno.deno.dev/?message=hello";
const vercelUrl = "https://devfest2022-deno-examples.vercel.app/?message=hello";

function request() {
  return Promise.all([
    // Deno Deploy
    (async () => {
      const start = Date.now();
      const response = await fetch(denoDeployUrl).then((res) => res.json()) as {
        version: string;
      };
      const end = Date.now();
      return {
        version: response.version,
        time: end - start,
      };
    })(),
    // Vercel
    (async () => {
      const start = Date.now();
      const response = await fetch(vercelUrl).then((res) => res.json()) as {
        version: string;
      };
      const end = Date.now();
      return {
        version: response.version,
        time: end - start,
      };
    })(),
  ]);
}

for (;;) {
  const [deno, vercel] = await request();
  const firstDenoVersion = deno.version;
  const firstVercelVersion = vercel.version;

  await Deno.run({ cmd: ["git", "push"] }).status();
  const start = Date.now();
  console.log("pushed!");
  let isDenoComplete = false;
  let isVercelComplete = false;
  while (true) {
    const [deno, vercel] = await request();
    console.log(`Deno Deploy: ${deno.time}ms, Vercel: ${vercel.time}ms`);

    if (!isDenoComplete && deno.version !== firstDenoVersion) {
      console.log(`Deno Deploy Complete: ${Date.now() - start}ms`);
      isDenoComplete = true;
    }
    if (!isVercelComplete && vercel.version !== firstVercelVersion) {
      console.log(`Vercel Complete: ${Date.now() - start}ms`);
      isVercelComplete = true;
    }
    if (Date.now() - start > 60000) {
      console.log("Timeout");
      break;
    }
    if (isDenoComplete && isVercelComplete) {
      Deno.exit(0);
    }
  }
}
