import React, { useState } from 'react'
import AddToDo from './AddToDo';

export default function ToDo(props) {

    const [update, setUpdate] = useState(false);

    const handleDeleteToDo = async()=>{
        // console.log(props.id);
        const result = await fetch('http://localhost:80/api/todos/deleteTodo/'+props.id, {
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
                    <a href="#" className="btn btn-primary">
                        {props.status}
                    </a>
                </div>
                    <button type="submit" className='success' onClick={handleDeleteToDo}>Delete ToDo</button>
                    <button type="submit" className='success' onClick={handleEditToDo}>Edit ToDo</button>
            </div>
            {update && <AddToDo setAddTodo={setUpdate} setData={props.setData} onSubmit = {props.id} data={props.data}></AddToDo>}
        </div>

    )
}
