import { create } from 'zustand'
import { format } from "date-fns"

const useStore = create(set => ({
  date: format(new Date(), 'yyyy-MM-dd'),
  setDate: (newDate) => set({ date: newDate })
}))

export default useStore