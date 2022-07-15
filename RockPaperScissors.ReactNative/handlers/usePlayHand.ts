import useSocketHandler from './useSocketHandler';

const usePlayHand = () => {
  const handle = useSocketHandler();

  const decorateHandle = (
    id: string | null,
    playerId: number | undefined,
    hand: number | undefined,
  ) =>
    handle({
      type: 'PlayHand',
      id,
      playerId,
      hand,
    });

  return {
    handle: decorateHandle,
  };
};

export {usePlayHand};
