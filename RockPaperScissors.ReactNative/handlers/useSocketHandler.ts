import useSockets from '../useSockets';

const useSocketHandler = () => {
  const ws = useSockets();

  const handle = (message: unknown) => {
    try {
      console.log(message);
      ws.send(JSON.stringify(message));
    } catch (error) {
      console.error(error);
    }
  };

  return handle;
};

export default useSocketHandler;
