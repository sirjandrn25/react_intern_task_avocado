import CreateFormContainer from "./CreateFormContainer"
import EditFormContainer from "./EditFormContainer"
import { UseItemContext } from "../context/itemContext"

export default function FormContainer(){
    const {update} = UseItemContext()
    
    return(
        <div>
            {update.is_update?<EditFormContainer/>:<CreateFormContainer />}
            
        </div>
    )
}


