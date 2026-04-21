import { Stack } from 'expo-router';
import { AnomalyProvider } from '../context/AnomalyContext';
import FloatingStars from '../components/FloatingStars';

export default function Layout() {
    return (
        <AnomalyProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <FloatingStars />
        </AnomalyProvider>
    );
}
