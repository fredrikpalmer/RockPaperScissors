import useSocketHandler from './useSocketHandler';

const useGameJoin = () => {
  const handle = useSocketHandler();

  const decorateHandle = (name: string | undefined) =>
    handle({
      type: 'GameJoin',
      name,
    });

  return {
    handle: decorateHandle,
  };
};

export {useGameJoin};
