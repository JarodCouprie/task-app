import {DimensionValue, Pressable, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {useColorScheme} from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";

type ButtonProps = {
    press: () => void,
    title?: string,
    type?: "default" | "text-only" | 'icon-only',
    backgroundColor?: string,
    color?: string,
    width?: DimensionValue,
    icon?: keyof typeof Ionicons.glyphMap,
}

export default function Button({
                                   type = "default",
                                   title,
                                   width,
                                   press,
                                   color,
                                   backgroundColor,
                                   icon,
                               }: ButtonProps) {

    const colorScheme = useColorScheme();

    if (!color) {
        color = colorScheme === "light" ? Colors.light.text : Colors.dark.text;
    }

    return <Pressable style={{...styles.button, backgroundColor, width}}
                      onPress={press}>
        {type !== "text-only" && (<Ionicons name={icon} style={{color}}/>)}
        {type !== "icon-only" && (<ThemedText style={{color, fontSize: 16, fontWeight: "bold"}}>{title}</ThemedText>)}
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
        gap: 4,
    }
})