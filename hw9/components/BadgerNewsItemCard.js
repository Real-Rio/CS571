import { View, Image, StyleSheet, Text } from "react-native";
import uuid from 'react-native-uuid';

export default function BadgerNewsItemCard(props) {
    return <View>
        <Image source={{ uri: props.img }} style={styles.pic} />
        <Text style={styles.title}>{props.title}</Text>
        <View style={{flexDirection:"row"}}>
            {props.tags.map(tag => {
                return <Text key={uuid.v4()} style={{margin:5}}>{tag}</Text>
            })}
        </View>
    </View>
}

const styles = StyleSheet.create({
    pic: {
        width: 244,
        height: 244,
        alignSelf: "center",
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "justify",
    }
});