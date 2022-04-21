
import {Form,Button} from 'react-bootstrap'
import { useState,useEffect } from 'react'

import { UseItemContext } from '../context/itemContext';

const EditFormContainer = ()=>{
    
    const [success,setSuccess] = useState(false);
    const [image,setImage] = useState(null);
    const {createItem,loading,error,toggleUpdate,update,updateItem} = UseItemContext();
    const [info,setInfo] = useState({
        name:'',
        capacity:0,
        status:false,
        layout:'css'
    
    })
    useEffect(()=>{
        setInfo({
            name:update.data.name,
            capacity:update.data.capacity,
            status:update.data.status,
            layout:update.data.layout,
        
        })
    },[update])
    const handleChange = e=>{
        const key = e.target.name
        const value = e.target.value;
        console.log(key)
        
        setInfo(state=>{
            return {...state,[key]:value}
        })

        setTimeout(()=>{
            console.log(info)
        },2000)
    }
    const hanldeUploadFile = e=>{
        
        const file = e.target.files[0];
        setImage(file);
        
    }
    const handleSubmit = e=>{
        e.preventDefault()
        console.log("updating item")
        // console.log(info)
        const response = updateItem({...info,image:null},update.data.id);
        response.then(resp=>{
            if(resp){
                setSuccess(true)
            }
            else{
                setSuccess(false);
            }
        })
    }

    const handleCancel = e=>{
        setInfo({
            name:'',
            status:false,
            capacity:0,
            layout:'css'
        });
        setImage(null);
        toggleUpdate({});
    }
    return (
        <>
            {success?<p className='text-success'>Item is successfully updated</p>:error?<p className='text-danger'>{error}</p>:null}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Layout</Form.Label>
                    <Form.Select aria-label="Default select example" value={info.layout} name="layout" onChange={handleChange} required>
                        
                        <option value="css">css</option>
                        <option value="html">html</option>
                        <option value="js">js</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" required value={info.name} onChange={handleChange} placeholder="Enter Name" />
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCapacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" name="capacity" required value={info.capacity} onChange={handleChange} placeholder="Enter Capacity" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Status" checked={info.status} onChange={()=>setInfo(state=>{return {...state,status:!info.status}})} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicImage'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={hanldeUploadFile} />
                </Form.Group>
              
                <Button variant="secondary" disabled={loading} type="submit">
                    {loading?"loading.....":"Save Table"}
                </Button>{" "}
                <Button variant='danger' disabled={loading} onClick={handleCancel} >{loading?"loading.....":"Cancel"}</Button>
        </Form>
        </>
    )
}

export default EditFormContainer;