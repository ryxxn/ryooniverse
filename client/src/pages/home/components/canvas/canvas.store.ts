import { create } from 'zustand';

export interface Character {
  id: string;
  x: number;
  y: number;
  characterId: string;
}

interface CanvasState {
  myCharacter: Character;
  otherCharacters: Character[];

  setMyPosition: (x: number, y: number) => void;
  updateOthers: (characters: Character[]) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  myCharacter: {
    id: 'me',
    x: 100,
    y: 100,
    // ! Will be changed to the characterId from the server
    characterId: '2',
  },
  otherCharacters: [],

  setMyPosition: (x, y) =>
    set((state) => ({
      myCharacter: { ...state.myCharacter, x, y },
    })),

  updateOthers: (characters) => set({ otherCharacters: characters }),
}));
