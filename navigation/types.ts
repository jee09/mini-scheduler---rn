import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  ScheduleDetail: undefined;
};
export type RootParamList = {
  Tabs: {
    screen: keyof RootTabsParamList;
    params?: any;
  };
  Stack: {
    screen: keyof RootStackParamList;
    params?: any;
  };
};
export type RootTabsParamList = {
  Schedule: undefined;
  Home: undefined;
  MyPage: undefined;
};
// * 시작화면 ----------------------------------------------------------------
// # 시작화면 Stack 리스트
export type StartParamList = {
  Start: undefined;
};
// * Navigation 타입지정 --------------------------------------------------------
// # 스택 네비게이션 타입
export type StackNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;
