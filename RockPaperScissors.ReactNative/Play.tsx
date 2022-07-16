import React, {useState} from 'react';
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

const Play = () => {
  const [name, onChangeName] = useState<string>();
  const isDarkMode = useColorScheme() === 'dark';
  const handler = useGameJoin();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePlay = () => {
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
            placeholder="Fyll i namn"
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

          <Button title="Spela" disabled={!name} onPress={handlePlay} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Play;
