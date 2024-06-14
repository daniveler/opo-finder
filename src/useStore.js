import { create } from 'zustand'
import { format } from "date-fns"

const useStore = create(set => ({
  date: '',
  setDate: (newDate) => set({ date: newDate })
}))

export default useStore