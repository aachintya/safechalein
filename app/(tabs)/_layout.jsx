import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

function TabBarIcon() {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Track Me",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-outline" color={color} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="FakeCall"
        options={{
          title: "Fake Call",
          tabBarIcon: ({ color }) => (
            <Feather name="phone-call" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Record"
        options={{
          title: "Recordings",
          tabBarIcon: ({ color }) => <Ionicons name="recording-outline" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="helpline"
        options={{
          title: "Helpline",
          tabBarIcon: ({ color }) => <Ionicons name="book-sharp" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}