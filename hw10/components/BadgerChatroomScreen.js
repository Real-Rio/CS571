import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { set } from "react-native-reanimated";
import BadgerChatMessage from "./BadgerChatMessage";
import { handleResponse } from "../helper/handleresponse";
import { Button } from "native-base";
import Modal from "react-native-modal";
import CreatePostModal from "./CreatePost";
import * as SecureStore from 'expo-secure-store';
import { userContext } from "../contexts/userContext";


function BadgerChatroomScreen(props) {

    const [messages, setMessages] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const user = useContext(userContext);

    useEffect(() => {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
            }
        }).then(handleResponse).then(data => {
            setMessages(data.messages);
        }).catch(err => {
            alert(err);
        })
    }, [isShown])

    const closeModal = () => {
        setIsShown(false);
    }

    async function getToken(key) {
        try {
          let userToken = await SecureStore.getItemAsync(key);
          if (userToken) {
            // console.log('检索到的数据：', userToken);
            return userToken;
          } else {
            console.log('没有找到数据');
            return null;
          }
    
        } catch (err) {
          console.error(err);
        }
      }

    const addPost = async (title, content) => {
        if (title.length === 0 || content.length === 0) {
            alert("fill in all fields");
            return;
        }
        const token = await getToken(user);
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
                "Content-Type": "application/json",
                "authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then(handleResponse).then(data => {
            alert(data.msg);
            closeModal();
        }).catch(err => {
            alert(err);
        })
    }



    return <View style={{ flex: 1 }}>
        {messages.length === 0 ? <Text style={{ margin: 100 }}>This is a chatroom screen!</Text> :
            <>{
                messages.map((message) => {
                    return <BadgerChatMessage key={message.id} {...message} />
                })
            }<Button style={{ position: "absolute", bottom: 50, right: 30, left: 30, height: 60 }} size="sm" colorScheme="secondary" onPress={() => setIsShown(true)}>
                    Add a post
                </Button>
                <CreatePostModal isOpen={isShown} closeModal={closeModal} addPost={addPost} />
            </>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerChatroomScreen;