export const SETTINGS_KEYS = [
  "hero_image_url",
  "contact_email",
  "instagram_url",
  "tiktok_url",
  "youtube_url",
  "media_kit_url",
] as const;

export type SettingsKey = (typeof SETTINGS_KEYS)[number];
