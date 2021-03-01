import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export default function Join() {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback style={{zIndex: 20}} onPress={() => Keyboard.dismiss()}>
          <TextInput
            onChangeText={(name) => {
              setUsername(name);
            }}
            value={username}
            style={styles.textInput}
            placeholder="Enter Username"
          />
        </TouchableWithoutFeedback>
        <Button
          color="#fff"
          onPress={() => {
            if (username.length > 0) {
              dispatch({ type: "server/join", data: username });
              navigation.navigate("Contacts");
            }
          }}
          title="Join"
        />
      </View>
       {<KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
  text: {
    color: Colors.dark.text,
  },
  button: {
    backgroundColor: "#fff",
    fontSize: 43,
    color: Colors.dark.lightContrast,
  },
  textInput: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    backgroundColor: Colors.dark.backgroundTint,
    zIndex: 19,
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-around",
  },
});
