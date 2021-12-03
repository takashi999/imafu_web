export interface ModifyTenantByTenantRequest {
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
}

export interface ModifyTenantCastScheduleSettingRequest{
  no_schedule_comment: string;
  dashboard_display_num: number;
  dashboard_minute_step: number;
}
