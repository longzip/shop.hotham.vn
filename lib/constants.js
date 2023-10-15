export const WORDPRESS_URL = new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL)
  .hostname;
export const CMS_NAME = process.env.CMS_NAME;
export const CMS_URL = process.env.CMS_URL;
export const FB_PAGE_ID = process.env.FB_PAGE_ID;
export const WEBSITE_URL = process.env.WEBSITE_URL || "https://shop.hotham.vn";

export const INPUT_SECRET =
  process.env.INPUT_SECRET || "b_03e33e3cdd5e422de02a01d6e_5eb6c62783";
export const MAILCHIMP_FORM_URL =
  process.env.MAILCHIMP_FORM_URL ||
  "https://buudienxatulap.us5.list-manage.com/subscribe/post?u=03e33e3cdd5e422de02a01d6e&amp;id=5eb6c62783&amp;f_id=00e87aebf0";

export const MAILCHIMP_FORM_CONN =
  process.env.MAILCHIMP_FORM_CONN ||
  "https://chimpstatic.com/mcjs-connected/js/users/03e33e3cdd5e422de02a01d6e/8ba7a1053930979e3c39a1a64.js";

export const FB_PAGE_URL =
  process.env.FB_PAGE_URL || "https://www.facebook.com/ThamBuuDien";
export const YOUTUBE_PAGE_URL =
  process.env.YOUTUBE_PAGE_URL || "https://youtube.com/@hothamvn";
export const ZALO_PAGE_URL =
  process.env.ZALO_PAGE_URL || "https://zalo.me/0978333963";
export const TIKTOK_PAGE_URL =
  process.env.TIKTOK_PAGE_URL || "https://www.tiktok.com/@hotham.vn";
export const INSTAGRAM_PAGE_URL =
  process.env.INSTAGRAM_PAGE_URL || "https://www.instagram.com/thambuudien/";
