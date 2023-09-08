
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState, useContext, createContext } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';

import { NativeBaseProvider } from 'native-base';
import { set } from 'react-native-reanimated';
import { userContext } from './contexts/userContext';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {
  // for now, we'll just assume we're logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [user, setUser] = useState("");




  useEffect(() => {
    fetch("https://cs571.org/s23/hw10/api/chatroom", {
      headers: {
        "X-CS571-ID": "bid_2b48c7a36a98db55355d",
      }
    }).then(handleResponse).then(data => {
      setChatrooms(data);
    }).catch(err => {
      alert(err);
    })
  }, []);

  function handleLogin(username, password) {
    // hmm... maybe this is helpful!
    if (username == "" || password == "") {
      alert("please fill in all fields");
      return;
    }
    // const token = SecureStore.getItemAsync(username);
    fetch("https://cs571.org/s23/hw10/api/login", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_2b48c7a36a98db55355d",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(handleResponse).then(data => {
      alert(data.msg)
      console.log("key is " + data.user.username + " token is " + data.token);
      saveToken(data.user.username, data.token);
      setUser(data.user.username);
      setIsLoggedIn(true); // I should really do a fetch to register first!
    }).catch(err => {
      alert(err);
    })
  }


  function handleSignup(username, password) {
    // hmm... maybe this is helpful!
    if (username == "" || password == "") {
      alert("please fill in all fields");
      return;
    }
    fetch("https://cs571.org/s23/hw10/api/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_2b48c7a36a98db55355d",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(handleResponse).then(data => {
      alert(data.msg)
      saveToken(data.user.username, data.token);
      setUser(data.user.username);
      setIsLoggedIn(true); // I should really do a fetch to register first!
    }).catch(err => {
      alert(err);
    })
  }

  async function handleLogout() {
    try {
      await SecureStore.deleteItemAsync(user);
    } catch (err) {
      console.error(err);
    }
    setIsLoggedIn(false);
  }

  function handleResponse(res) {
    return res.json().then(json => {
      if (res.ok) {
        return json;
      } else {
        return Promise.reject(json.msg);
      }
    })
  }

  async function saveToken(key, value) {
    try {

      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error(err);
    }
  }





  if (isLoggedIn) {
    return (
      <userContext.Provider value={user}>
        <NativeBaseProvider>
          <NavigationContainer>
            <ChatDrawer.Navigator>
              <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
              {
                chatrooms.map(chatroom => {
                  return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                    {(props) => <BadgerChatroomScreen name={chatroom} />}
                  </ChatDrawer.Screen>
                })
              }
              <ChatDrawer.Screen name="Logout" options={{
                drawerLabelStyle: {
                  color: '#F9135C', // 设置特定标签的文本颜色
                  // 其他文本样式属性，例如 fontSize、fontWeight、fontFamily 等
                },
              }} >
                {(props) => <BadgerLogoutScreen handleLogout={handleLogout} />}
              </ChatDrawer.Screen>
            </ChatDrawer.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </userContext.Provider>
    );
  } else if (isRegistering) {
    return <NativeBaseProvider><BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} /></NativeBaseProvider>
  } else {
    return <NativeBaseProvider><BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} /></NativeBaseProvider>
  }
}


