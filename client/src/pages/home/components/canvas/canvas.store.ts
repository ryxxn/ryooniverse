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
  setChat: (id: string, chat: string | null) => void;
  clearChat: (id: string) => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  myCharacter: {
    id: 'me',
    username: '',
    x: 100,
    y: 100,
    character: '1',
    chat: null,
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
  setChat: (id, chat) => {
    if (!chat) return;
    // Mine
    const { myCharacter } = get();
    if (myCharacter.id === id) {
      set((state) => ({
        myCharacter: { ...state.myCharacter, chat },
      }));
      return;
    }
    // Others
    set((state) => ({
      otherCharacters: state.otherCharacters.map((c) =>
        c.id === id ? { ...c, chat } : c
      ),
    }));
  },
  clearChat: (id) => {
    // Mine
    const { myCharacter } = get();
    if (myCharacter.id === id) {
      set((state) => ({
        myCharacter: { ...state.myCharacter, chat: null },
      }));
      return;
    }
    set((state) => ({
      otherCharacters: state.otherCharacters.map((c) =>
        c.id === id ? { ...c, chat: null } : c
      ),
    }));
  },
}));
