import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { format } from "date-fns"

const useStore = create(persist(set => ({
  date: format(new Date(), 'yyyy-MM-dd'),
  setDate: (newDate) => set({ date: newDate })
}),
  {
    name: 'date-storage'
  }
))

export default useStore