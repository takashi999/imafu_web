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
  deleted_at?: any;
}

export interface OperationTenant {
  id: number;
  name: string;
  catch: string;
  region: string;
  open_time: string;
  open_time_end: string;
  reception_time: string;
  reception_time_end: string;
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
    id: number;
    file_url: string;
    sequence: number;
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
