'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'


interface Task {
  id: number
  title: string
  description: string
  category: string,
  completed: boolean
}

const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Education']

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({ id: 0, title: '', description: '', category: '', completed: false });
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  const addTask = (item: React.FormEvent) => {
    item.preventDefault()
    if (newTask.title.trim() && newTask.category) {
      setTasks([...tasks, { ...newTask, id: Date.now() }])
      // Reset the form
      setNewTask({ id: 0, title: '', description: '', category: '', completed: false })
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
   
  }

  const startEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const cancelEditTask = () => {
    setEditingTask(null)
  }

  const saveEditTask = () => {
    if (editingTask) {
      setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task))
      setEditingTask(null)
    }
  }
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="space-y-4">
            <Input
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <Textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <Select
              value={newTask.category}
              onValueChange={(value) => setNewTask({ ...newTask, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={addTask}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </CardFooter>
      </Card>
      {/* Display All Tasks */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks created yet. Add a task to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map(task => (
              <Card key={task.id} className={`overflow-hidden ${task.completed ? 'bg-gray-100' : ''}`}>
                <CardHeader className="pb-2">
                  <CardTitle className='flex item-center justify-between'>
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                    />
                  </CardTitle>

                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <Badge>{task.category}</Badge>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className='mr-5' onClick={() => startEditTask(task)}>Edit</Button>
                  <Button variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Edit Task</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input
                    placeholder="Task Title"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Task Description"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  />
                  <Select
                    value={editingTask.category}
                    onValueChange={(value) => setEditingTask({ ...editingTask, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="secondary" onClick={cancelEditTask}>Cancel</Button>
                <Button onClick={saveEditTask}>Save</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}