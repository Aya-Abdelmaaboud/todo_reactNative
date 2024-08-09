import "@expo/metro-runtime";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackRoute from "./src/shared/StackRoute";
import CompletedTask from "./src/screens/CompletedTask";


export default function App() {

  const {Navigator,Screen} =createBottomTabNavigator()
  return (
 
    <>
      <NavigationContainer>
        <Navigator screenOptions={{ tabBarStyle: {
            position: "absolute",
            width: "90%",
            bottom: 20,
            borderWidth: 1,
            borderColor: "grey",
            borderTopColor: "grey",
            borderRadius: 20,
            left: "5%",
          },}}>
          <Screen name="Main" component={StackRoute} options={{headerShown:false}}/>
          <Screen name="Completed-Task" component={CompletedTask}/>
        </Navigator>
      </NavigationContainer>
    </>
  );
}

