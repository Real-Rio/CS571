import { useEffect, useState } from "react";
import { Text, Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import uuid from "react-native-uuid";

function DetailedNews(props) {
    const id = props.route.params.id;
    const [article, setArticle] = useState({});
    const textSize = useSharedValue(5); // 10->20>15

    useEffect(() => {
        fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${id}`, {
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d"
            }
        }).then(handleRespnse)
            .then(data => {
                // console.log(data);
                setArticle(data);
                setTimeout(() => {
                    textSize.value = withSpring(15, {
                        duration: 2251,
                        dampingRatio: 0.6,
                        stiffness: 100,
                        overshootClamping: false,
                        restDisplacementThreshold: 0.01,
                        restSpeedThreshold: 2,
                        // reduceMotion: ReduceMotion.System,
                    });
                }, 300);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    // useEffect(() => {
    // }, [article]);

    const animatedStyles = useAnimatedStyle(() => ({
        fontSize: textSize.value
    }));


    function handleRespnse(response) {
        return response.json().then(json => {
            if (response.ok) {
                return json;
            } else {
                return Promise.reject(json);
            }
        })
    };



    return <ScrollView>

        {JSON.stringify(article) !== "{}" ?
            <View>
                <Image source={{ uri: article.img }} style={{
                    width: 244,
                    height: 244,
                    alignSelf: "center",
                }} />
                <Text style={{ fontWeight: "bold" }}>{article.title}</Text>
                {article.body.map(item => <Animated.Text key={uuid.v4()} style={[{ lineHeight: 22, margin: 10 }, animatedStyles]}>{item}</Animated.Text>)}
                {/* <Text>{article.body}</Text> */}
            </View> : <Text>Loading....</Text>}
    </ScrollView>
}

export default DetailedNews;