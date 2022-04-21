import React, { useState, useContext } from "react";
import axios from 'axios';


const ItemContext = React.createContext({
    loading:false,
    items:[],
    error:''
});

const ItemProvider = ({children})=>{
    const [loading,setLoading] = useState(false);
    const [items,setItems] = useState([]);
    const [error,setError] = useState('');
    const [update,setUpdate] = useState({
        data:{},
        is_update:false
    });

    const url = "https://my-json-server.typicode.com/sirjandrn25/react_intern_task_avocado/users/";

    const fetchItems = async ()=>{
        setLoading(true);
        return await axios.get(url).then(resp=>{
            const data = resp.data
            // console.log(data);
            setItems(data);
            setError('');
            setLoading(false);
            
            return true
        }).catch(error=>{
            // console.log(error.messages
            setLoading(false);
            return false
        })
    }
    
    const toggleUpdate =(update_data)=>{
        
        if(Object.keys(update_data).length ===0){
            setUpdate(state=>{
                return {
                    data:{},
                    is_update:false
                }
            })
        }
        else{
            setLoading(true);
            
            setTimeout(()=>{
                setUpdate(state=>{
                    return {data:update_data,is_update:true}
                })
                setLoading(false);
            },1000);
        
        }

    }
    
    const createItem = async (item_data)=>{
        
        setLoading(true)
        return await axios.post(url,item_data).then(resp=>{
            setItems(state=>[resp.data,...state]);
            // console.log(resp.data);
            setLoading(false);
            setError('')
            return true
        }).catch(error=>{
           
            setError(error.message);
            setLoading(false);
            return false
        })
    }
    const deleteItem = async(item_id)=>{
        setLoading(true)
        return await axios.delete(`${url}${item_id}/`).then(resp=>{
            setItems(items.filter(item=>item.id !=item_id?item:null));
            setLoading(false)
            setError('');
            return true
        }).catch(error=>{
            setError(error.message);
            console.log(error.message)
            setLoading(false);
        })
    }
    const updateItem = async(update_data,id)=>{
        setLoading(true)
        return await axios.put(`${url}${id}/`,update_data).then(resp=>{
            setItems(items.map(item=>item.id !=id?item:resp.data))
            setLoading(false);
            return true
        }).catch(error=>{
            setError(error.message)
            setLoading(false)
            return false
        })

    }

    return (
        <ItemContext.Provider value={{loading,items,error,fetchItems,createItem,deleteItem,update,toggleUpdate,updateItem}}>
            {children}
        </ItemContext.Provider>
    )

}

const UseItemContext = ()=>{
    const {loading,items,error,fetchItems,createItem,deleteItem,update,toggleUpdate,updateItem} = useContext(ItemContext);
    return {loading,items,error,fetchItems,createItem,deleteItem,update,toggleUpdate,updateItem}
}

export default ItemContext;
export {UseItemContext,ItemProvider};