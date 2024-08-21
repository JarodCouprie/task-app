import {useColorScheme} from "@/hooks/useColorScheme";
import {Keyboard, StyleSheet, TextInput, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import Button from "@/components/Button";
import {useState} from "react";

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
    return <View style={{...styles.card, backgroundColor: theme === "light" ? "#d9d9d9" : "#383838"}}>
        {updating ?
            <TextInput
                style={{
                    ...styles.input,
                    borderColor: theme === "light" ? "#383838" : "#d9d9d9",
                    color: theme === "light" ? "#383838" : "#d9d9d9"
                }}
                placeholder="Cliquez ici…"
                onSubmitEditing={Keyboard.dismiss}
            /> :
            <View>
                <ThemedText type="subtitle">{title}</ThemedText>
                <ThemedText type="default">{date.toLocaleDateString("fr-FR")}</ThemedText>
            </View>
        }
        <View style={styles.container}>
            <Button title="Suprimer" press={() => deleteTask(id)} backgroundColor="#991b1b"
                    color="#F5F5F5" icon="trash-outline"/>
            <Button title="Modifier" press={() => setUpdating(!updating)} backgroundColor="#3730a3"
                    color="#F5F5F5" icon="pencil"/>
        </View>
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
        gap: 4
    },
    input: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 4,
        flex: 1
    },
})