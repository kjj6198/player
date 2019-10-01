import React, { createContext, useCallback, useState } from 'react';

type State<T> = {
  state: T;
  setContext: (partialState: any) => void;
};

export type AppState = {
  isLoading: boolean;
  isFileUploaded: boolean;
  songs: FileList | null;
  current: File | null;
};

export const AppContext = createContext<State<AppState>>({
  setContext: () => {},
  state: {
    isLoading: false,
    isFileUploaded: false,
    songs: null,
    current: null
  }
});

const Provider: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    isFileUploaded: false,
    songs: null,
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
