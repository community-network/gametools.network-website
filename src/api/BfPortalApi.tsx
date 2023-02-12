import JsonClient from "./Json";

interface meta {
  total_count: number;
}

interface experienceItem {
  like_count: number;
  id: number;
  url: string;
  full_url: string;
  title: string;
  description: string;
  cover_img_url: string;
  code: string;
  exp_url: string;
  featured: boolean;
  bugged: boolean;
}

interface experienceReturn {
  meta: meta;
  items: experienceItem[];
}

interface experienceRequest {
  title: string;
}

interface experienceSearchRequest {
  searchTerm: string;
}

export class ApiProvider extends JsonClient {
  constructor() {
    super();
  }

  /**
   * Return with same title
   * @param param0 experienceRequest
   * @returns Promise<experienceReturn>
   */
  async experience({ title }: experienceRequest): Promise<experienceReturn> {
    const r = await fetch(
      `https://api.bfportal.gg/?title=${encodeURIComponent(title)}`,
    );
    return r.json();
  }

  /**
   * Return multiple experiences
   * @param param0 experienceSearchRequest
   * @returns Promise<experienceReturn>
   */
  async search({
    searchTerm,
  }: experienceSearchRequest): Promise<experienceReturn> {
    const r = await fetch(
      `https://api.bfportal.gg/?search=${encodeURIComponent(searchTerm)}`,
    );
    return r.json();
  }
}

export const BfPortalApi = new ApiProvider();
