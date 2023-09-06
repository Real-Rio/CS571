import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BadgerCard from "../BadgerCard";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import { useSelector, useDispatch } from 'react-redux'
import { setArticlesRedux } from "../../redux/articlesSlice";
import { useNavigation } from "@react-navigation/native";


function NewsFeed(props) {
    const [articles, setArticles] = useState([]);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const tags = useSelector(state => state.tags.value);


    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw9/api/news/articles", {
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d"
            }
        }).then(handleRespnse)
            .then(data => {
                // console.log(data.length);
                setArticles(data);
                dispatch(setArticlesRedux(data));
                // 默认喜欢所有tag
                const tempTags = data.reduce((acc, cur) => {
                    cur.tags.forEach(tag => {
                        if (!acc.includes(tag))
                            acc.push(tag);
                    })
                    return acc;
                }, []);
                tempTags.forEach(tag => {
                    if (!tags.includes(tag))
                        dispatch(addTag(tag));
                });
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    function handleRespnse(response) {
        return response.json().then(json => {
            if (response.ok) {
                return json;
            } else {
                return Promise.reject(json);
            }
        })
    };

    const gotoDetail = (id) => {
        navigation.push("NewsDetail", { id: id });
    }

    return <ScrollView
        style={{ width: '100%', flexGrow: 8, marginTop: 49 }}
        contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        {articles.map(article => {
            if (article.tags.some(tag => !tags.includes(tag)))
                return;
            else
                return <BadgerCard key={article.id} id={article.id} onPress={gotoDetail}>
                    <BadgerNewsItemCard {...article}></BadgerNewsItemCard>
                </BadgerCard>
        })}

    </ScrollView>
}

export default NewsFeed;