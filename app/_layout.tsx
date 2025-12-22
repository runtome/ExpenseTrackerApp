import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { GlobalStyles } from '@/constants/styles';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(screens)/ManageExpense" 
          options={({ route })=>({ 
            headerShown: true,
            headerStyle:{ backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor:"white",
            presentation: "modal"
          })} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
