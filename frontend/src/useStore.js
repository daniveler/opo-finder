import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { format, isSameDay, parseISO } from "date-fns"

const useStore = create(persist(set => ({
  date: format(new Date(), 'yyyy-MM-dd'),
  setDate: (newDate) => set({ date: newDate }),
  initializeDate: () => {
    const storedState = JSON.parse(localStorage.getItem('opo-finder-storage'))
    const storedDate = storedState?.state?.date
    
    if (storedDate && !isSameDay(parseISO(storedDate), new Date())) {
      set({ date: format(new Date(), 'yyyy-MM-dd') });
    }
  },

  boeArray: [],
  addBoeArray: (newBoe) => set((state) => ({
    boeArray: [...state.boeArray, newBoe]
  })),

  bocylArray: [],
  addBocylArray: (newBocyl) => set((state) => ({ 
    bocylArray: [...state.bocylArray, newBocyl] 
  })),
  
  bop: {},
  setBop: (newBop) => set({ bop: newBop }),

  // States for deleting local data
  localDataExpirationDate: null,
  setLocalDataExpirationDate: (newExpirationDate) => set({ localDataExpirationDate: newExpirationDate }),

  localDataBocylExpirationDate: null,
  setLocalDataBocylExpirationDate: (newExpirationDate) => set({ localDataBocylExpirationDate: newExpirationDate }),
  
  resetLocalData: () => set({ 
    localDataExpirationDate: null,
    boeArray: [],
    bop: {}
   }),
   
   resetBocylLocalData: () => set({ 
    localDataBocylExpirationDate: null,
    bocylArray: []
   })
}),
  {
    name: 'opo-finder-storage'
  }
))

export default useStore