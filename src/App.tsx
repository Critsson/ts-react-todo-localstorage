import React from 'react';
import Todo from "./components/Todo"
import './styles/App.css';

function App() {

  const [text, setText] = React.useState("")
  const [count, setCount] = React.useState(1)
  const [listOfTodos, setListOfTodos] = React.useState<JSX.Element[]>([])

  const submitForm = (e: React.FormEvent): void => {
    const newArr: JSX.Element[] = [];
    e.preventDefault();

    if (listOfTodos.length === 0) {
      newArr.push(<Todo key={count} description={text} id={count} />)
      setCount(count + 1)
    } else if (listOfTodos.length > 0) {
      for (let i = 0; i < listOfTodos.length; i++) {
        newArr.push(listOfTodos[i])
        if (i === listOfTodos.length - 1) {
          newArr.push(<Todo key={count} description={text} id={count} />)
          setCount(count + 1)
        }
      }
    }

    setListOfTodos(newArr)

  }

  const updateText = (e: React.FormEvent<HTMLInputElement>): void => setText(e.currentTarget.value)

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
        {listOfTodos}
      </div>
    </div>
  );
}

export default App;
