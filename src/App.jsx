import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [editText, setEditText] = useState("")
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    if (todo.trim() === "") return;
    const newTodos = [...todos, { todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    saveTodo(newTodos)
  }
  //For pressing Enterkey
  const handleKeyDownAdd = (e) => {
    if (e.key === "Enter") {
      handleAdd()
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(updatedTodos)
    saveTodo(updatedTodos)
  }

  const handleEdit = (index, text) => {
    setEditIndex(index)
    setEditText(text)
  }

  const handleSave = (index) => {
    if (editText.trim() === "") return;
    const updatedTodos = [...todos]
    updatedTodos[index].todo = editText
    setTodos(updatedTodos)
    setEditIndex(null)
    saveTodo(updatedTodos)
  }

  const handleKeyDownSave = (e, index) => {
    if (e.key === "Enter") {
      handleSave(index)
    }
  }

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
    saveTodo(updatedTodos)
  }

  const saveTodo = (todosToSave) => {
    localStorage.setItem("todos", JSON.stringify(todosToSave))
  }

  return (
    <>
      <Navbar />
      <div className="container bg-blue-100 rounded-xl my-7 mx-auto p-5 min-h-[81.51vh]">
        <h2 className='text-3xl font-bold logoTodo text-grey mb-3'>ToDo List</h2>

        <div className="addTodo flex">
          <input 
            type="text" 
            value={todo}
            onChange={handleChange} 
            onKeyDown={handleKeyDownAdd} 
            placeholder='Task Title' 
            className='bg-white w-1/2 rounded-md px-3' 
          />
          <button onClick={handleAdd} className='bg-blue-400 hover:bg-blue-500 text-white p-3 py-1 rounded-md mx-6 font-bold cursor-pointer'>Add</button>
        </div>
        <div className='h-[1px] bg-black my-5 opacity-15 mx-auto'></div>
        <div className='finish-box flex items-center mt-6 justify-between w-4/5'>
          <h2 className='font-bold text-xl text-grey cursor-pointer'>List of Tasks</h2>
          <div className='finishedTask font-bold text-lime-950'>
            <input type="checkbox" onChange={toggleFinished} checked={showFinished} />
            <span className='mx-1'>Show Finished Task</span>
          </div>
        </div>

        <div className="display pl-5">
          {todos.length === 0 && <div className='my-2'> Task is not added yet </div>}
          {todos.map((item, index) => (
            (showFinished || !item.isCompleted) && (

              <div key={index} className='task-box flex w-4/5 justify-between my-2 items-center'>
                <input type="checkbox" checked={item.isCompleted} onChange={() => handleCheckbox(index)} />

                {editIndex === index ? (
                  <input 
                    type="text" 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)} 
                    onKeyDown={(e) => handleKeyDownSave(e, index)} 
                    className="bg-white w-2/3 px-2 rounded edit-tex" 
                  />
                ) : (
                  <div className="text-box w-2/3 overflow-hidden">
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                )}

                <div className='buttons'>
                  {editIndex === index ? (
                    <button onClick={() => handleSave(index)} className='bg-green-500 hover:bg-green-600 text-white p-3 py-1 rounded-md mx-2 font-bold cursor-pointer'>
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(index, item.todo)} className='bg-blue-400 hover:bg-blue-500 text-white p-3 py-1 rounded-md mx-2 font-bold cursor-pointer'>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  )}

                  <button onClick={() => handleDelete(index)} className='bg-red-500 hover:bg-red-600 text-white p-3 py-1 rounded-md mx-1 font-bold cursor-pointer'>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              
            )
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App;
