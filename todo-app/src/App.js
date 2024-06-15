import React, { useState } from 'react'
import './App.css'

const App = () => {
  const[inputValue,setInputValue] = useState('')
  const[todos,setTodos] = useState([])
  const[priority,setPriority]= useState('medium')
  const[selectedCategory,setSelectedCategory]= useState('all')
  const[filterTodos,setFilterTodos] = useState(todos)
  // const[lowSelected,setLowSelected] = useState(true)
  // const[mediumSelected,setMediumSelected] = useState(true)
  // const[highSelected,setHighSelected] = useState(true)


  const todo={
    id:Date.now(),
    text:inputValue,
    completed:false,
    priorityLevel:priority
  }


  function saveTodo(){
    if(todo.text !==''){
      setTodos([...todos,todo])
      setFilterTodos([...todos,todo])
      setInputValue('')
      setSelectedCategory('all')
      // sortTodo()
  
    }

  }

  function deleteTodo(todoId){
    let filteredTodos = todos.filter((t)=>t.id!==todoId)
    setTodos(filteredTodos)
    let rmainTodos= filterTodos.filter(t=>t.id!==todoId)
    setFilterTodos(rmainTodos)

  }

  function toggleTodo(id){
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    setFilterTodos(filterTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));

  }
  function filterTodo(category){
    setSelectedCategory(category)
    if(category==="all"){
      setFilterTodos(todos)
    }
    if(category==='completed'){
      setFilterTodos(todos.filter((tod)=>tod.completed===true))

    }
    if(category==="uncompleted"){
      setFilterTodos(todos.filter((tod)=>tod.completed===false))
    }
  }
  // function sortTodo(){
  //   if(selectPriority==='time'){
  //     setFilterTodos([...filterTodos].sort((a,b)=>a.id-b.id))
  //   }

  //   if(selectPriority==='az'){
  //     setFilterTodos([...filterTodos].sort((a,b)=>a.text.localeCompare(b.text)))

  //   }
    
  // }

 




  return (
    <div className='App'>
      <div className="container">
        <div className="input">
          <input type="text" placeholder='input'value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
            <select name="Priority" id="priority" onChange={(e)=>setPriority(e.target.value)} value={priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={saveTodo}>save</button>
        
        </div>
        <div className="todos">
          <div className="todos-menu">
            <h1>Todos</h1>
            {/* {selectedCategory==='all'?<div className="select-priority">
              <button onClick={()=>{
                setLowSelected(!lowSelected)
                if(!lowSelected){
                  setFilterTodos([...filterTodos].filter((t)=>t.priority===!'low'))
                }else{
                  setFilterTodos([...todos])
                }
              }}>Low</button>
              <button onClick={()=>{
                setMediumSelected(!mediumSelected)
                if(!mediumSelected){
                  setFilterTodos([...filterTodos].filter(t=>t.priority===!'medium'))
                }else{
                  setFilterTodos([...todos])
                  
                }

              }}>Medium</button>
              <button onClick={()=>{

              }}>High</button>
            </div>:<div></div>} */}
          </div>
        <ul className='all-todos'>

          {filterTodos.map((todo)=>(
            <li key={todo.id} className={todo.priorityLevel}>
              <section>
              <input type="checkbox"  onChange={()=>toggleTodo(todo.id)} checked={todo.completed} />
              {/* acting werd when i want to delete and i should make checkbox circular */}
              <span style={todo.completed?{textDecoration:"line-through",fontFamily:"serif"}:{}}>
              {todo.text}
              </span>

              </section>
              {todo.completed?<img src="./icon/cancel.png" onClick={()=>deleteTodo(todo.id)} height={30} width={30} alt="" />:<div></div>}

            
              </li>
          ))}
            </ul>

          <ul className="todos-categories">
            <li onClick={()=>filterTodo('all')} className={`todo-category ${selectedCategory==="all"?'active-category':''}`}>All</li>
            <li onClick={()=>filterTodo('uncompleted')} className={`todo-category ${selectedCategory==="uncompleted"?'active-category':''}`}>Uncompleted</li>
            <li onClick={()=>filterTodo('completed')} className={`todo-category ${selectedCategory==="completed"?'active-category':''}`}>Completed</li>

          </ul>
          {/* <ul className="priority-categories">
            <li>All</li>
            <li>Low</li>
            <li>Medium</li>
          </ul> */}
        </div>
      </div>



    </div>
  )
}

export default App;