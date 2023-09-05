import { Text, View, Image, StyleSheet } from "react-native";

export default function BadgerBakedGood(props) {

    return <View style={styles.container}>
        <Image
            style={styles.diagram}
            source={{uri:props.img}}
        />
        <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold"}}>{props.name}</Text>
        <Text style={{textAlign:"center"}}>${props.price}</Text>
        <Text style={{textAlign:"center"}}>You can order up to {props.upperBound} units</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 10,
        
    },
    diagram: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },

});

