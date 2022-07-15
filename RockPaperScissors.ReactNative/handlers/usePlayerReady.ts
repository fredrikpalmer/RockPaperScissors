import useSocketHandler from './useSocketHandler';

const usePlayerReady = () => {
  const handle = useSocketHandler();

  const decorateHandle = (id: string | null, playerId: number | undefined) =>
    handle({
      type: 'PlayerReady',
      id,
      playerId,
    });

  return {
    handle: decorateHandle,
  };
};

export {usePlayerReady};
