import { createContext, Dispatch, SetStateAction } from 'react';

export type ContextValue = [number, Dispatch<SetStateAction<number>>];

const StateContext = createContext<ContextValue>([0, () => undefined]);

export { StateContext };
