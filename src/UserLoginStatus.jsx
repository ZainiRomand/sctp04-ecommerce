// atoms.js
import { atom } from 'jotai';

// Create an atom to hold the login state
export const userLoggedInAtom = atom(false);  // Default is false (user is not logged in)
