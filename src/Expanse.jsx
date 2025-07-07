import { useState } from "react"
export default function Expanse({ id, type,  nome, valor, descricao, categoria, date, setData, data, setEditingTask}) {
    const [opened, setOpened] = useState(false)

    function deleteExpanse(){
      
        const newData = {...data}
  
        let address
        if(newData.expanses.inRoot.includes(type+id)){
            newData.expanses.inRoot = newData.expanses.inRoot.filter((x)=>x!=type+id)
        }else{
            address = findAddressAndRemove(newData.groups[type], "/")
            updateValues(address.substring(1, address.length - 1).split("/"), newData.groups[type])
        }
        newData.expanses[type][id].active=false
        setData(newData)

        
    }
    function updateValues(address, groupList){
        for (const element of groupList) {
            if(element.nome == address[0]){
                element.valor-=valor
                address.shift()
                updateValues(address, element.children.groups)
                return
            }

        }
    }
    
    function findAddressAndRemove(groupList, address){
        for (const element of groupList) {
            if(element.children.expanses.includes(id)){
                element.children.expanses = element.children.expanses.filter((x)=>x!=id)
                return (address + element.nome + "/")
            }
            let x = findAddressAndRemove(element.children.groups, address + element.nome + "/")
            if(x){
                return x
            }
        }
        return false
    }
    
    return (
        <li className="Despesa">
            <div className="NomePreco">
                <p>{nome}</p>
                <div className="flex">
                    <p>{(parseInt(valor)/100).toLocaleString("pt-BR", {style: "currency",currency: "BRL",minimumFractionDigits: 2})}</p>
                    <i className={"bi bi-caret-down-fill arrowOpen" + (opened ? " flip-v" : "")} onClick={() => setOpened(!opened)}></i>
                </div>
            </div>
            <div className={"AbreFecha" + (!opened ? " Fechado" : "")}>
                <div className="OverflowHidden">
                    <div className="Descricao">{descricao}</div>
                    <div className="CardBottom flex space-between">
                        <div className="CategoriaData">{categoria} | {date}</div>
                        <div className="LapisLixeira">
                            <i className="bi bi-pencil-fill" onClick={()=>{
                                setEditingTask({
                                    id: id,
                                    nome: nome,
                                    valor: valor,
                                    tipo: type,
                                    descricao: descricao,
                                    categoria: categoria, 
                                    data: date,
                                    address: "/"
                                })
                            }}></i>
                            <i className="bi bi-trash3-fill" onClick={deleteExpanse}></i>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
