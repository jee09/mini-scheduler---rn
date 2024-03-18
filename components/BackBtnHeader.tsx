import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextStyled from "./TextStyled";
import SvgIcon from "./SvgIcon";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

export interface IBackBtnHeaderTemplate {
  onBackEvent?: Function;
  isBackBtn?: boolean;
  title?: string;
}

const BackBtnHeader = (props: IBackBtnHeaderTemplate) => {
  const navi = useNavigation();
  const onBackBtnEvent = () => {
    if (props.onBackEvent) {
      props.onBackEvent();
    } else {
      navi.goBack();
    }
  };
  return (
    <SafeAreaView>
      <Container>
        <LeftIconWrapper onPress={onBackBtnEvent}>
          <SvgIcon name="ChevronLeft" />
        </LeftIconWrapper>
        <TitleWrapper>
          <TextStyled isBold fontSize={22}>
            {props.title}
          </TextStyled>
        </TitleWrapper>
        <RightSpaceWrapper />
      </Container>
    </SafeAreaView>
  );
};
export default BackBtnHeader;

const Container = styled.View`
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: white;
`;
const LeftIconWrapper = styled.Pressable`
  flex: 1;
  justify-content: flex-start;
`;

const TitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const RightSpaceWrapper = styled.View`
  flex: 1;
`;
