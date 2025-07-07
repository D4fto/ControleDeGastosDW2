import { useState } from "react"
import PopUpButton from "./PopUpButton"
import EditGroup from "./EditGroup"

export default function Group({nome, descricao, valor, list, data, setData, type, address}){
    const [opened, setOpened] = useState(false)

    function deleteGroup(){
        const newData = { ...data }
        let adr = []
        if(address!="/"){
            adr = address.substring(1, address.length - 1).split("/")
            findGroup(adr, newData.groups[type])
        }else{
            let x
            for (let i = 0; i < newData.groups[type].length; i++) {
                const element = newData.groups[type][i];
                if(element.nome == nome){
                    for (const id of element.children.expanses) {
                        newData.expanses[type][id].active=false
                    }
                    inactiveAllExpanses(element.children.groups)
                    x=i
                    break
                }
            }
            newData.groups[type].splice(x,1)
        }

        setData(newData)
        function inactiveAllExpanses(groupList){
            for (const element of groupList) {
                for (const id of element.children.expanses) {
                    newData.expanses[type][id].active=false
                }
                inactiveAllExpanses(element.children.groups)
            }
        }
        
        function searchAndDelete(adr, group, i){
            if(adr.length==0){
                group.children.groups = group.children.groups.filter((x)=>{
                    if(x.nome==nome){
                        group.valor-=x.valor
                        for (const id of x.children.expanses) {
                            newData.expanses[type][id].active=false
                        }
                        inactiveAllExpanses(x.children.groups)
                        return false
                    }
                    return true
                    
                })
                
                return
            }
            findGroup(adr, group.children.groups)
    }
    function findGroup(adr, groupList){
        let group
        for (let i = 0; i < groupList.length; i++) {
            const element = groupList[i];
            
            if(element.nome==adr[0]){
                group=element
                break
            }
        }
        adr.shift()
        return searchAndDelete(adr, group, groupList)
    }
    }

    return(<li className="Grupo">
        <div className="NomePreco NomePrecoGrupo">
            <p>
                <i className="bi bi-folder2"></i> {nome}</p> 
                <div className="flex">
                <p>{(valor/100).toLocaleString("pt-BR", {style: "currency",currency: "BRL",minimumFractionDigits: 2})}</p>
                    <i className={"bi bi-caret-down-fill arrowOpen"+ (opened?" flip-v":"")} onClick={() => setOpened(!opened)}></i>
                </div>
        </div>
        
        <div className={"AbreFecha" + (!opened?" Fechado":"")}>
            <div className="OverflowHidden">
                <div className="PaiDescricaoGrupo">
                    <div className="BordaDashed"></div>
                    <div className="CardBottom flex space-between">
                        <div className="DescricaoGrupo">{descricao}</div>
                        <div className="LapisLixeira">
                            <PopUpButton title={<i className="bi bi-pencil-fill"></i>} PopUp={EditGroup} portal={true} props={{ data: data, setData: setData, nomeOriginal: nome, descricaoOriginal: descricao, address: address, typeOriginal: type }}></PopUpButton>
                            <i className="bi bi-trash3-fill" onClick={()=>deleteGroup()}></i>
                        </div>
                    </div>
                </div>
                <ul className="Lista ListaGrupo">
                    {list}
                </ul>
            </div>
        </div>
    </li>)
}