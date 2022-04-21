
import {Form,Button} from 'react-bootstrap'
import { useState } from 'react'

import { UseItemContext } from '../context/itemContext';

const CreateFormContainer = ()=>{
    const [info,setInfo] = useState({
        name:'',
        capacity:1,
        status:false,
        layout:"css",
    
    })
    const [success,setSuccess] = useState(false);
    const [image,setImage] = useState(null);
    const {createItem,loading,error} = UseItemContext();
    const handleChange = e=>{
        const key = e.target.name
        const value = e.target.value;
        
        
        setInfo(state=>{
            return {...state,[key]:value}
        })
    }
    const hanldeUploadFile = e=>{
        
        const file = e.target.files[0];
        setImage(file);
        
    }
    const handleSubmit = e=>{
        e.preventDefault()
        const response = createItem({...info,image:null,id:Math.ceil(Math.random()*100)});
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
    }
    return (
        <>
            {success?<p className='text-success'>New Item Successfully created</p>:error?<p className='text-danger'>{error}</p>:null}
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
                    <Form.Check type="checkbox"  label="Status" checked={info.status} onChange={()=>setInfo(state=>{
                        return {...state,status:!state.status}
                    })} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicImage'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={hanldeUploadFile} />
                </Form.Group>
              
                <Button variant="primary" disabled={loading} type="submit">
                    {loading?"loading.....":"Create Table"}
                </Button>{" "}
                <Button variant='danger' disabled={loading} onClick={handleCancel} >{loading?"loading.....":"Cancel"}</Button>
        </Form>
        </>
    )
}

export default CreateFormContainer;