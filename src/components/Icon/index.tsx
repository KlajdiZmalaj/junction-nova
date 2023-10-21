import React, { FC } from "react";
import { IconProps } from "./types";
import glyphs from "./glyphs";

const Icon: FC<IconProps> = ({ icon, size = 16, className = "", onClick, ...props }) => {
  const Glyph = glyphs[icon];
  return (
    <div
      className={`flex justify-center items-center [&_*]:fill-current [&>svg]:w-full ${className}`}
      style={{ width: size, cursor: onClick ? "pointer" : "" }}
      onClick={onClick}
      {...props}
    >
      {Glyph && <Glyph />}
    </div>
  );
};

export default Icon;
