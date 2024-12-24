import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export interface Student {
  id: string
  name: string
  cohort: string
  courses: string[]
  dateJoined: string
  lastLogin: string
  status: 'active' | 'inactive'
}

interface StudentState {
  students: Student[]
  filteredStudents: Student[]
  loading: boolean
  selectedYear: string
  selectedClass: string
  fetchStudents: () => Promise<void>
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>
  setFilters: (year: string, className: string) => void
}

export const useStore = create<StudentState>((set, get) => ({
  students: [],
  filteredStudents: [],
  loading: false,
  selectedYear: 'AY 2024-25',
  selectedClass: 'CBSE 9',

  fetchStudents: async () => {
    set({ loading: true })
    const { data, error } = await supabase
      .from('students')
      .select('*')
    
    if (error) {
      console.error('Error fetching students:', error)
      return
    }

    set({ 
      students: data,
      filteredStudents: data,
      loading: false 
    })
  },

  addStudent: async (student) => {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()

    if (error) {
      console.error('Error adding student:', error)
      return
    }

    const { students } = get()
    set({ 
      students: [...students, data[0]],
      filteredStudents: get().students.filter(s => 
        s.cohort === get().selectedYear && 
        s.courses.includes(get().selectedClass)
      )
    })
  },

  setFilters: (year, className) => {
    const { students } = get()
    set({
      selectedYear: year,
      selectedClass: className,
      filteredStudents: students.filter(student => 
        student.cohort === year && 
        student.courses.includes(className)
      )
    })
  }
}))

