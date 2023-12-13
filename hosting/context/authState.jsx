import { create } from "zustand";

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// function shoud make coordinates and w3wLoc available to all components and alow them to be updated by any component with a parameter
export const useAuthStore = create((set) => ({
  coordinates: [54.96740864328492, -1.6076014583348253],
  w3wLoc: [undefined, undefined, undefined],
  uid: undefined,
  loading: false,
  error: false,
  setCoordinates: (coordinates) => set({ coordinates }),
  setw3wLoc: (w3wLoc) => set(() => ({ w3wLoc: w3wLoc })),
  setUid: (uid) => set(() => ({ uid: uid })),
  setLoading: (loading) => set(() => ({ loading: loading })),
  setError: (error) => set(() => ({ error: error })),
}));
