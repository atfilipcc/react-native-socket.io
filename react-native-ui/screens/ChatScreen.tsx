import * as React from 'react';
import { StyleSheet } from 'react-native';

import Chat from '../components/Chat';
import { View } from '../components/Themed';

export default function ChatScreen({ route: { params } } : any) {;
  const { username, userId } = params;
  return (
    <View style={styles.container}>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Chat username={username} userId={userId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
