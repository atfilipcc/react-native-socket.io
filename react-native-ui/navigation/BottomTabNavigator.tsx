import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import ChatScreen from "../screens/ChatScreen";
import ContactsScreen from "../screens/ContactsScreen";
import JoinScreen from "../screens/JoinScreen";

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbubbles-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Contacts"
        component={ContactsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="people-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const ChatStack = createStackNavigator<TabOneParamList>();

function ChatStackNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="JoinScreen"
        component={JoinScreen}
        options={{ title: "Join Chat" }}
      />
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => ({ title: (route as any).params.username ?? 'Chat'})}
      />
    </ChatStack.Navigator>
  );
}

const ContactsStack = createStackNavigator<TabTwoParamList>();

function ContactsStackNavigator() {
  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{ headerTitle: "Contacts" }}
      />
    </ContactsStack.Navigator>
  );
}
