/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'


function TodoItem({todo,editTodo,removeTodo,toggleTodo}) {
    const[iseditable, setIseditable] = useState(false)
    const[editedText, setEditedText] = useState(todo.text)

    const handleEdit = () => {
        if(!todo.completed){
            setIseditable(true)
        }
    }
    const handleSave = (e) => {
        console.log("In save")
        try{
            e.preventDefault();
        if (editedText.trim() !== '') {
            editTodo(todo.id, editedText);
          }

        setIseditable(false);
        console.log("Edited saved")
        }catch(e){
            console.error("Error occured: ",e.message)
        }
    }
    console.log(`todo id: ${todo.id}`)
  return (
    <div className='flex items-center justify-between rounded bg-white p-4 mb-4 shadown-md w-full'>
        <div className='flex items-center'>
            <input
            type="checkbox"
            className='mr-2'
            checked={todo.completed}
            onChange={()=>toggleTodo(todo.id)}
            />
            {iseditable ? (
            <input type="text" 
            className='border rounded p-2 w-40'
            value={editedText}
            onChange={(e)=>setEditedText(e.target.value)}
            disabled={!iseditable}
            />): (
                <span className={todo.completed?'line-through mr-2':'mr-2'}>{todo.text}</span>
            )
            }
        </div>
        <div className='flex'>
            {iseditable? (
                <button
                onClick={handleSave}
                className='text-blue-500 border rounded px-3 py-1 border-blue-500 hover:text-white hover:bg-blue-500 mx-2'> Save </button>
            ): (
                <button
                onClick={handleEdit}
                className={`text-blue-500 border rounded px-3 py-1 border-blue-500 ${todo.completed?'cursor-not-allowed':'hover:text-white hover:bg-blue-500'} mr-2`}
                disabled={todo.completed}> Edit </button>
            )}
            <button
            onClick={()=>removeTodo(todo.id)}
            className={`text-red-500 border rounded px-3 py-1 border-red-500 ${todo.completed?'hover:text-white hover:bg-red-500':'cursor-not-allowed'}`}
            disabled={!todo.completed}>Delete</button>
        </div>
    </div>
  )
}

export default TodoItem