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
  open_time_duration: string;
  reception_time: string;
  reception_time_duration: string;
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
  is_use_video_diary: boolean;
  is_use_fan_letter: boolean;
  created_at: string;
  updated_at: string;
  sequence: number;
}
