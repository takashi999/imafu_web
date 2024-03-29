export interface TenantUser {
  id: number;
  tenant_id: number;
  login_id: string;
  is_system: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}

export interface Tenant {
  id: number;
  name: string;
  catch: string;
  region: string;
  open_time: string;
  open_time_end: string | null;
  reception_time: string;
  reception_time_end: string | null;
  close_date: string;
  lowest_cost: number;
  regular_services: string;
  regular_service_price: number;
  enable_receipt: number;
  note: string;
  use_timetable: number;
  enable_edit_timetable_on_cast: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  deleted_at?: any;
  tels: {
    id: number;
    tenant_id: number;
    tel: string;
    created_at: string;
    updated_at: string;
  }[] | null;
  line: {
    id: number
    tenant_id: number;
    line_id: string | null;
    line_url: string | null;
    created_at: string;
    updated_at: string;
  } | null;
  services: {
    id: number;
    tenant_id: number;
    name: string;
    price: number;
    created_at: string;
    updated_at: string;
  }[] | null;
  credit_cards: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    laravel_through_key: number;
  }[] | null;
  form: {
    id: number;
    tenant_id: number;
    email: string;
    created_at: string;
    updated_at: string;
  } | null;
  shop_news_remaining: number;
}

export type EditableTextTypes = {
  id: number;
  type: string;
}[]
export type CastServiceTypes = {
  id: number;
  service_type_id: string;
  display_name: string;
}[]
export type CastTypes = {
  id: number;
  display_name: string;
}[]
export type CastStyleTypes = {
  id: number;
  display_name: string;
}[]
export type FreeBannerDisplaySpaces = {
  id: number;
  space_id: string;
  display_name: string;
}[]
export type FreeBannerImageCastLinkTypes = {
  id: number;
  type_id: string;
  display_name: string;
}[]
export type FreeBannerImageTenantLinkTypes = {
  id: number;
  type_id: string;
  display_name: string;
}[]
export type FreeBlockDisplaySpaces = {
  id: number;
  space_id: string;
  display_name: string;
}[]
export type FreeBlockDisplayTypes = {
  id: number;
  display_type_id: string;
  display_name: string;
}[]
export type FreeImageTypes = {
  id: number;
  type_id: string;
  display_name: string;
}[]
export type ForeignLinks = {
  id: number;
  tenant_id: number;
  link_address: string;
}[]

export interface TenantCast {
  id: number;
  tenant_id: number;
  publish_at: string | null;
  display_name: string;
  display_name_kana: string;
  is_use_original_image: boolean;
  is_opened_face: boolean;
  is_newbie: boolean;
  is_trial: boolean;
  age: number | null;
  age_selected_at: string | null;
  height: number | null;
  bust: number | null;
  cup: string | null;
  waist: number | null;
  hip: number | null;
  blood_type: string | null;
  is_smoker: boolean | null;
  is_irezumi: boolean | null;
  is_tattoo: boolean | null;
  is_shiohuki: boolean | null;
  is_paipan: boolean | null;
  is_pregnant: boolean | null;
  birth_month: number | null;
  birth_date: number | null;
  similar_famous: string;
  similar_famous_kana: string;
  sm_barometer: number;
  message: string;
  is_use_photo_diary: boolean;
  photo_diary_key: string | null;
  photo_diary_mail_address: string | null;
  is_use_video_diary: boolean;
  video_diary_key: string | null;
  video_diary_mail_address: string | null;
  is_use_fan_letter: boolean;
  is_recommend: boolean;
  created_at: string;
  updated_at: string;
  sequence: number;
  details: {
    created_at: string;
    detail: string;
    id: number
    tenant_cast_id: number
    title: string;
    updated_at: string;
  }[];
  services: {
    created_at: string;
    id: number;
    tenant_cast_id: number;
    tenant_cast_service_type_id: number;
    updated_at: string;
  }[];
  images: {
    created_at: string;
    file_path: {
      id: number;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    }
    file_path_id: number;
    file_url: string;
    id: number;
    tenant_cast_id: number;
    updated_at: string;
  }[];
  style: {
    tenant_cast_style_type_id: number
  } | null;
  types: {
    tenant_cast_type_id: number
  }[];
  user: {
    login_id: string;
  } | null;
  first_image_url: string;
}

export interface TenantCastScheduleSettingResponse {
  no_schedule_comment: string;
  dashboard_display_num: number;
  dashboard_minute_step: number;
}

export interface TenantCastScheduleResponse {
  id: number;
  tenant_id: number;
  tenant_cast_id: number;
  schedule_date: string;
  start_time: string;
  end_time: string;
  finished_at: string | null;
  comment: string;
  time_to_available_minutes: number | null;
  is_working_now: boolean;
  created_at: string;
  updated_at: string;
}

export type TenantCastScheduleListResponse = TenantCastScheduleResponse[];

export interface TenantCastScheduleStandbyResponse extends TenantCastScheduleResponse {
  cast: TenantCast;
  stand_by_status: {
    id: number;
    tenant_cast_schedule_id: number;
    start_time: string;
    deleted_at: null;
    created_at: string;
    updated_at: string;
  };
}

