import { useState, useEffect } from "react"
import PopUpButton from "./PopUpButton"
import ChooseGroup from "./ChooseGroup"
import "./PopUp.css"


function verifyDisponibility(group, nome, modifier){
  let x = false
  for (const element of group.children.groups) {
    if(element.nome==nome+(modifier>0?modifier:"")){
      x=true 
      modifier++
    }
  }
  if(x){
    return verifyDisponibility(group, nome, modifier)
  }
  return modifier
}

function findGroupToAdd(address, groups, nome, descricao, originalAddress) {
    for (const element of groups) {
      if (element.nome == address[0]) {
        address.shift();
        addIdToGroup(address, element, nome, descricao, originalAddress);
        return;
      }
    }
    console.error(address);
    console.error(`Grupo não encontrado`);
}
function addIdToGroup(address, group, nome, descricao, originalAddress) {
    if (!address.length) {
      let modifier = verifyDisponibility(group, nome, 0)
        group.children.groups.push({
            nome: nome+(modifier?modifier:""),
            descricao: descricao,
            valor: 0,
            children: {
            groups: [],
            expanses: [],
          },
          address: originalAddress
        });
      return;
    }
    findGroupToAdd(address, group.children.groups, nome, descricao, originalAddress);
  }

export default function NewGroup({data, setData, setControl}){
    const [group, setGroup] = useState("/")
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [type, setType] = useState("fixo")


    useEffect(()=>{
        setGroup("/")
    }, [type])
    function adicionarGrupo(e){
        e.preventDefault()
        const newData = { ...data };

        if (group === "/") {
          newData.groups[type].push({
            nome: nome,
            descricao: descricao,
            valor: 0,
            children: {
              groups: [],
              expanses: [],
            },
            address: "/"
        });
        } else {
          findGroupToAdd(
            group.substring(1, group.length - 1).split("/"),
            newData.groups[type],
            nome,
            descricao,
            group
          );
        }
        setData(newData);
        setControl(false);
    }

    return(<div className="PopUp novoGrupo">
        <button onClick={()=>{setControl(false)}}><i className="bi bi-x"></i></button>
        <h1>Novo Grupo</h1>
        <form onSubmit={adicionarGrupo}>
            <input type="text" name="nome" id="nome" placeholder="Nome do grupo" onChange={(e)=>{setNome(e.target.value)}} required/><br />
            <textarea name="descricao" id="descricao" onChange={(e)=>{setDescricao(e.target.value)}} value={descricao}></textarea><br />
            <PopUpButton id="local" title={group} PopUp={ChooseGroup} props={{data: data, setData: setData, type:type, group: group, setGroup: setGroup}}/><br />
            <label><input type="radio" name="tipo" id="fixo" onChange={()=>{setType("fixo")}} checked={type === "fixo"}/> Fixo </label>
            <label><input type="radio" name="tipo" id="variavel" onChange={()=>{setType("variavel")}} checked={type === "variavel"}/> Variável </label> <br />
            <button disabled={nome===""} style={{cursor: nome===""?"unset":""}}>+</button>
        </form>
    </div>
    )
}