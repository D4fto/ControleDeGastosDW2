import { useState, useEffect } from "react"
import PopUpButton from "./PopUpButton"
import ChooseGroup from "./ChooseGroup"
import "./PopUp.css"


function findGroupToAdd(address, groups, nome, descricao) {
    for (const element of groups) {
      if (element.nome == address[0]) {
        address.shift();
        addIdToGroup(address, element, nome, descricao);
        return;
      }
    }
    console.error(address);
    console.error(`Grupo não encontrado`);
}
function addIdToGroup(address, group, nome, descricao) {
    if (!address.length) {
        group.children.groups.push({
            nome: nome,
            descricao: descricao,
            valor: 0,
            children: {
            groups: [],
            expanses: [],
            },
        });
      return;
    }
    findGroupToAdd(address, group.children.groups, nome, descricao);
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
        });
        } else {
          findGroupToAdd(
            group.substring(1, group.length - 1).split("/"),
            newData.groups[type],
            nome,
            descricao
          );
        }
        setData(newData);
        setControl(false);
    }
    function verifySend(){

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