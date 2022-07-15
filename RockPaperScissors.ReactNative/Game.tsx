import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppDispatch, useAppSelector} from './hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import {usePlayerReady} from './handlers/usePlayerReady';
import {usePlayHand} from './handlers/usePlayHand';
import {reset} from './game/gameSlice';

const Game = ({navigation}: any) => {
  const user = useAppSelector(state => state.user);
  const game = useAppSelector(state => state.game);
  const player = game.players.find(p => p.id === user.id);
  let timeoutRef = useRef<number>();
  const [msTimeout, setMsTimeout] = useState<number>();
  const [playerHand, setPlayerHand] = useState<number>();
  const isDarkMode = useColorScheme() === 'dark';
  const playerReadyHandler = usePlayerReady();
  const playHandHandler = usePlayHand();
  const dispatch = useAppDispatch();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePlayerReady = (hand: number) => {
    setPlayerHand(hand);

    playerReadyHandler.handle(game.id, player?.id);
  };

  useEffect(() => {
    if (game.started && msTimeout === undefined) {
      console.log('start');
      setMsTimeout(3000);
    }
  }, [game]);

  useEffect(() => {
    if (msTimeout) {
      timeoutRef.current = setTimeout(() => {
        setMsTimeout(msTimeout - 1000);
      }, 1000);
    }
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [msTimeout]);

  useEffect(() => {
    if (msTimeout === 0 && !player?.handPlayed) {
      playHandHandler.handle(game.id, player?.id, playerHand);
    }
  }, [msTimeout]);

  const getPlayerHandIcon = (hand: number | undefined) => {
    switch (hand) {
      case 0:
        return 'hand-rock-o';
      case 1:
        return 'hand-paper-o';
      case 2:
        return 'hand-scissors-o';
      default:
        throw new Error('Argument out of range');
    }
  };

  console.log(game);

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignSelf: 'stretch',
        }}>
        <View style={{justifyContent: 'space-evenly', marginHorizontal: 10}}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 17,
              color: 'black',
              fontWeight: 'bold',
            }}>
            {'Spelare'}
          </Text>
          {game.players.map((p, idx) => (
            <View
              key={idx}
              style={{
                backgroundColor: 'white',
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: Colors.black, fontSize: 16}}>{p.name}</Text>
              {p.handPlayed ? (
                <Icon name={getPlayerHandIcon(p.hand)} size={30} />
              ) : (
                p.ready && (
                  <Icon name={'check'} style={{color: 'green'}} size={20} />
                )
              )}
            </View>
          ))}

          {game.result && (
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 17,
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}>
                {game.result}
              </Text>
              <Button onPress={() => dispatch(reset())} title="Spela igen?" />
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={{fontSize: 20}}>
            {msTimeout !== undefined &&
              (msTimeout === 3000
                ? 'Sten'
                : msTimeout === 2000
                ? 'Sax'
                : msTimeout === 1000
                ? 'Påse'
                : undefined)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
            backgroundColor: 'white',
            paddingTop: 30,
            paddingBottom: 30,
          }}>
          <Icon.Button
            name="hand-rock-o"
            size={30}
            iconStyle={{marginLeft: 10}}
            disabled={player?.ready}
            backgroundColor={player?.ready ? 'gray' : undefined}
            onPress={() => handlePlayerReady(0)}
          />

          <Icon.Button
            name="hand-scissors-o"
            size={30}
            iconStyle={{marginLeft: 10}}
            disabled={player?.ready}
            backgroundColor={player?.ready ? 'gray' : undefined}
            onPress={() => handlePlayerReady(2)}
          />

          <Icon.Button
            name="hand-paper-o"
            size={30}
            iconStyle={{marginLeft: 10}}
            disabled={player?.ready}
            backgroundColor={player?.ready ? 'gray' : undefined}
            onPress={() => handlePlayerReady(1)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Game;
