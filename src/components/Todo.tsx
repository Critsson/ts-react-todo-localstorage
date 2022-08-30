import React from "react"
import "../styles/Todo.css"

interface TodoProps {
    description: string,
    id: number 
}

export default function Todo({description, id}: TodoProps) {
    return (
        <div className="todo_container">
            <p>{id}</p>
            <p>{description}</p>
        </div>
    )
}