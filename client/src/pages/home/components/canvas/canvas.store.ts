import { create } from 'zustand';
import { ICharacter } from '../../../../shared/types';

interface CanvasState {
  myCharacter: ICharacter;
  otherCharacters: ICharacter[];

  setMyPosition: (x: number, y: number) => void;
  setMyCharacter: (user: Partial<ICharacter>) => void;
  updateOthers: (
    updater: ICharacter[] | ((prev: ICharacter[]) => ICharacter[])
  ) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  myCharacter: {
    id: 'me',
    username: '',
    x: 100,
    y: 100,
    character: '1',
  },
  otherCharacters: [],

  setMyPosition: (x, y) =>
    set((state) => ({
      myCharacter: { ...state.myCharacter, x, y },
    })),
  setMyCharacter: (user) =>
    set((state) => ({
      myCharacter: { ...state.myCharacter, ...user },
    })),

  updateOthers: (updater) =>
    set((state) => ({
      otherCharacters:
        typeof updater === 'function'
          ? updater(state.otherCharacters)
          : updater,
    })),
}));
