import React from "react";
import styled from "styled-components/native";
import { TextStyle } from "react-native";

interface TextStyledProps extends TextStyle {
  fontSize?: number;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  isBold?: boolean;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
}

const TextStyled = styled.Text<TextStyledProps>`
  font-size: ${(props) => props.fontSize || 14}px;
  font-weight: ${(props) => props.fontWeight || "500"};
  font-family: ${(props) =>
    props.isBold ? "Cafe24Ohsquare" : "Cafe24OhsquareAir"};
  text-align: ${(props) => props.textAlign || "left"};
`;

export default TextStyled;
