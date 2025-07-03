import { useState } from "react"


export default function PopUpButton({title, icon, PopUp, props, above}){
    const [control, setControl] = useState(false)

    return(<>
        <button type="button" onClick={()=>{setControl(!control)}}>
            {icon}
            {title}
        </button>
        {control && <PopUp {...props} setControl = {setControl} above={above}/>}
    </>)
}