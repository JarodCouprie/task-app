import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import TaskCard from "@/components/TaskCard";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {useColorScheme} from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
    id: number,
    title: string,
    date: Date,
}

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [tasks, setTasks] = useState<Task[]>([]);
    const theme = useColorScheme();

    const newTasks: Task[] = [
        {id: 0, title: "Tâche 1", date: new Date()},
        {id: 1, title: "Tâche 2", date: new Date()},
        {id: 2, title: "Tâche 3", date: new Date()},
        {id: 3, title: "Tâche 4", date: new Date()},
        {id: 4, title: "Tâche 5", date: new Date()},
        {id: 5, title: "Tâche 6", date: new Date()},
        {id: 6, title: "Tâche 7", date: new Date()},
        {id: 7, title: "Tâche 8", date: new Date()},
        {id: 8, title: "Tâche 9", date: new Date()},
        {id: 9, title: "Tâche 10", date: new Date()},
        {id: 10, title: "Tâche 11", date: new Date()},
        {id: 11, title: "Tâche 12", date: new Date()},
        {id: 12, title: "Tâche 13", date: new Date()},
        {id: 13, title: "Tâche 14", date: new Date()},
    ]

    useEffect(() => {
        setTasks(newTasks);
    }, []);

    const deleteTask = async (id: number) => {
        setTasks(
            tasks.filter(task => task.id !== id)
        )
        await storeTasks(tasks);
    }

    const updateTask = async (id: number, title: string) => {
        const tempTasks = [...tasks];
        tempTasks.map((task) => {
            if (task.id === id) {
                task.title = title;
            }
        });
        setTasks(
            tempTasks
        )
        await storeTasks(tempTasks);
    }

    const storeTasks = async (value: Task[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("my-tasks", jsonValue);
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-key');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    return (
        <View style={{
            marginBottom: insets.bottom,
            marginTop: insets.top,
            marginLeft: insets.left,
            marginRight: insets.right,
            height: "100%"
        }}>
            <ImageBackground
                source={theme === "light" ? require("@/assets/images/seconday-bg-light.jpg") : require("@/assets/images/seconday-bg-dark.jpg")}
                style={styles.image}/>
            <View style={styles.view}>
                <ThemedText type="title">Vos tâches !</ThemedText>
                <FlatList data={tasks} renderItem={({item}) =>
                    <TaskCard date={item.date} title={item.title} deleteTask={deleteTask} updateTask={updateTask}
                              id={item.id}/>
                } horizontal={false} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list}
                          showsVerticalScrollIndicator={false}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        gap: 8,
        padding: 12
    },
    list: {
        display: "flex",
        gap: 4
    },
    image: {width: "100%", height: "100%", position: "absolute", top: 0, left: 0, opacity: 0.3}
});
