// import {Form,Button} from 'react-bootstrap'
import FormContainer from './FormContainer'
import ItemList from './ItemList'
import {Row,Col} from 'react-bootstrap';
import { UseItemContext } from '../context/itemContext';
import { useEffect } from 'react';

export default function HomeCotainer(){
    const {fetchItems} = UseItemContext();
    useEffect(()=>{
        fetchItems();
        
    },[]);

    return (
        <div className="home-container">
            <h3>Create Table</h3>
            <hr />
            <Row>
                <Col lg={4}>
                    <FormContainer /> 
                </Col>
                <Col lg={8}>
                    <ItemList />
                </Col>
            </Row>
         
        </div>
    )
}