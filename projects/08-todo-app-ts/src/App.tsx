import { useState } from "react"
import { Todos } from "./components/Todos"
import { FilterValue, type TodoTitle, type TodoId, type Todo as TodoType } from './types';
import { TODO_FILTERS } from "../consts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";


const mockTodos = [
  { id: '1', title: 'Ver el Twitch de midu', completed: true },
  { id: '2', title: 'Aprender React con Typescript', completed: false },
  { id: '3', title: 'Sacar ticket para la midufst', completed: false },
]

const generateId = (): string => {
  // Try to use crypto.randomUUID if available
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  
  // Fallback implementation
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'> ) => {
      const newTodos = todos.map((todo) => {
        if( todo.id === id ) {
          return {
            ...todo,
            completed
          }
        }
        return todo
      })

      setTodos(newTodos)
  }

  const handleFilterChange = (filter:FilterValue) => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter( todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}: TodoTitle) => {
    const newTodo = {
      title,
      id: generateId(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }


  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos
        onToggleTodoCompleted={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
