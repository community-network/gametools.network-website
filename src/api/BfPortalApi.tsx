import JsonClient from "./Json";

interface meta {
  total_count: number;
}

interface experienceItem {
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

export class ApiProvider extends JsonClient {
  constructor() {
    super();
  }

  async experience({ title }: experienceRequest): Promise<experienceReturn> {
    const r = await fetch(
      `https://api.bfportal.gg/?title=${encodeURIComponent(title)}`,
    );
    return r.json();
  }
}

export const BfPortalApi = new ApiProvider();
