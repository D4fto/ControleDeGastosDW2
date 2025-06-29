import { useState } from "react"

export default function ChooseGroup({data, setControl, type, group, setGroup}){
    function GroupOfList({name}){
        return(<div onClick={()=>{setPreview(name)}}>{name}</div>)
    }
    const [preview, setPreview] = useState(group)
    function createGroupList(arr, groups , str){
        for (const element of groups) {
            arr.push(str+element.nome+'/')
            createGroupList(arr, element.children.groups, str+element.nome+'/')
        }
        return(arr)
    }
    return(<div>
        <button onClick={()=>{setControl(false)}}><i className="bi bi-x"></i></button>
        <h1>Escolha o local - {type}</h1>
        <div className="GroupList">
            <GroupOfList name={"/"}/>
            {createGroupList([], data.groups[type], '/').map((e, k)=><GroupOfList key={k} name={e}/>)}
            <button type="button">{preview}</button>
            <button type="button" onClick={()=>{
                setGroup(preview)
                setControl(false)
            }}>ESCOLHER</button>

        </div>

    </div>)
}