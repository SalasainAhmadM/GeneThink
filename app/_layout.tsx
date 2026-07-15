import { APP_EXPIRATION_DATE } from "@/constants/settings";
import { Stack } from "expo-router";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

SplashScreen.preventAutoHideAsync();

const isExpired = () => Date.now() > new Date(APP_EXPIRATION_DATE).getTime();

// ── Lockout screen shown once the app has expired ──────────────
const ExpiredScreen = () => (
  <SafeAreaView className="flex-1 bg-bg-light">
    <View className="flex-1 items-center justify-center p-6 gap-3">
      <Text className="text-[48px]">⏳</Text>
      <Text className="font-fredoka-bold text-ink-300 text-xl text-center">This app has expired</Text>
      <Text className="font-nunito text-ink-100 text-sm text-center">Please contact your teacher for an updated version.</Text>
    </View>
  </SafeAreaView>
);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Display font
    "Fredoka-Regular": require("../assets/fonts/Fredoka-Regular.ttf"),
    "Fredoka-Bold": require("../assets/fonts/Fredoka-Bold.ttf"),

    // Body font
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  useEffect(() => { if (fontsLoaded) SplashScreen.hideAsync(); }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  if (isExpired()) return <ExpiredScreen />;

  return <>
    {/* <StatusBar style="light" /> */}
    <Stack screenOptions={{ headerShown: false }} />
  </>
    ;
}
