import { useState, useRef, useEffect } from "react"
import "./PopUp.css"
import "./ChooseGroup.css"
import PopUpButton from "./PopUpButton"
import NewGroup from "./NewGroup"

export default function ChooseGroup({data, setData, setControl, type, group, setGroup, above, limit, withNew}){
    const reference = useRef()
    const [preview, setPreview] = useState(group)

    useEffect(()=>{
        for (const element of reference.current.getElementsByClassName("Adresses")) {
            if(element.classList.contains("Selecionado")){
                element.classList.remove("Selecionado")
            }
            if(element.innerHTML == preview){
                element.classList.add("Selecionado")
            }
        }
    },[preview])

    function GroupOfList({name}){
        return(<div className="Adresses" onClick={()=>{setPreview(name)}}>{name}</div>)
    }
    function createGroupList(arr, groups , str){
        if(limit == str){
            return(arr)
        }
        for (const element of groups) {
            arr.push(str+element.nome+'/')
            createGroupList(arr, element.children.groups, str+element.nome+'/')
        }
        return(arr)
    }
    return(<div className={"PopUp ChooseGroup" + (above?" Above":"")}>
        <div className="flex ChooseTop">
            <h1>Escolha o local - {type}</h1>
            <button onClick={()=>{setControl(false)}}><i className="bi bi-x"></i></button>
        </div>
        <div className="GroupList" ref={reference}>
            <GroupOfList name={"/"}/>
            {createGroupList([], data.groups[type], '/').map((e, k)=><GroupOfList key={k} name={e}/>)}

        </div>
        <div className="flex ChooseBottom">
            <button type="button">{preview}</button>
            <div className="novoGrupinho">
                {withNew && <PopUpButton title={"+"} PopUp={NewGroup} props={{ data: data, setData: setData }} portal={true}/>}
            </div>
            <button type="button" onClick={()=>{
                setGroup(preview)
                setControl(false)
            }}>ESCOLHER</button>
        </div>

    </div>)
}