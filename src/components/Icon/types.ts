import { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react";

export type IconProps = PropsWithChildren<{
  icon: Glyph;
  size?: number;
}> &
  ComponentPropsWithoutRef<"i">;

// Glyph Types
export enum GlyphsEnum {
  "alert-triangle" = "alert-triangle",
  "mail" = "mail",
  "lock" = "lock",
  "eye-on" = "eye-on",
  "eye-off" = "eye-off",
  times = "times",
  filter = "filter",
  save = "save",
  "logout" = "logout",
  "user" = "user",
  "notification" = "notification",
  "search" = "search",
  "dashboard" = "dashboard",
  "chevron-left" = "chevron-left",
  "chevron-right" = "chevron-right",
  "arrow-right" = "arrow-right",
  "arrow-left" = "arrow-left",
  "triangle-down" = "triangle-down",
  "triangle-up" = "triangle-up",
  "more-vertical" = "more-vertical",
  "edit" = "edit",
  "archive" = "archive",
  "plus" = "plus",
  "circle-check" = "circle-check",
  "check" = "check",
  "alert-octgon" = "alert-octgon",
  "circle-info" = "circle-info",
  "contact" = "contact",
  "import" = "import",
  "export" = "export",
  "reload" = "reload",
  "new" = "new",
  "telephone" = "telephone",
  "close" = "close",
  "calendar" = "calendar",
  "minus" = "minus",
}

export type Glyphs = { [key in GlyphsEnum]: FC };
export type Glyph = keyof typeof GlyphsEnum;
