const url = "https://http-jxybebofzq-du.a.run.app/?message=hello";

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
    cmd: [
      "gcloud",
      "functions",
      "deploy",
      "http",
      "--region",
      "asia-northeast3",
      "--runtime",
      "nodejs16",
      "--trigger-http",
      "--gen2",
      "--allow-unauthenticated",
      "--memory",
      "1024",
    ],
    cwd: "./gcp_function",
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