export type TenantCastScheduleStandbyListResponse = TenantCastScheduleStandbyResponse[];

export interface TenantRanking {
  id: number;
  tenant_id: number;
  is_publish_on_top: boolean;
  publish_at: string | null;
  title: string;
  comment: string;
  thumbnail_file_path_id: number;
  created_at: string;
  updated_at: string;
  thumbnail_file_url: string;
  casts: TenantCast[];
  thumbnail_file_path: TenantRankingThumbnailFilePath;
}

export interface TenantRankingThumbnailFilePath {
  id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TenantLayout {
  id: number;
  tenant_id: number;
  side_tenant_layout_contents_type_id: number;
  pc_shop_bg_image_size: string;
  pc_shop_bg_image_attachment: string;
  pc_shop_bg_color: string;
  pc_shop_bg_image_file_path_id: number;
  created_at: string;
  updated_at: string;
  modules: TenantLayoutModuleRelation[];
  top_side_content: TenantLayoutTopSideContent | null;
  side_content: TenantLayoutSideContent | null;
  bg_image_file_path: TenantLayoutBgImageFilePath | null;
  bg_image_file_url: string | null;
  ranking: TenantLayoutRankingRelation | null;
}

export interface TenantLayoutModuleRelation {
  id: number;
  tenant_layout_id: number;
  is_side: number;
  tenant_layout_module_type_id: number;
  sequence: number;
  is_enabled: number;
  created_at: string;
  updated_at: string;
}

export interface TenantLayoutTopSideContent {
  id: number;
  type_id: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface TenantLayoutSideContent {
  id: number;
  type_id: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface TenantLayoutBgImageFilePath {
  id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TenantLayoutRankingRelation {
  id: number;
  is_top: boolean;
  tenant_layout_id: number;
  tenant_ranking_id: number;
  created_at: string;
  updated_at: string;
}

export interface TenantCastPhotoDiaryList {
  current_page: number;
  data: TenantCastPhotoDiary[];
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface TenantCastPhotoDiary {
  id: number;
  tenant_id: number;
  tenant_cast_id: number;
  title: string;
  post_at: string;
  editable_text_type_id: number;
  content: string;
  images?: {
    id: number;
    tenant_cast_photo_diary_id: number;
    file_path_id: number;
    file_url: string;
  }[];
  cast?: TenantCast;
  created_at: string;
  updated_at: string;
}

export interface TenantFreeBanner {
  id: number;
  tenant_id: number;
  publish_at: string | null;
  title: string;
  tenant_free_banner_display_space_id: number;
  is_following_scroll: number;
  created_at: string;
  updated_at: string;
  sequence: number;
  images: TenantFreeBannerImage[];
}

export interface TenantFreeBannerImage {
  id: number;
  tenant_free_banner_id: number;
  comment: string;
  file_path_id: number;
  created_at: string;
  updated_at: string;
  file_url: string;
  tenant_link: TenantFreeBannerLink | null;
  cast_link: TenantFreeBannerCastLink | null;
  tenant_free_banner_image_free_gallery_link: TenantFreeBannerFreeGalleryLink | null;
  tenant_free_banner_image_foreign_link: TenantFreeBannerForeignLink | null;
  file_path: {
    id: number;
    file_url: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface TenantFreeBannerLink {
  id: number;
  tenant_free_banner_image_id: number;
  tenant_free_banner_image_tenant_link_type_id: number;
  created_at: string;
  updated_at: string;
  free_gallery_link: TenantFreeBannerFreeGalleryLink | null;
  foreign_link: TenantFreeBannerForeignLink | null;
  tenant_free_banner_image_tenant_link_type: TenantFreeBannerImageTenantLinkType;
}

export interface TenantFreeBannerImageTenantLinkType {
  id: number;
  type_id: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface TenantFreeBannerCastLink {
  id: number;
  tenant_free_banner_image_id: number;
  tenant_cast_id: number;
  tenant_free_banner_image_cast_link_type: {
    id: number;
    type_id: string;
    display_name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface TenantFreeBannerFreeGalleryLink {
  id: number;
  tenant_free_banner_image_tenant_link_id: number;
  tenant_free_gallery_id: number;
  created_at: string;
  updated_at: string;
}


export interface TenantFreeBannerForeignLink {
  id: number;
  tenant_free_banner_image_tenant_link_id: number;
  tenant_foreign_link_id: number;
  created_at: string;
  updated_at: string;
}

export interface TenantEventNews {
  id: number;
  tenant_id?: number;
  is_use?: 1 | 0;
  publish_start_at?: string;
  publish_end_at?: string;
  editable_text_type_id?: number;
  content?: string;
  updated_by?: number;
  updated_at?: string;
  created_at?: string;
}

export interface TenantShopNews {
  id: number;
  tenant_id: number;
  create_date: string;
  publish_at: string;
  editable_text_type_id: number;
  content: string;
  updated_by: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}
