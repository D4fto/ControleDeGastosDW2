import { useState } from "react"

import ReactDOM from 'react-dom'


export default function PopUpButton({title, icon, PopUp, props, above, portal}){
    const [control, setControl] = useState(false)

    return(<>
        <button type="button" onClick={()=>{setControl(!control)}}>
            {icon}
            {title}
        </button>
        {control && portal ? ReactDOM.createPortal(<PopUp {...props} setControl = {setControl} above={above}/>, document.body):control&&<PopUp {...props} setControl = {setControl} above={above}/>}
    </>)
}