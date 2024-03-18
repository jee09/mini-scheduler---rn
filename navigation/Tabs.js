import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import styled from "styled-components/native";
import ScheduleScreen from "../screens/ScheduleScreen";
import MypageScreen from "../screens/MypageScreen";
import IconUser from "../assets/icons/gnb_user.svg";
import IconSchedule from "../assets/icons/gnb_schedule.svg";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowOpacity: 0,
          elevation: 0,
          height: 60,
          borderTopWidth: 0, // 여기에 추가
        },
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <IconSchedule width={size} height={size} fill={"none"} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <IconUser width={size} height={size} fill={"none"} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MypageScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <IconSchedule width={size} height={size} fill={"none"} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
