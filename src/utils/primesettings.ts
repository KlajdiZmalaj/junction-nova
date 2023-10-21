import PrimeReact, { FilterMatchMode } from "primereact/api";
// import "primereact/resources/themes/tailwind-light/theme.css";
import "@/theme/theme.scss";
import "primereact/resources/primereact.min.css";

PrimeReact.appendTo = "self";
PrimeReact.cssTransition = true;
PrimeReact.ripple = true;

PrimeReact.filterMatchModeOptions = {
  text: [
    FilterMatchMode.STARTS_WITH,
    FilterMatchMode.CONTAINS,
    FilterMatchMode.NOT_CONTAINS,
    FilterMatchMode.ENDS_WITH,
    FilterMatchMode.EQUALS,
    FilterMatchMode.NOT_EQUALS,
  ],
  numeric: [
    FilterMatchMode.EQUALS,
    FilterMatchMode.NOT_EQUALS,
    FilterMatchMode.LESS_THAN,
    FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
    FilterMatchMode.GREATER_THAN,
    FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
  ],
  date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER],
};
PrimeReact.zIndex = {
  modal: 1100, // dialog, sidebar
  overlay: 1000, // dropdown, overlaypanel
  menu: 1000, // overlay menus
  tooltip: 1100, // tooltip
  toast: 1200, // toast
};

PrimeReact.autoZIndex = true;
