import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Input, Stack, FormControl } from 'native-base';
import { useRef, useState } from "react";
import React from 'react';

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <FormControl>
            <Stack space={5}>
                <Stack>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input variant="outline" p={2} placeholder="Username" value={username} onChangeText={(text) => setUsername(text)} />
                </Stack>
                <Stack>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input variant="outline" p={2} type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                </Stack>
            </Stack>
        </FormControl>
        <Button color="crimson" title="Signup" onPress={() => props.handleSignup(username, password)} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerRegisterScreen;