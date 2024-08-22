import {useColorScheme} from "@/hooks/useColorScheme";
import {Keyboard, Pressable, StyleSheet, TextInput, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import Button from "@/components/Button";
import React, {useState} from "react";

export type TaskCardProps = {
    id: string,
    title: string,
    date: Date,
    deleteTask: (id: string) => void,
    updateTask: (id: string, title: string) => void
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

    const handleShowMenu = () => {
        if (!updating) {
            setShowMenu(!showMenu);
        }
    }

    const handleCancel = () => {
        setUpdating(!updating);
    }

    return <Pressable onPress={handleShowMenu}
                      style={{...styles.card, backgroundColor: theme === "light" ? "#f8fafc" : "#374151"}}>
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
            <View style={styles.cardContainer}>
                <View>
                    <ThemedText type="subtitle">{title}</ThemedText>
                    <ThemedText type="default">Créée le {new Date(date)?.toLocaleDateString("fr-FR")}</ThemedText>
                </View>
                <Button type="icon-only" press={() => setShowMenu(!showMenu)}
                        icon={showMenu ? "caret-down-outline" : "ellipsis-vertical-outline"}/>
            </View>
        }
        {showMenu && <View style={styles.container}>
            {updating ?
                <>
                    <Button type="text-only" title="Annuler" press={handleCancel}/>
                    <Button title="Enregistrer" press={handleSavingInputText}
                            backgroundColor={theme === "light" ? "blue" : "#0051A2"}
                            color="#F5F5F5"
                            icon="save-outline"/>
                </> :
                <>
                    <Button title="Modifier" press={handleTaskUpdate}
                            color={theme === "light" ? "blue" : "#0080FF"}/>
                    <Button title="Suprimer" press={() => deleteTask(id)} color="red"/>
                </>
            }
        </View>}
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 4,
        justifyContent: "space-between",
    },
    card: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 8,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        gap: 4,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    cardContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 4,
        flex: 1
    },
    menu: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
    }
})