import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import styled from "styled-components/native";
import ScheduleScreen from "../screens/ScheduleScreen";
import MypageScreen from "../screens/MypageScreen";
import IconUser from "../assets/icons/gnb_user.svg";
import IconSchedule from "../assets/icons/gnb_schedule.svg";
import SvgIcon from "../components/SvgIcon";

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
          borderTopWidth: 0,
          paddingHorizontal: 80,
        },
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <SvgIcon name="GnbSchedule" size={size} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <SvgIcon name="Logo" size={size + 30} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MypageScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <SvgIcon name="GnbUser" size={size} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
