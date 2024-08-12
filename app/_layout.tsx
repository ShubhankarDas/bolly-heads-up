import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
