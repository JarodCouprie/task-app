import {Alert, FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import TaskCard from "@/components/TaskCard";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useCallback, useEffect, useState} from "react";
import {useColorScheme} from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Task} from "@/type/Task";
import {useFocusEffect} from "@react-navigation/core";

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [tasks, setTasks] = useState<Task[]>([]);
    const theme = useColorScheme();

    const newTasks: Task[] = [
        {id: "0", title: "Tâche 1", date: new Date()},
        {id: "1", title: "Tâche 2", date: new Date()},
        {id: "2", title: "Tâche 3", date: new Date()},
        {id: "3", title: "Tâche 4", date: new Date()},
        {id: "4", title: "Tâche 5", date: new Date()},
        {id: "5", title: "Tâche 6", date: new Date()},
        {id: "6", title: "Tâche 7", date: new Date()},
        {id: "7", title: "Tâche 8", date: new Date()},
        {id: "8", title: "Tâche 9", date: new Date()},
        {id: "9", title: "Tâche 10", date: new Date()},
        {id: "10", title: "Tâche 11", date: new Date()},
        {id: "11", title: "Tâche 12", date: new Date()},
        {id: "12", title: "Tâche 13", date: new Date()},
        {id: "13", title: "Tâche 14", date: new Date()},
    ]

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        getData().then((storageTasks) => {
            if (storageTasks && storageTasks.length > 0) {
                setTasks(storageTasks);
            } else {
                storeTasks(newTasks).then(() => setTasks(newTasks));
            }
        })
    }

    useFocusEffect(
        useCallback(() => {
            return getTasks();
        }, [])
    )

    const deleteTask = async (id: string) => {
        const tempsTasks = [...tasks];
        const filteredTasks = tempsTasks.filter(task => task.id !== id)
        storeTasks(filteredTasks).then(() => setTasks(
            filteredTasks
        ));
    }

    const updateTask = async (id: string, title: string) => {
        const tempTasks = [...tasks];
        tempTasks.map((task) => {
            if (task.id === id) {
                task.title = title;
            }
        });
        storeTasks(tempTasks).then(() => setTasks(
            tempTasks
        ));
    }

    const storeTasks = async (value: Task[] | null) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("tasks", jsonValue);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tasks');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <View>
            <ImageBackground
                source={theme === "light" ? require("@/assets/images/seconday-bg-light.jpg") : require("@/assets/images/seconday-bg-dark.jpg")}
                style={styles.image}/>
            <View style={{
                marginBottom: insets.bottom,
                marginTop: insets.top,
                marginLeft: insets.left,
                marginRight: insets.right,
            }}>
                <View style={styles.view}>
                    <ThemedText type="title">Vos tâches !</ThemedText>
                    <FlatList data={tasks} renderItem={({item}) =>
                        <TaskCard date={item.date} title={item.title} deleteTask={deleteTask} updateTask={updateTask}
                                  id={item.id}/>
                    } horizontal={false} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list}
                              showsVerticalScrollIndicator={false}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 4,
        paddingTop: 12
    },
    list: {
        display: "flex",
        gap: 4
    },
    image: {width: "100%", height: "100%", position: "absolute", top: 0, left: 0, opacity: 0.8},
});
