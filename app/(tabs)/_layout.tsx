// app/(tabs)/_layout.tsx
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Entypo, Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#eaaa00",
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].text,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          height: 60,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={focused ? 24 : 20} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Category',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons size={focused ? 24 : 22} name="category" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#ff0000' : '#ff0000',
                borderRadius: 999,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: -10,
              }}
            >
              <Entypo
                name="location"
                size={focused ? 28 : 25}

                color={focused ? '#fff' : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          title: 'Card',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 size={focused ? 20 : 18} name="cart-shopping" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, focused }) => (
            <Feather size={focused ? 22 : 20} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
// #eaaa00