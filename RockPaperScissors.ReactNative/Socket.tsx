import React, {createContext, useState} from 'react';

const SocketContext = createContext<any[]>([]);
const Socket = ({children}: React.ProviderProps<unknown>) => {
  const socket = useState<WebSocket | null>(null);
  return <SocketContext.Provider value={socket} children={children} />;
};

export default Socket;

export {SocketContext};
