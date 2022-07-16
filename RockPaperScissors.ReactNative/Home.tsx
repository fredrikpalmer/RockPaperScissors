import React, {useEffect} from 'react';
import Game from './Game';
import {useAppSelector} from './hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Play from './Play';

const Home = ({navigation}: NativeStackScreenProps<{}>) => {
  const game = useAppSelector(state => state.game.id);

  useEffect(() => {
    if (game === null) {
      navigation.setOptions({title: 'Start'});
    } else {
      navigation.setOptions({title: 'Sten Sax Påse'});
    }
  }, [game]);

  return game === null ? <Play /> : <Game navigation={navigation} />;
};

export default Home;
