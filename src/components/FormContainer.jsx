import {Form,Button} from 'react-bootstrap'
import { useState } from 'react'


export default function FormContainer(){
    const [info,setInfo] = useState({
        name:'',
        capacity:1,
        status:false
    })

    const handleChange = e=>{
        const key = e.target.name
        const value = e.target.value;
        console.log(value)
        
        // setInfo(state=>{
        //     return {...state,[key]:value}
        // })
    }
    return(
        <div style={{width:"500px"}}>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Layout</Form.Label>
                    <Form.Select aria-label="Default select example" name="layout" onChange={handleChange}>
                        <option>Select Layout</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={info.name} onChange={handleChange} placeholder="Enter Name" />
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCapacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" name="capacity" value={info.capacity} onChange={handleChange} placeholder="Enter Capacity" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Status" value={info.status} onChange={handleChange} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicImage'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={handleChange} />
                </Form.Group>
                {/* <div className='mb-3'>
                    <label htmlFor="image">Image</label>
                    <input type="file" />
                </div> */}
                <Button variant="primary" type="submit">
                    Create Table
                </Button>{" "}
                <Button variant='warning'  >Cancel</Button>
            </Form>
        </div>
    )
}