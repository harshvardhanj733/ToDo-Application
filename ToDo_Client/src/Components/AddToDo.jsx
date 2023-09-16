import React, { useState } from 'react'

export default function AddToDo(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);

    const onChangeTitle = (event)=>{
        setTitle(event.target.value);
    }
    
    const onChangeDescription = (event)=>{
        setDescription(event.target.value);
    }

    const onChangeStatus = (event)=>{
        (event.target.checked === true)?setStatus(true):setStatus(false);
    }

    const onSubmitAdd = async(event)=>{
        event.preventDefault();

        const result = await fetch('http://localhost:80/api/todos/newTodo', {
            method: "POST",
            body:JSON.stringify({title, description, status}),
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        const data = await result.json();
        props.setData(prevData => [...prevData, data.data]);
        props.setAddTodo(false);
    }

    const onSubmitUpdate = async(event)=>{
        event.preventDefault();

        const result = await fetch('http://localhost:80/api/todos/updateTodo/'+props.onSubmit,{
            method: "PUT",
            body:JSON.stringify({title, description, status}),
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })

        const data = await result.json();

        let arr = [];

        props.data.forEach(element => {
            if(element._id !== data.updatedToDo._id){
                arr.push(element);
            }
            else{
                arr.push(data.updatedToDo);
            }
        });

        props.setData(arr);
        props.setAddTodo(false);
    }

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="title"
                    value={title}
                    onChange={onChangeTitle}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={onChangeDescription}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">
                    Status
                </label>
                <input
                    type="checkbox"
                    // className="form-control"
                    name='status'
                    id="status"
                    // checked
                    onChange={onChangeStatus}
                />
            </div>
            
            <button type="submit" className="btn btn-primary" onClick = {(props.onSubmit === "Add")?onSubmitAdd:onSubmitUpdate}>
                Submit
            </button>
        </form>

    )
}
