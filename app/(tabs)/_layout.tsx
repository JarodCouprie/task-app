import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].text,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Tâches',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: 'Ajouter',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color}/>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}
