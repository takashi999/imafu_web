export interface CreateTenantRequest {
  groups: number[];
  name: string;
  sector: number;
  support_regions: number[];
  plan: number;
  begin_plan_limit_date: string | null;
  end_plan_limit_date: string | null;
  plan_price: number;
  begin_publish_date: string;
  end_publish_date: string | null;
  refresh_place_rate_limit_per_date: number;
  shop_news_rate_limit_per_date: number;
  is_suspend: boolean;
  catch: string;
  tel: string[];
  line_id: string;
  line_url: string;
  form_email: string;
  region: string;
  open_time: string;
  open_time_end: string;
  reception_time: string;
  reception_time_end: string;
  close_date: string;
  lowest_cost: number;
  regular_services: string;
  services: { name: string; price: number }[];
  regular_service_price: number;
  enable_receipt: boolean;
  credit_cards: number[];
  note: string;
  use_timetable: boolean;
  enable_edit_timetable_on_cast: boolean;
  login_id: string;
  password: string;
}

export interface CreateTenantGroupRequest {
  name: string;
}

export interface CreateOperationTenantUserRequest {
  login_id: string;
  password: string;
}

export interface ModifyOperationTenantUserRequest {
  login_id: string;
  password: string | null;
}

export interface ModifyOperationTenantCastServiceTypeRequest {
  service_type_id: string;
  display_name: string;
}

export interface OperationSiteConfigRequest {
  is_enabled_front_basic: boolean;
}

export interface CreateOperationSiteNewsRequest {
  title: string;
  publish_start_at: string;
  publish_end_at: string | null;
}
