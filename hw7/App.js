import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState, useRef } from 'react';

export default function App() {

  const [total, setTotal] = useState(0);
  const [num, setNum] = useState(0);
  const inputRef = useRef(null);


  const AddNum = () => {
    setTotal(total + num);
    inputRef.current.clear();
    inputRef.current.blur();
    setNum(0);
  }

  const Reset = () => {
    setTotal(0);
    setNum(0);
    inputRef.current.clear();
    inputRef.current.blur();
  }


  return (
    <View style={styles.container}>
      <Text>Your total is {total}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setNum(parseInt(e))}
        value={num}
        ref={inputRef}
        placeholder="请输入数字"
        keyboardType="numeric"
      />
      <View style={styles.fixToText}>
        <Button
          title="Add"
          onPress={AddNum}
        />
        <Button
          title="Reset"
          onPress={Reset}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
