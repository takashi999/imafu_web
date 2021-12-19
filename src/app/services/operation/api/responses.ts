export interface OperationUser {
  id: number;
  login_id: string;
  display_name: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  role: OperationUserRole;
  created_by: number;
  updated_by: number;
  is_deletable: boolean;
}

export interface OperationUserRole {
  id: number;
  name: string;
  display_name: string;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface OperationTenantUser {
  id: number;
  tenant_id: number;
  login_id: string;
  is_system: number;
  created_at: string;
  updated_at: string;
  deleted_at: any | null;
}

export interface OperationTenant {
  id: number;
  name: string;
  catch: string;
  region: string;
  open_time: string;
  open_time_end: string;
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
  deleted_at: any | null;
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
  users: OperationTenantUser[];
  sector: {
    id: number;
    display_name: string;
  };
  plan: {
    id: number;
    display_name: number;
    is_limited: boolean;
  };
  casts: OperationTenantCast[];
  foreign_links: OperationTenantForeignLink[];
  free_galleries: OperationTenantFreeGallery[];
  groups: OperationTenantGroup[];
  tenant_sector_id: number;
  tenant_plan_id: number;
  begin_plan_limit_date: string | null;
  end_plan_limit_date: string | null;
  plan_price: number;
  begin_publish_date: string;
  end_publish_date: string | null;
  refresh_place_rate_limit_per_date: number;
  shop_news_rate_limit_per_date: number;
  is_suspend: number;
  tenant_support_regions: { id: number; display_name: string }[];
  banner_images: {
    created_at: string;
    file_path: {
      created_at: string;
      deleted_at: string | null;
      id: number;
      updated_at: string;
    };
    file_path_id: number;
    file_url: string;
    id: number;
    sequence: number;
    tenant_id: number;
    updated_at: string;
    tenant_banner_image_cast_link: {
      id: number;
      tenant_banner_image_id: number;
      tenant_cast_id: number;
      tenant_free_banner_cast_link_type_id: number;
    } | null;
    tenant_banner_image_tenant_link: {
      id: number;
      tenant_banner_image_id: number;
      tenant_free_banner_image_tenant_link_type_id: number;
    } | null;
    tenant_banner_image_free_gallery_link: {
      id: number;
      tenant_banner_image_tenant_link_id: number;
      tenant_free_gallery_id: number;
    } | null;
    tenant_banner_image_foreign_link: {
      id: number;
      tenant_banner_image_tenant_link_id: number;
      tenant_foreign_link_id: number;
    } | null;
  }[];
}

export interface OperationTenantGroup {
  created_at: string;
  created_by: number;
  id: number;
  name: string;
  updated_at: string;
  updated_by: number;
  tenants: OperationTenant[] | null;
}

export interface OperationTenantCastServiceType {
  id: number;
  service_type_id: string;
  display_name: string;
}


export interface OperationTenantCast {
  id: number;
  tenant_id: number;
  publish_at: string | null;
  display_name: string;
  display_name_kana: string;
  is_use_original_image: number;
  is_opened_face: number;
  is_newbie: number;
  is_trial: number;
  age: number | null;
  age_selected_at: string | null;
  height: number | null;
  bust: number | null;
  cup: string | null;
  waist: number | null;
  hip: number | null;
  blood_type: string | null;
  is_smoker: number | null;
  is_irezumi: number | null;
  is_tattoo: number | null;
  is_shiohuki: number;
  is_paipan: number;
  is_pregnant: number;
  birth_month: number | null;
  birth_date: number | null;
  similar_famous: string;
  similar_famous_kana: string;
  sm_barometer: number | null;
  message: string;
  is_use_photo_diary: number;
  is_use_video_diary: number;
  is_use_fan_letter: number;
  created_at: string;
  updated_at: string;
  sequence: number;
  images: OperationTenantCastImage[];
  details: OperationTenantCastDetail[];
  services: OperationTenantCastService[];
  types: OperationTenantCastType[];
  style: OperationTenantCastStyle | null;
}

export interface OperationTenantCastImage {
  id: number;
  tenant_cast_id: number;
  file_path_id: number;
  created_at: string;
  updated_at: string;
  file_url: string;
  file_path: OperationTenantCastFilePath | null;
}

export interface OperationTenantCastFilePath {
  id: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}

export interface OperationTenantCastDetail {
  id: number;
  tenant_cast_id: number;
  title: string;
  detail: string;
  created_at: string;
  updated_at: string;
}

export interface OperationTenantCastService {
  id: number;
  tenant_cast_id: number;
  tenant_cast_service_type_id: number;
  created_at: string;
  updated_at: string;
}

export interface OperationTenantCastType {
  id: number;
  tenant_cast_id: number;
  tenant_cast_type_id: number;
  created_at: string;
  updated_at: string;
}

export interface OperationTenantCastStyle {
  id: number;
  tenant_cast_id: number;
  tenant_cast_style_type_id: number;
  created_at: string;
  updated_at: string;
}

export interface OperationTenantForeignLink {
  id: number;
  tenant_id: number;
  link_address: string;
  accept_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OperationTenantFreeGallery {
  id: number;
  tenant_id: number;
  publish_at: string | null;
  title: string;
  comment: string;
  created_at: string;
  updated_at: string;
  sequence: number;
  images: OperationTenantFreeGalleryImage[];
}

export interface OperationTenantFreeGalleryImage {
  id: number;
  tenant_free_gallery_id: number;
  file_path_id: number;
  created_at: string;
  updated_at: string;
  file_url: string;
  file_path: {
    id: number
    deleted_at: any
    created_at: string
    updated_at: string
  };
}

export interface OperationSiteConfigResponse {
  is_enabled_front_basic: boolean;
}
