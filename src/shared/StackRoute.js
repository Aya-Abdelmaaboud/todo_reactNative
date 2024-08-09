import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import TodoDetails from "../screens/TodoDetails";

export default function StackRoute() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator>
      <Screen name="Home" component={Home} options={{ headerShown: true }} />
      <Screen name="todo-details" component={TodoDetails} />
    </Navigator>
  );
}
