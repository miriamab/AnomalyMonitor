import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#0a0f24', // dark, futuristic blue
          shadowColor: 'transparent',
        },
        headerTintColor: '#00d1ff', // neon blue/cyan
        headerTitleStyle: {
          fontWeight: 'bold',
          letterSpacing: 2,
        },
        tabBarStyle: {
          backgroundColor: '#0a0f24',
          borderTopColor: '#00d1ff', // glowing top border
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#00d1ff', // active
        tabBarInactiveTintColor: '#435b83', // inactive (dimmed blue-grey)
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="myanomalies"
        options={{
          title: 'My Anomalies',
          tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}