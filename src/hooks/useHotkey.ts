import { useEffect } from "react";

export default function useHotKey(hotkeyMap: {[key: string]: () => void}, ...deps: any) {
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (hotkeyMap[e.keyCode.toString()]) {
        hotkeyMap[e.keyCode.toString()]();
      }
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [deps, hotkeyMap]);
}