import {useColorScheme} from "@/hooks/useColorScheme";
import {Animated, Dimensions, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import Button from "@/components/Button";
import React, {useEffect, useRef, useState} from "react";
import GestureHandler from "react-native-gesture-handler/src/web_hammer/GestureHandler";
import {Directions, Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import {clamp, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

export type TaskCardProps = {
    id: number,
    title: string,
    date: Date,
    deleteTask: (id: number) => void,
    updateTask: (id: number, title: string) => void
}

export default function TaskCard({id, title, date, deleteTask, updateTask}: TaskCardProps) {
    const theme = useColorScheme();
    const [updating, setUpdating] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(title);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleSavingInputText = () => {
        Keyboard.dismiss
        updateTask(id, inputValue);
        setUpdating(!updating);
        setShowMenu(false);
    }

    const handleTaskUpdate = () => {
        setUpdating(!updating);
    }

    return <View
        style={{...styles.card, backgroundColor: theme === "light" ? "#e2e8f0" : "#0f172a"}}>
        {updating ?
            <TextInput
                style={{
                    ...styles.input,
                    borderColor: theme === "light" ? "#383838" : "#d9d9d9",
                    color: theme === "light" ? "#383838" : "#d9d9d9"
                }}
                placeholder="Cliquez ici…"
                onSubmitEditing={handleSavingInputText}
                placeholderTextColor={theme === "light" ? "#383838" : "#d9d9d9"}
                value={inputValue}
                onChangeText={text => setInputValue(text)}
                autoFocus={updating}
            /> :
            <View>
                <ThemedText type="subtitle">{title}</ThemedText>
                <ThemedText type="default">{date.toLocaleDateString("fr-FR")}</ThemedText>
            </View>
        }
        {showMenu ? updating ?
            <View style={styles.container}>
                <Button type="text-only" title="Annuler" press={() => setUpdating(!updating)}
                        backgroundColor="#626262"
                        color="#F5F5F5"/>
                <Button title="Enregistrer" press={handleSavingInputText} backgroundColor="#3730a3"
                        color="#F5F5F5"
                        icon="save-outline"/>
            </View> :
            <View style={styles.container}>
                <Button title="Suprimer" press={() => deleteTask(id)} backgroundColor="#991b1b"
                        color="#F5F5F5" icon="trash-outline"/>
                <Button title="Modifier" press={handleTaskUpdate} backgroundColor="#3730a3"
                        color="#F5F5F5" icon="pencil"/>
            </View> : <View></View>

        }
        <Button type="icon-only" press={() => setShowMenu(!showMenu)}
                color={theme === "light" ? "#000000" : "#F5F5F5"} icon="ellipsis-vertical-outline"/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 4,
    },
    card: {
        width: "100%",
        height: 60,
        display: "flex",
        flexDirection: "row",
        padding: 8,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        gap: 4,
        borderWidth: 1,
        borderColor: "#94a3b8"
    },
    input: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 4,
        flex: 1
    },
})