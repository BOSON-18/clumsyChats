import { createTransform } from 'redux-persist';

const transformExcludeSocket = createTransform(
  (inboundState, key) => {
    if (key === 'socket') {
      const { socket, ...rest } = inboundState;
      return rest; // Exclude socket to avoid circular reference issues
    }
    return inboundState;
  },
  (outboundState, key) => {
    return outboundState;
  },
  { whitelist: ['socket'] }
);

export default transformExcludeSocket;
