import { Pressable, StyleSheet, View } from "react-native";

export default function BadgerCard(props) {


    return <Pressable onPress={() => props.onPress(props.id)}>
        <View style={[styles.card, props.style]}>
            {props.children}
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        padding: 20,
        margin: 10,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    }
})