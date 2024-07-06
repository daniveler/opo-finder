import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { format, isSameDay, parseISO } from "date-fns"

const useStore = create(persist(set => ({
  date: format(new Date(), 'yyyy-MM-dd'),
  setDate: (newDate) => set({ date: newDate }),
  initializeDate: () => {
    const storedState = JSON.parse(localStorage.getItem('date-storage'));
    const storedDate = storedState?.state?.date;
    
    if (storedDate && !isSameDay(parseISO(storedDate), new Date())) {
      set({ date: format(new Date(), 'yyyy-MM-dd') });
    }
  }
}),
  {
    name: 'date-storage'
  }
))

export default useStore