export default function sslFix(imgUrl: string | undefined): string | undefined {
  return imgUrl?.replace(
    "http://eaassets-a.akamaihd.net",
    "https://eaassets-a.akamaihd.net",
  );
}
