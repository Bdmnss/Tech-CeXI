import { atom } from 'jotai';

export const currentPageAtom = atom<number>(1);
export const searchTermAtom = atom<string>('');
