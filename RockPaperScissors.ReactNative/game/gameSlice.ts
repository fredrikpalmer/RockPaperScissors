import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface PlayerReady {
  type: string;
  playerId: number;
  ready: boolean;
}

interface HandPlayed {
  type: string;
  playerId: number;
  hand: number;
}

enum Hand {
  stone = 0,
  paper = 1,
  scissors = 2,
}

interface Player {
  id: number;
  name: string;
  ready: boolean;
  hand?: Hand;
  handPlayed: boolean;
}

// Define a type for the slice state
interface GameState {
  id: string | null;
  players: Player[];
  started: boolean;
  result?: string;
}

// Define the initial state using that type
const initialState: GameState = {
  id: null,
  players: [],
  started: false,
};

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    gameJoined: (
      state,
      action: PayloadAction<{id: string; players: Player[]}>,
    ) => {
      state.id = action.payload.id;
      state.players = [...action.payload.players];
    },
    playerReady: (state, action: PayloadAction<PlayerReady>) => {
      state.players = [
        ...state.players.map(p => {
          if (p.id === action.payload.playerId) {
            return {...p, ready: true};
          }

          return p;
        }),
      ];
    },
    gameStarted: state => {
      state.started = true;
    },
    handPlayed: (state, action: PayloadAction<HandPlayed>) => {
      state.players = [
        ...state.players.map(p => {
          if (p.id === action.payload.playerId) {
            return {...p, hand: action.payload.hand, handPlayed: true};
          }

          return p;
        }),
      ];

      if (state.players.every(p => p.handPlayed) === false) {
        return;
      }

      const p1 = state.players[0];
      const p2 = state.players[1];

      if ((Number(p1.hand) + 1) % 3 === p2.hand) {
        state.result = p2.name + ' vinner!';
      } else if (p1.hand === p2.hand) {
        state.result = 'Oavgjort!';
      } else {
        state.result = p1.name + ' vinner!';
      }
    },
    reset: () => initialState,
  },
});

export const {gameJoined, playerReady, gameStarted, handPlayed, reset} =
  gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
