import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CreateStudentInput } from "../types/student"

interface AddStudentModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

const CLASSES = {
  "CBSE 9": ["Mathematics", "Science", "English", "Social Studies", "Hindi"],
  "CBSE 10": ["Mathematics", "Science", "English", "Social Studies", "Hindi"]
}

export function AddStudentModal({ open, onClose, onSuccess }: AddStudentModalProps) {
  const [selectedClass, setSelectedClass] = useState<keyof typeof CLASSES | ''>('')
  const [formData, setFormData] = useState<CreateStudentInput>({
    name: '',
    cohort: 'AY 2024-25',
    courses: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create student')
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error creating student:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubjectToggle = (subject: string) => {
    const fullCourseName = `${selectedClass} ${subject}`
    setFormData(prev => {
      const exists = prev.courses.includes(fullCourseName)
      return {
        ...prev,
        courses: exists
            ? prev.courses.filter(c => c !== fullCourseName)
            : [...prev.courses, fullCourseName]
      }
    })
  }

  return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Student Name</Label>
              <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cohort">Cohort</Label>
              <Select
                  value={formData.cohort}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, cohort: value }))}
              >
                <SelectTrigger id="cohort">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
                  <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select
                  value={selectedClass}
                  onValueChange={(value: keyof typeof CLASSES) => {
                    setSelectedClass(value)
                    setFormData(prev => ({ ...prev, courses: [] }))
                  }}
              >
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBSE 9">CBSE 9</SelectItem>
                  <SelectItem value="CBSE 10">CBSE 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedClass && (
                <div className="space-y-2">
                  <Label>Subjects</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {CLASSES[selectedClass].map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                              id={subject}
                              checked={formData.courses.includes(`${selectedClass} ${subject}`)}
                              onCheckedChange={() => handleSubjectToggle(subject)}
                          />
                          <Label htmlFor={subject} className="cursor-pointer">{subject}</Label>
                        </div>
                    ))}
                  </div>
                </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                  type="submit"
                  disabled={isSubmitting || formData.courses.length === 0}
              >
                {isSubmitting ? 'Adding...' : 'Add Student'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  )
}
