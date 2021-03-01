import React from "react";
import { View, Text, Image, FlatList, useColorScheme } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { IReduxState, IUserObject } from "../types";

export default function Contacts() {
  const onlineUsers = useSelector((state: IReduxState) => state.onlineUsers);
  const navigation = useNavigation(); 

  return (
      <View style={styles.container}>
        <FlatList
          data={onlineUsers}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity 
              style={styles.listItemWrapper}
              onPress={() => navigation.navigate("ChatScreen", {username: item.username, userId: item.userId})}
              >
              <View style={styles.listItemWrapper}>
                <Image style={styles.image} source={{ uri: item.avatar }} />
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>{item.username}</Text>
                </View>
              </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item: IUserObject) => item.userId}
        ></FlatList>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  listItemWrapper: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    // color: Colors[colorScheme].tint
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
