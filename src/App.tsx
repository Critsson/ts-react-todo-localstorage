import React from 'react';
import Todo from "./components/Todo"
import './styles/App.css';

interface TodoObject {
  id: number,
  description: string
}

function App() {

  const [text, setText] = React.useState("")
  const [count, setCount] = React.useState(1)
  const [listOfTodos, setListOfTodos] = React.useState<TodoObject[]>([])

  React.useEffect(() => {

    const todos: TodoObject[] = JSON.parse(localStorage.getItem("todos")!)
    const savedCount: number = JSON.parse(localStorage.getItem("savedCount")!)

    setCount(savedCount)

    if (todos) {
      setListOfTodos(todos)
    }


  }, [])

  React.useEffect(() => {

    localStorage.setItem("todos", JSON.stringify(listOfTodos))

  }, [listOfTodos])

  React.useEffect(() => {
    localStorage.setItem("savedCount", JSON.stringify(count))
  }, [count])

  const deleteTodo = (id: number): void => {

    for (let i = 0; i < listOfTodos.length; i++) {

      if (id === listOfTodos[i].id) {
        let placeholder: TodoObject[] = listOfTodos.concat()
        placeholder.splice(i, 1)
        setListOfTodos(placeholder)
        return
      }
    }

    console.error("No todo of that id exists")

  }

  const editTodo = (id: number, newDesc: string): void => {

    for (let i = 0; i < listOfTodos.length; i++) {
      if (id === listOfTodos[i].id) {
        let placeholder: TodoObject[] = listOfTodos.concat()
        placeholder[i].description = newDesc
        setListOfTodos(placeholder)
        return
      }
    }

    console.error("No todo of that id exists")

  }

  const submitForm = (e: React.FormEvent): void => {

    e.preventDefault()
    let placeholder: TodoObject[] = listOfTodos.concat({ id: count, description: text })

    setListOfTodos(placeholder)
    setText("")
    setCount(count + 1)
  }

  const updateText = (e: React.FormEvent<HTMLInputElement>): void => setText(e.currentTarget.value)

  const listOfTodoElements: JSX.Element[] = listOfTodos.map((todo) => {
    return <Todo key={todo.id} id={todo.id} description={todo.description} deleteTodo={deleteTodo} editTodo={editTodo} />
  })

  return (
    <div className="container">
      <div className="title_container">
        <h1 className="title">To-Do Manager</h1>
      </div>
      <form onSubmit={(e) => submitForm(e)}>
        <input onChange={(e) => updateText(e)} className="text_input" type="text" placeholder="Task..." value={text} />
        <button className="submit_button" type="submit">Submit</button>
      </form>
      <div className="todos_container">
        {listOfTodoElements}
      </div>
    </div>
  );
}

export default App;
