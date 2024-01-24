export default function sslFix(imgUrl: string | undefined): string | undefined {
  if (!imgUrl) {
    return;
  }
  // also change cdn images to webp variant
  if (imgUrl.includes("cdn.gametools.network")) {
    return imgUrl?.replace(".png", ".webp")?.replace(".jpg", ".webp");
  }
  return imgUrl?.replace(
    "http://eaassets-a.akamaihd.net",
    "https://eaassets-a.akamaihd.net",
  );
}
