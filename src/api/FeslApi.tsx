import JsonClient from "./Json";

interface playerSearchRequest {
  name: string;
  platform: string;
}

interface playerResult {
  pid: number;
  name: string;
}

interface playerSearchReturn {
  query: string;
  namespace: string;
  results: playerResult[];
}

export class ApiProvider extends JsonClient {
  constructor() {
    super();
  }

  /**
   * Return found playernames
   * @param param0 playerSearchRequest
   * @returns Promise<playerSearchReturn>
   */
  async playerSearch({
    name,
    platform,
  }: playerSearchRequest): Promise<playerSearchReturn> {
    const r = await fetch(
      `https://fesl.gametools.network/persona/${platform}/search-name/${encodeURIComponent(
        name + "*",
      )}`,
    );
    return r.json();
  }
}

export const FeslApi = new ApiProvider();
