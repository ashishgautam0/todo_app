import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import TodoListScreen from "./screens/TodoListScreen";

const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Tasks") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Completed") {
            iconName = focused ? "checkmark-circle" : "checkmark-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "gray",
      })}
     >
      <Tab.Screen name="Tasks" component={TodoListScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;
