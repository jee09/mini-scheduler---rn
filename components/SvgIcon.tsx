// https://velog.io/@ricale/React-Native-%EC%97%90-SVG-Icon-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9E%91%EC%84%B1

import React from "react";
import { SvgProps } from "react-native-svg";
import * as Icons from "../assets/icons";

type TSvgIconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
};
const SvgIcon = ({
  name,
  fill = "none",
  width: _width,
  height: _height,
  size,
  ...props
}: TSvgIconProps) => {
  const Comp = Icons[name];

  const width = _width ?? size;
  const height = _height ?? size;
  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return <Comp {...props} fill={fill} {...sizeProps} scaleX={1} />;
};

export default SvgIcon;
