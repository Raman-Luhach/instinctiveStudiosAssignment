import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Student } from '../types/student'

export function StudentTable({ onAddStudent }: { onAddStudent: () => void }) {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchStudents = async () => {
    try {
      let url = 'http://localhost:3000/students'
      if (selectedYear && selectedClass) {
        url += `?cohort=${selectedYear}&course=${selectedClass}`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch students')

      const data = await response.json()
      setStudents(data)
      setFilteredStudents(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching students:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [selectedYear, selectedClass])

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
  }

  const handleClassChange = (className: string) => {
    setSelectedClass(className)
  }

  if (isLoading) {
    return <div className="bg-white rounded-lg shadow p-4">Loading...</div>
  }

  return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className='flex justify-between mb-6'>
          <div className='flex gap-[9px]'>
            <Select
                value={selectedYear}
                onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-[180px] bg-[#E9EDF1]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
                <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
              </SelectContent>
            </Select>
            <Select
                value={selectedClass}
                onValueChange={handleClassChange}
            >
              <SelectTrigger className="w-[180px] bg-[#E9EDF1]">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CBSE 9">CBSE 9</SelectItem>
                <SelectItem value="CBSE 10">CBSE 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
              onClick={onAddStudent}
              className="bg-[#E9EDF1] hover:text-white text-[#3F526E]"
          >
            + Add new Student
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium text-gray-600">Student Name</th>
              <th className="text-left p-4 font-medium text-gray-600">Cohort</th>
              <th className="text-left p-4 font-medium text-gray-600">Courses</th>
              <th className="text-left p-4 font-medium text-gray-600">Date Joined</th>
              <th className="text-left p-4 font-medium text-gray-600">Last Login</th>
            </tr>
            </thead>
            <tbody>
            {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b last:border-b-0">
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.cohort}</td>
                  <td className="p-4">{student.courses.join(', ')}</td>
                  <td className="p-4">{format(new Date(student.dateJoined), 'PP')}</td>
                  <td className="p-4">
                    {student.lastLogin
                        ? format(new Date(student.lastLogin), 'PP')
                        : 'Never'}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

