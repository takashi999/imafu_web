export interface CreateTenantRequest {
  name: string;
  catch: string;
  tel: string[];
  line_id: string;
  line_url: string;
  form_email: string;
  region: string;
  open_time: string;
  open_time_duration: string;
  reception_time: string;
  reception_time_duration: string;
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

export interface ModifyTenantRequest {
  name: string;
  catch: string;
  tel: string[];
  line_id: string;
  line_url: string;
  form_email: string;
  region: string;
  open_time: string;
  open_time_duration: string;
  reception_time: string;
  reception_time_duration: string;
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
  password: string | null;
}
