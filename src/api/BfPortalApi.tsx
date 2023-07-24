import JsonClient from "./Json";

interface meta {
  total_count: number;
}

interface discordAccount {
  id: string;
  username: string;
  global_name: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  banner_color: string;
  accent_color: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  avatar_decoration: string;
  email: string;
  verified: boolean;
}

interface socialAccounts {
  discord: discordAccount;
}

interface user {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  social_account: socialAccounts;
}

interface likedUser {
  id: number;
  user: user;
  is_mock_user: false;
  hide_username: false;
}

interface experienceMeta {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: string;
  alias_of: string;
  locale: string;
}

interface categoryItem {
  id: number;
  name: string;
  visible: boolean;
  selectable_on_form: boolean;
  not_ready: boolean;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_image: string;
}

interface experienceItem {
  id: number;
  meta: experienceMeta;
  title: string;
  owner: user;
  featured: boolean;
  description: string;
  code: string;
  exp_url: string;
  tags: string[];
  vid_url: string;
  cover_img_url: string;
  no_players: number;
  no_bots: number;
  category: categoryItem;
  sub_categories: categoryItem[];
  bugged: boolean;
  broken: boolean;
  xp_farm: boolean;
  first_publish: boolean;
  liked_by: likedUser[];
  creators: user[];
  allow_editing: boolean;
  is_mock: boolean;
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

  /**
   * Return with same title
   * @param param0 experienceRequest
   * @returns Promise<experienceReturn>
   */
  async experience({ title }: experienceRequest): Promise<experienceReturn> {
    const r = await fetch(
      `https://bfportal.gg/api/experiences/?type=core.ExperiencePage&fields=*&title=${encodeURIComponent(
        title,
      )}`,
    );
    return r.json();
  }
}

export const BfPortalApi = new ApiProvider();
