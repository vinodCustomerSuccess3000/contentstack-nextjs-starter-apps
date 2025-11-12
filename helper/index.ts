import { addEditableTags } from "@contentstack/utils";
import { Page, BlogPosts } from "../typescript/pages";
import getConfig from "next/config";
import { FooterProps, HeaderProps } from "../typescript/layout";
import { getEntry, getEntryByUrl } from "../contentstack-sdk";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async (): Promise<HeaderProps> => {
  const response = (await getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: ["notification_bar.announcement_text"],
  })) as HeaderProps[][];

  liveEdit && addEditableTags(response[0][0], "header", true);
  return response[0][0];
};

export const getFooterRes = async (): Promise<FooterProps> => {
  const response = (await getEntry({
    contentTypeUid: "footer",
    referenceFieldPath: undefined,
    jsonRtePath: ["copyright"],
  })) as FooterProps[][];
  liveEdit && addEditableTags(response[0][0], "footer", true);
  return response[0][0];
};

export const getAllEntries = async (): Promise<Page[]> => {
  const response = (await getEntry({
    contentTypeUid: "page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as Page[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "page", true));
  return response[0];
};

export const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs", 'dictionary', 'allow_list', 'notification_bar_url_list', 'contact_email_list', 'global_navigation_main', 'global_navigation_main.utility_navigation.left_items.item.item_link.internal_page_reference', 'global_navigation_main.utility_navigation.left_ite…rted.hero_media.video_brightcove.video_brightcove', 'global_navigation_main.utility_navigation.left_ite…ti_asset_supported.hero_media.animation.animation', 'global_navigation_main.utility_navigation.left_ite…ulti_asset_supported.hero_media.3d_model.model_3d', 'global_navigation_main.utility_navigation.left_ite…_supported.hero_media.video_youtube.video_youtube', 'global_navigation_main.utility_navigation.right_items.item.item_link.internal_page_reference', 'global_navigation_main.utility_navigation.right_it…rted.hero_media.video_brightcove.video_brightcove', 'global_navigation_main.utility_navigation.right_it…ti_asset_supported.hero_media.animation.animation', 'global_navigation_main.utility_navigation.right_it…ulti_asset_supported.hero_media.3d_model.model_3d', 'global_navigation_main.utility_navigation.right_it…_supported.hero_media.video_youtube.video_youtube', 'global_navigation_main.main_logo.logo_link', 'global_navigation_main.main_logo.logo_link.hero_mu…rted.hero_media.video_brightcove.video_brightcove', 'global_navigation_main.main_logo.logo_link.hero_multi_asset_supported.hero_media.animation.animation', 'global_navigation_main.main_logo.logo_link.hero_multi_asset_supported.hero_media.3d_model.model_3d', 'global_navigation_main.main_logo.logo_link.hero_mu…_supported.hero_media.video_youtube.video_youtube', 'global_navigation_main.main_menu_section.main_menu_section_heading_link.internal_page_reference', 'global_navigation_main.main_menu_section.main_menu…ta.cta_link.internal_page.internal_page_reference', 'global_navigation_main.main_menu_section.main_menu…rted.hero_media.video_brightcove.video_brightcove', 'global_navigation_main.main_menu_section.main_menu…ti_asset_supported.hero_media.animation.animation', 'global_navigation_main.main_menu_section.main_menu…ulti_asset_supported.hero_media.3d_model.model_3d', 'global_navigation_main.main_menu_section.main_menu…_supported.hero_media.video_youtube.video_youtube', 'global_navigation_main.main_menu_section.main_menu…ence.directory.section_cta.cta_link.pdf_reference', 'global_navigation_main.main_menu_section.main_menu…y.section_cta.cta_link.video_brightcove_reference', 'global_navigation_main.main_menu_section.main_menu…tory.section_cta.cta_link.video_youtube_reference', 'global_navigation_main.main_menu_section.main_menu…e.directory.section_cta.cta_link.emodel_reference', 'global_navigation_main.main_menu_section.main_menu…ta.cta_link.internal_page.internal_page_reference', 'global_navigation_main.main_menu_section.main_menu…rted.hero_media.video_brightcove.video_brightcove', 'global_navigation_main.main_menu_section.main_menu…ti_asset_supported.hero_media.animation.animation', 'global_navigation_main.main_menu_section.main_menu…ulti_asset_supported.hero_media.3d_model.model_3d', 'global_navigation_main.main_menu_section.main_menu…_supported.hero_media.video_youtube.video_youtube', 'global_navigation_main.main_menu_section.main_menu…ry.directory_card.card_cta.cta_link.pdf_reference', 'global_navigation_main.main_menu_section.main_menu…card.card_cta.cta_link.video_brightcove_reference', 'global_navigation_main.main_menu_section.main_menu…ry_card.card_cta.cta_link.video_youtube_reference', 'global_navigation_main.main_menu_section.main_menu…directory_card.card_cta.cta_link.emodel_reference', 'global_navigation_main.main_menu_section.subnav_le…subnav_level_1_item_link_.internal_page_reference', 'global_navigation_main.main_menu_section.subnav_le…el_1_item_link_.internal_page_reference.reference', 'global_navigation_main.main_menu_section.subnav_le…e_reference.reference.sticky_navigation.reference', 'global_navigation_main.main_menu_section.subnav_le….subnav_level_2_item_link.internal_page_reference', 'global_navigation_main.main_menu_section.subnav_le…rted.hero_media.video_brightcove.video_brightcove', 'global_navigation_main.main_menu_section.subnav_le…ti_asset_supported.hero_media.animation.animation', 'global_navigation_main.main_menu_section.subnav_le…ulti_asset_supported.hero_media.3d_model.model_3d', 'global_navigation_main.main_menu_section.subnav_le…_supported.hero_media.video_youtube.video_youtube', 'global_navigation_main.main_menu_section.subnav_le….subnav_level_3_item_link.internal_page_reference', 'global_navigation_main.main_menu_section.subnav_le…rted.hero_media.video_brightcove.video_brightcove', 'global_navigation_main.main_menu_section.subnav_le…ti_asset_supported.hero_media.animation.animation', 'global_navigation_main.main_menu_section.subnav_le…ulti_asset_supported.hero_media.3d_model.model_3d', 'global_navigation_main.main_menu_section.subnav_le…_supported.hero_media.video_youtube.video_youtube'],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  })) as Page[];
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getBlogListRes = async (): Promise<BlogPosts[]> => {
  const response = (await getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  })) as BlogPosts[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
  return response[0];
};

export const getBlogPostRes = async (entryUrl: string): Promise<BlogPosts> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  })) as BlogPosts[];
  liveEdit && addEditableTags(response[0], "blog_post", true);
  return response[0];
};
