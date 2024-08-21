import {DimensionValue, Pressable, StyleSheet, Text} from "react-native";
import {useColorScheme} from "@/hooks/useColorScheme";
import {primary} from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type ButtonProps = {
    title: string,
    press: () => void,
    type?: "default" | "text-only" | 'icon-only',
    backgroundColor?: string,
    color?: string,
    width?: DimensionValue,
    icon?: keyof typeof Ionicons.glyphMap,
}

export default function Button({type = "default", title, width, press, color, backgroundColor = primary, icon}: ButtonProps) {

    const colorScheme = useColorScheme();

    return <Pressable style={{...styles.button, width, backgroundColor}}
                      onPress={press}>
        {type !== "text-only" && (<Ionicons name={icon} style={{color}}/>)}
        {type !== "icon-only" && (<Text style={{color}}>{title}</Text>)}
    </Pressable>
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    }
})