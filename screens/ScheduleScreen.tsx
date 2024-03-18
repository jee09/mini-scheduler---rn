import react from "react";
import Header from "../components/Header";
import BackBtnHeader from "../components/BackBtnHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProps } from "../navigation/types";
import styled from "styled-components/native";

const ScheduleScreen = () => {
  const navi = useNavigation<StackNavigationProps>();

  const onBackEvent = () => {
    navi.navigate("Tabs", { screen: "Home" });
  };

  return (
    <>
      <Header />
      <BackBtnHeader title={"내 일정 리스트"} onBackEvent={onBackEvent} />
    </>
  );
};

export default ScheduleScreen;

const Container = styled.Pressable``;
const Txt = styled.Text``;
