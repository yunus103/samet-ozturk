import { seoType } from "./objects/seo";
import { socialLinkType } from "./objects/socialLink";
import { videoItemType } from "./objects/videoItem";
import { galleryImageType } from "./objects/galleryImage";
import { statItemType } from "./objects/statItem";
import { siteSettingsType } from "./singletons/siteSettings";
import { navigationType } from "./singletons/navigation";
import { homePageType } from "./singletons/homePage";
import { blogPostType } from "./documents/blogPost";

export const schemaTypes = [
  // Objects
  seoType,
  socialLinkType,
  videoItemType,
  galleryImageType,
  statItemType,
  // Singletons
  siteSettingsType,
  navigationType,
  homePageType,
  // Collections
  blogPostType,
];
