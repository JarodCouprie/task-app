import {Alert, ImageBackground, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import React, {useState} from "react";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Task} from "@/type/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";
import {ThemedText} from "@/components/ThemedText";

export default function TabAddTaskScreen() {
    const insets = useSafeAreaInsets();
    const theme = useColorScheme();
    const [taskTitle, setTaskTitle] = useState<string>("");

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

    const handleSavingTaskTitle = () => {
        getData().then(tasks => {
            if (tasks && taskTitle) {
                const task: Task = {
                    id: `${Date.now()} + ${taskTitle}`,
                    title: taskTitle,
                    date: new Date(),
                }
                const tempTask = [...tasks];
                tempTask.push(task);
                storeTasks(tempTask).then();
                Keyboard.dismiss;
                setTaskTitle("");
                Alert.alert("Tâche créée avec succès");
            }
        })
    }

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
                    <ThemedText type="title">Nouvelle tâche</ThemedText>
                    <TextInput
                        style={{
                            ...styles.input,
                            backgroundColor: "#ffffff",
                            color: "#000"
                        }}
                        placeholder="Nouvelle tâche…"
                        onSubmitEditing={handleSavingTaskTitle}
                        placeholderTextColor="#000"
                        value={taskTitle}
                        onChangeText={text => setTaskTitle(text)}
                    />
                    <Button title="Enregistrer" press={handleSavingTaskTitle}
                            backgroundColor="#16a200"
                            color="#F5F5F5"
                            icon="save-outline" width="100%"/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {width: "100%", height: "100%", position: "absolute", top: 0, left: 0, opacity: 0.8},
    view: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 4,
        paddingTop: 12
    },
    input: {
        width: "100%",
        height: 60,
        padding: 10,
        borderRadius: 4,
    },
});
