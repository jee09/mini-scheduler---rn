import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleDetailScreen from "../screens/ScheduleDetailScreen";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  // const theme = useTheme();

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen
        name="ScheduleDetail"
        component={ScheduleDetailScreen}
      />
    </NativeStack.Navigator>
  );
};

export default Stack;
