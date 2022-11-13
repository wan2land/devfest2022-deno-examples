async function sha256(str: string) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str),
  );
  return [
    ...new Uint8Array(buf),
  ]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join(
      "",
    );
}

console.log(await sha256("blabla"));
