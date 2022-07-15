import React, {useEffect} from 'react';
import Game from './Game';
import {useAppSelector} from './hooks';
import Menu from './Menu';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const Home = ({navigation}: NativeStackScreenProps<{}>) => {
  const game = useAppSelector(state => state.game.id);

  useEffect(() => {
    if (game === null) {
      navigation.setOptions({title: 'Meny'});
    } else {
      navigation.setOptions({title: 'Sten Sax Påse'});
    }
  }, [game]);

  return game === null ? (
    <Menu navigation={navigation} />
  ) : (
    <Game navigation={navigation} />
  );
};

export default Home;
