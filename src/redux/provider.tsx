"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { setupStore, AppStore } from "./store";

interface ReduxProviderProps {
  readonly children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  storeRef.current ??= setupStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
