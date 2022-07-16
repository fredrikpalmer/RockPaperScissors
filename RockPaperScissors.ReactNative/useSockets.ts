import React, {useContext, useEffect} from 'react';
import {
  gameJoined,
  gameStarted,
  handPlayed,
  playerReady,
} from './game/gameSlice';
import {setUser} from './game/userSlice';
import {useAppDispatch} from './hooks';
import {SocketContext} from './Socket';

const useSockets = () => {
  const [ws, setWs] = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const handlePlayerInfo = (data: {playerId: number; name: string}) => {
    dispatch(setUser({id: data.playerId, name: data.name}));
  };

  const handleJoined = (data: {id: string; players: []}) => {
    dispatch(gameJoined({id: data.id, players: data.players}));
  };

  const handlePlayerReady = (data: any) => {
    dispatch(playerReady(data));
  };

  const handleStart = () => {
    dispatch(gameStarted());
  };

  const handleHandPlayed = (data: any) => {
    dispatch(handPlayed(data));
  };

  useEffect(() => {
    if (ws === null) {
      //TODO: Use .env variable
      setWs(new WebSocket('ws://10.0.2.2:8080'));
    }
  }, [ws]);

  React.useEffect(() => {
    if (ws !== null) {
      ws.onopen = () => {
        console.log('Connected');
      };
      ws.onclose = () => {
        console.log('Disconnected. Check internet or server.');
      };
      ws.onerror = (e: {message: any}) => {
        console.error(e.message);
      };
      ws.onmessage = (e: {data: string}) => {
        const data = JSON.parse(e.data);
        console.log(data);
        if (data.type === 'PlayerInfo') {
          handlePlayerInfo(data);
        } else if (data.type === 'GameJoined') {
          handleJoined(data);
        } else if (data.type === 'PlayerReady') {
          handlePlayerReady(data);
        } else if (data.type === 'GameStart') {
          handleStart();
        } else if (data.type === 'HandPlayed') {
          handleHandPlayed(data);
        }
      };
    }
  }, [ws]);

  return ws;
};

export default useSockets;
