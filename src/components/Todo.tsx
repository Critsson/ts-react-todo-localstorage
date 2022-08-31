import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import "../styles/Todo.css"

interface TodoProps {
    description: string,
    id: number,
    deleteTodo: (id: number) => void,
    editTodo: (id: number, newDesc: string) => void
}

export default function Todo({ description, id, deleteTodo, editTodo }: TodoProps) {

    const [editing, setEditing] = React.useState(false)
    const [newDescription, setNewDescription] = React.useState(description)

    const updateText = (e: React.FormEvent<HTMLInputElement>): void => setNewDescription(e.currentTarget.value)

    const updateTodo = (): void => {
        editTodo(id, newDescription)
        setEditing(false)
    }

    const handleEnterKey = (e: React.KeyboardEvent): void => {
        if(e.key === "Enter") {
            updateTodo()
        }
    }

    return (
        <>
            {!editing ?
                <div className="todo_container">
                    <p>{description}</p>
                    <div onClick={() => setEditing(true)} className="icon_container">
                        <EditIcon sx={{ width: "1.4vw", height: "1.4vw" }} />
                    </div>
                    <div onClick={() => deleteTodo(id)} className="icon_container">
                        <DeleteIcon sx={{ width: "1.4vw", height: "1.4vw" }} />
                    </div>
                </div> :
                <div className="editing_container">
                    <input onKeyDown={(e) => handleEnterKey(e)} onChange={(e) => updateText(e)} className="text" type="text" placeholder="New Todo..." value={newDescription} />
                    <div onClick={() => updateTodo()} className="icon_container">
                        <CheckIcon sx={{ width: "1.8vw", height: "1.8vw" }} />
                    </div>
                </div>
            }
        </>
    )
}