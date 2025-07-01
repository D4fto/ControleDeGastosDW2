import { useState, useEffect } from "react"
import PopUpButton from "./PopUpButton"
import ChooseGroup from "./ChooseGroup"


export default function NewGroup({data, setData, setControl}){
    const [group, setGroup] = useState("/")
    const [type, setType] = useState("fixo")
    useEffect(()=>{
        setGroup("/")
    }, [type])
    function adicionarGrupo(e){
        e.preventDefault()
    }
    return(<div className="popUp novoGrupo">
        <button onClick={()=>{setControl(false)}}><i className="bi bi-x"></i></button>
        <h1>Novo Grupo</h1>
        <form onSubmit={adicionarGrupo}>
            <input type="text" name="nome" id="nome" placeholder="Nome do grupo" required/><br />
            <textarea name="descricao" id="descricao"></textarea><br />
            <PopUpButton id="local" title={group} PopUp={ChooseGroup} props={{data: data, setData: setData, type:type, group: group, setGroup: setGroup}}/><br />
            <label><input type="radio" name="tipo" id="fixo" onChange={()=>{setType("fixo")}} checked={type === "fixo"}/> Fixo </label>
            <label><input type="radio" name="tipo" id="variavel" onChange={()=>{setType("variavel")}} checked={type === "variavel"}/> Variável </label> <br />
            <button>+</button>
        </form>
    </div>
    )
}