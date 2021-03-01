import React from "react";
import { StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../types";
import { View } from "./Themed";

export default function Chat({
  username,
  userId,
}: {
  username: string;
  userId: number;
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IReduxState) => state.currentUser);
  const chatMessages = useSelector((state: IReduxState) => state.chatMessages);
  const messages = chatMessages[userId].messages;

  return (
    <View style={styles.container}>
      <GiftedChat
        placeholder={`Type a message to ${username}...`}
        renderUsernameOnMessage={true}
        messages={messages}
        onSend={(messages) => {
          dispatch({
            type: "pm",
            data: { message: messages[0], chatId: userId },
          })
          dispatch({
            type: "server/pm",
            data: { message: messages[0], chatId: userId },
          })
        }}
        user={{
          _id: currentUser.userId,
        }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInput: {
    color: "#fff",
    width: "100%",
    height: "100pt",
    backgroundColor: "#fff",
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
