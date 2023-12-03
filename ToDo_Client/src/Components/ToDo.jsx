import React, { useState } from 'react'
import AddToDo from './AddToDo';

export default function ToDo(props) {

    const [update, setUpdate] = useState(false);
    const url = 'https://todo-api-wqod.onrender.com/';

    const handleDeleteToDo = async()=>{
        // console.log(props.id);
        const result = await fetch(url+'api/todos/deleteTodo/'+props.id, {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = await result.json();
        if(!data.deletedToDo){
            alert(data.error);
        }
        else{
            let arr = []
            props.data.forEach(element => {
                if(element._id !== data.deletedToDo._id){
                    arr.push(element);
                }
            });
            props.setData(arr);
        }

    }

    const handleEditToDo = ()=>{
        (!update)?setUpdate(true):setUpdate(false);
    }

    const handleEditStatus = async () => {
        const result = await fetch('api/todos/statusTodo/'+props.id, {
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                status: props.status
            })
        })

        const data = await result.json();
        if(!data.statusToDo){
            alert(data.error);
        }
        else{
            let arr = []
            props.data.forEach(element => {
                if(element._id !== data.statusToDo._id){
                    arr.push(element);
                }
                else{
                    arr.push(data.statusToDo)
                }
            });
            props.setData(arr);
        }
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">{props.title}</div>
                <div className="card-body">
                    <h5 className="card-title">{props.description}</h5>
                    <p className="card-text">
                        {props.status&&"Done!"}
                        {!props.status&&"Yet to Do!"}
                    </p>
                    <button onClick={handleEditStatus}>{props.status?"Mark Undone":"Mark Done"}</button>
                </div>
                    <button type="submit" className='success' onClick={handleDeleteToDo}>Delete ToDo</button>
                    <button type="submit" className='success' onClick={handleEditToDo}>Edit ToDo</button>
            </div>
            {update && <AddToDo setAddTodo={setUpdate} setData={props.setData} onSubmit = {props.id} data={props.data}></AddToDo>}
        </div>

    )
}
