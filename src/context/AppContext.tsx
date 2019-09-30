import React, { createContext, useCallback, useState } from 'react';

type State<T> = {
  state: T;
  setContext: (state: T) => void;
};

export type Song = {
  name: string;
  path: string;
  time: number;
  file: File;
};

export type AppState = {
  isLoading: boolean;
  isFileUploaded: boolean;
  songs: FileList;
  current: Song | null;
};

export const AppContext = createContext<State<AppState>>({
  setContext: () => {},
  state: {
    isLoading: false,
    isFileUploaded: false,
    songs: [],
    current: null
  }
});

const Provider: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    isFileUploaded: false,
    songs: [],
    current: null
  });

  const setContext = useCallback(
    nextState => {
      setState({
        ...state,
        ...nextState
      });
    },
    [state, setState]
  );

  return (
    <AppContext.Provider
      value={{
        state,
        setContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
