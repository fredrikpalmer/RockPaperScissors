import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useGameJoin} from './handlers/useGameJoin';
import {useAppSelector} from './hooks';

const Join = ({navigation}: any) => {
  const [name, onChangeName] = useState<string>();
  const gameId = useAppSelector(state => state.game.id);
  const isDarkMode = useColorScheme() === 'dark';
  const handler = useGameJoin();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (gameId !== null) {
      navigation.navigate('Home');
    }
  }, [gameId]);

  const handleJoin = () => {
    handler.handle(name);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            padding: 10,
          }}>
          <TextInput
            placeholder="Namn"
            style={{
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'gray',
              marginBottom: 10,
              padding: 5,
            }}
            onChangeText={onChangeName}
            value={name}
          />

          <Button title="Skapa" disabled={!name} onPress={handleJoin} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Join;
