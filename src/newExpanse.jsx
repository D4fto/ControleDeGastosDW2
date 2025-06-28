import { useState } from "react"
import ChooseGroup from "./ChooseGroup"
import PopUpButton from "./PopUpButton"

function findGroupToAdd(address, groups, id){
    for (const element of groups) {
        if(element.nome==address[0]){
            address.shift()
            addIdToGroup(address, element, id)
            return
        }
    }
    console.error(address)
    console.error(`Grupo não encontrado`)

}
function addIdToGroup(address, group, id){
    if(!address.length){
        group.children.expanses.push(id)
        return
    }
    findGroupToAdd(address, group.children.groups, id)
}
export default function NewExpanse({data, setData}){
    const [group, setGroup] = useState("/")
    const [type, setType] = useState("fixo")

    function send(event){
        event.preventDefault()
        const newData = {...data}
        
        let id = newData.expanses[type].maxId+1
        newData.expanses[type].maxId = id
        newData.expanses[type][id] = {...newExpanse}
        if(group==="/"){
            newData.expanses.inRoot.push(type+id)
        }else{
            findGroupToAdd(group.substring(1,group.length-1).split("/"), newData.groups[type], id)
        }
        setData(newData)
    }
    return(
        <>
        <form onSubmit={send} action="">
            <input onChange={(e)=>{changeObject("nome",e.target.value)}} id="nome" type="text" placeholder="Nome" required/> <br />
            <input onChange={(e)=>{changeObject("valor",e.target.value)}} id="valor" type="number" placeholder="R$ 00.00" required/> <br />
            <input onChange={(e)=>{changeObject("data",e.target.value)}} id="data" type="date" required/> <br />
            <textarea onChange={(e)=>{changeObject("descricao",e.target.value)}} name="" id="descricao" placeholder="Descrição legal"></textarea> <br />
            <PopUpButton title={group} PopUp={ChooseGroup} props={{data: data, setData: setData, type:type, group: group, setGroup: setGroup}}/><br/>
            <select onChange={(e)=>{changeObject("categoria",e.target.value)}} name="" id="categoria">
            {data.categories.map((e)=>{return <option value={e}>{e}</option>})}
            </select> <br />
            <label><input type="radio" name="tipo" id="fixo" onChange={()=>{setType("fixo")}} checked={type === "fixo"}/> Fixo </label> <br />
            <label><input type="radio" name="tipo" id="variavel" onChange={()=>{setType("variavel")}} checked={type === "variavel"}/> Variável </label> <br />
            <button>submit</button>
        </form>
        </>
    );
}

const newExpanse={ 
    "nome" : "", "valor":0,"data":"","descricao":"","categoria":"Sem categoria"
}
function changeObject(atributo,valor){
    newExpanse[atributo]=valor;
}