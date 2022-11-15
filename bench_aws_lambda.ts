const url =
  "https://oguarmzimf.execute-api.ap-northeast-2.amazonaws.com/?message=hello";

async function request() {
  const start = Date.now();
  const response = await fetch(url).then((res) => res.json()) as {
    version: string;
  };
  const end = Date.now();
  return {
    version: response.version,
    time: end - start,
  };
}

for (;;) {
  const { version: firstVersion } = await request();

  const start = Date.now();
  Deno.run({
    cmd: ["npx", "serverless", "deploy"],
    cwd: "./aws_lambda",
    stdout: "null",
    stderr: "null",
  }).status().then(() => {
    console.log(`Command Complete: ${Date.now() - start}ms`);
  });

  while (true) {
    const { version, time } = await request();
    console.log(`Response: ${time}ms`);

    if (version !== firstVersion) {
      console.log(`Deploy Complete: ${Date.now() - start}ms`);
      Deno.exit(0);
    }
    if (Date.now() - start > 60000) {
      console.log("Timeout");
      break;
    }
  }
}
