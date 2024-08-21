import {FlatList, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import TaskCard from "@/components/TaskCard";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useEffect, useState} from "react";

export type Task = {
    id: number,
    title: string,
    date: Date,
}

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [tasks, setTasks] = useState<Task[]>([])

    const newTasks: Task[] = [
        {id: 0, title: "Tâche 1", date: new Date()},
        {id: 1, title: "Tâche 2", date: new Date()},
        {id: 2, title: "Tâche 3", date: new Date()},
        {id: 3, title: "Tâche 4", date: new Date()},
        {id: 4, title: "Tâche 5", date: new Date()},
    ]

    useEffect(() => {
        setTasks(newTasks);
    }, []);

    const deleteTask = (id: number) => {
        setTasks(
            tasks.filter(task => task.id !== id)
        )
    }

    const updateTask = (id: number, title: string) => {
        const tempTasks = [...tasks];
        tempTasks.map((task) => {
            if (task.id === id) {
                task.title = title;
            }
        });
        setTasks(
            tempTasks
        )
    }


    return (
        <View style={{
            ...styles.view,
            marginBottom: insets.bottom,
            marginTop: insets.top,
            marginLeft: insets.left,
            marginRight: insets.right,
        }}>
            <ThemedText type="title">Bienvenue !</ThemedText>
            <ThemedView>
                <FlatList data={tasks} renderItem={({item}) =>
                    <TaskCard date={item.date} title={item.title} deleteTask={deleteTask} updateTask={updateTask}
                              id={item.id}/>
                } horizontal={false} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list}/>
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        gap: 8,
        padding: 8,
    },
    list: {
        display: "flex",
        gap: 8
    }
});
