
import '../global.css';

import { Stack, Slot } from 'expo-router';


export default function RootLayout() {
  return (
  
   
      <Stack>
             <Slot />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
        <Stack.Screen name="impact" options={{ headerShown: false }} />
        <Stack.Screen name="recordActivity" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
   
     
  
  
  );
}


