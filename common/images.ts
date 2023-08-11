import { Activity, ActivityClass } from "@/types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
type ImageType = {
  [key: string | ActivityClass]: StaticImport;
};
const Images: ImageType = {
  ic_logo: require("../assets/ic_logo.png"),
  ic_grapic1: require("../assets/ic_grapic1.png"),
  ic_grapic2: require("../assets/ic_grapic2.png"),
  ic_grapic3: require("../assets/ic_grapic3.png"),
  ic_grapic4: require("../assets/ic_grapic4.png"),
  ic_google: require("../assets/ic_google.png"),
  ic_calendar: require("../assets/ic_calendar.png"),
  ic_contact: require("../assets/ic_contact.png"),
  ic_dashboard: require("../assets/ic_dashboard.png"),
  ic_dollar: require("../assets/ic_dollar.png"),
  ic_search: require("../assets/ic_search.png"),
  ic_task_checked: require("../assets/ic_task_checked.png"),
  ic_ticket: require("../assets/ic_ticket.png"),
  ic_settings: require("../assets/ic_settings.png"),
  ic_calendar_white: require("../assets/ic_calendar_white.png"),
  ic_contact_white: require("../assets/ic_contact_white.png"),
  ic_dashboard_white: require("../assets/ic_dashboard_white.png"),
  ic_dollar_white: require("../assets/ic_dollar_white.png"),
  ic_search_white: require("../assets/ic_search_white.png"),
  ic_task_checked_white: require("../assets/ic_task_checked_white.png"),
  ic_ticket_white: require("../assets/ic_ticket_white.png"),
  ic_settings_white: require("../assets/ic_settings_white.png"),
  ic_chevron_up: require("../assets/ic_chevron_up.png"),
  ic_chevron_down: require("../assets/ic_chevron_down.png"),
  ic_book: require("../assets/ic_book.png"),
  ic_book_white: require("../assets/ic_book_white.png"),

  ic_canoe: require("../assets/ic_canoe.png"),
  ic_paintball: require("../assets/ic_paintball.png"),
  ic_pool: require("../assets/ic_pool.png"),
  ic_zipline: require("../assets/ic_zipline.png"),

  ic_cc_arrow: require("../assets/ic_cc_arrow.png"),
  ic_cc_arrow_white: require("../assets/ic_cc_arrow_white.png"),
  ic_group: require("../assets/ic_group.png"),
  ic_group_white: require("../assets/ic_group_white.png"),
  ic_upload: require("../assets/ic_upload.png"),
  ic_upload_white: require("../assets/ic_upload_white.png"),
  ic_clip: require("../assets/ic_clip.png"),
  ic_setup: require("../assets/ic_setup.png"),
  ic_staff_id: require("../assets/ic_staff_id.png"),
  ic_camp: require("../assets/ic_camp.png"),
  ic_setup_white: require("../assets/ic_setup_white.png"),
  ic_staff_id_white: require("../assets/ic_staff_id_white.png"),
  ic_camp_white: require("../assets/ic_camp_white.png"),
  ic_back: require("../assets/ic_back.png"),
  ic_back_white: require("../assets/ic_back_white.png"),
  ic_edit_gray: require("../assets/ic_edit_gray.png"),
  ic_location: require("../assets/ic_location.png"),
  ic_clock: require("../assets/ic_clock.png"),
  ic_user_fill: require("../assets/ic_user_fill.png"),
  ic_check: require("../assets/ic_check.png"),
  ic_close: require("../assets/ic_close.png"),
  ic_check_green: require("../assets/ic_check_green.png"),
  ic_close_red: require("../assets/ic_close_red.png"),

  // Activities
  [Activity["Custom"]]: require("../assets/activities/Custom.png"),
  [Activity["Basketball"]]: require("../assets/activities/Basketball.png"),
  [Activity["Canoe"]]: require("../assets/activities/Canoe.png"),
  [Activity["Hiking"]]: require("../assets/activities/Hiking.png"),
  [Activity["Paintball"]]: require("../assets/activities/Paintball.png"),
  [Activity["Pool"]]: require("../assets/activities/Pool.png"),
  [Activity["Zipline"]]: require("../assets/activities/Zipline.png"),

  //arnold import
  ic_user_profile: require("../assets/ic_user_profile.png"),
  ic_user_group: require("../assets/ic_user_group.png"),
  ic_doc_icon: require("../assets/ic_doc_icon.png"),
  ic_user_image: require("../assets/ic_user_image.png"),
};

export default Images;
