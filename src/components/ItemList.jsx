import {Table} from 'react-bootstrap';
import { render } from 'react-dom';
import { UseItemContext } from '../context/itemContext';

export default function ItemList(){
    const {items,deleteItem,loading,error,toggleUpdate} = UseItemContext();
   
    const renderItem = (item,index)=>{
        return(
            <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.layout}</td>
                    <td>{item.name}</td>
                    <td>{item.capacity}</td>
                    <td>{item.status?"Active":"Deactive"}</td>
                    <td>Image {item.id}</td>
                    <td>
                        <button disabled={loading} onClick={e=>toggleUpdate(item)}>edit</button>{" "}
                        <button disabled={loading} onClick={e=>handleDeleteItem(item.id)}>delete</button>
                    </td>
                </tr>
        )
    }

    const handleDeleteItem = (item_id)=>{
        deleteItem(item_id)
        
    }
    return (
        <div>
                {error?<p className='text-danger'>{error}</p>:null}
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sno.</th>
                                <th>Layout</th>
                                <th>Name</th>
                                <th>Capacity</th>
                                <th>Status</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item,index)=>{
                                return renderItem(item,index);
                            })}
                            
                        </tbody>
            </Table>
        </div>
        
    )
}