import React, { useEffect, useState } from 'react'
import ToDo from './ToDo';
import AddToDo from './AddToDo';

export default function GetTodos(props) {

  const url = 'https://todo-api-wqod.onrender.com'

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [addTodo, setAddTodo] = useState(false);

  const getData = async ()=>{
      let dataFromBackend = await fetch(url+'/api/todos/dashboard', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      });

      let result = await dataFromBackend.json();
      
      if(!result.data){
          setError(true);
      }
      else{
          if(data !== result.data){
            setData(result.data);
          }
      }
  }

  useEffect(()=>{
    console.log("UseEffect");
    getData();
  }, [])

  const handleAddToDoButton = ()=>{
      (!addTodo)?setAddTodo(true):setAddTodo(false);
  }

  return (
    <section>
        <div>
          {error&&"Forbidden!"}
          <div>
            {!error && <button type="button" className="btn btn-success" onClick={handleAddToDoButton}>Add a ToDo</button>}
          </div>
          {addTodo && <AddToDo setAddTodo={setAddTodo} setData={setData} onSubmit = "Add"></AddToDo>}
          {data.length===0 && "No Elements to Show"}
          {(!error)&&data.map((todo)=>{
            return (
                <>
                  <ToDo key={todo._id} id={todo._id} title={todo.title} description={todo.description} status={todo.status} data={data} setData = {setData}></ToDo>
                </>
            )
          })}
        </div>
    </section>
  )
}
