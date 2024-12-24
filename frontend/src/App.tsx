import { useEffect, useState } from 'react'
import { Sidebar } from './component/Sidebar'
import { Header } from './component/Header'
import { StudentTable } from './component/StudentTable'
import { AddStudentModal } from './component/AddStudentModal'
import { useStore } from './store/store'

export default function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { fetchStudents } = useStore()

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <main className="p-6">
          <StudentTable onAddStudent={() => setIsAddModalOpen(true)} />
        </main>
      </div>
      <AddStudentModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}

