import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="notifications"
            options={{
              title: "Notifications",
              headerTitleAlign: "center",
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
