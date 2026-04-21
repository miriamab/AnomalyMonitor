import { Stack } from 'expo-router';
import { AnomalyProvider } from '../context/AnomalyContext';
import FloatingStars from '../components/FloatingStars';

// Main layout component wrapping everything
export default function Layout() {
    return (
        // AnomalyProvider makes state available app-wide
        <AnomalyProvider>
            {/* The Stack navigator controls screen transitions */}
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            {/* Floating stars overlay for the whole app */}
            <FloatingStars />
        </AnomalyProvider>
    );
}
