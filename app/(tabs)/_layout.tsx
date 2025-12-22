import { Tabs, router } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import IconButton from '@/components/ui/IconButton';
import { GlobalStyles } from '@/constants/styles';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor : GlobalStyles.colors.accent500,
      }}>
      <Tabs.Screen
        name="RecentExpenses"
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="creditcard" color={color} />,
          headerRight: ({ tintColor }) => <IconButton icon='add' size={24} color={tintColor} onPress={() => {router.push('/ManageExpense')}} />,
        }}
      />
      <Tabs.Screen
        name="AllExpenses"
        options={{
          title: 'All Expenses',
          tabBarLabel: 'Expenses',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
