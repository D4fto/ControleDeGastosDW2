import { useState } from "react"



export default function Group({nome, descricao, valor, list, data, setData}){
    const [opened, setOpened] = useState(false)


    return(<li className="Grupo">
        <div className="NomePreco NomePrecoGrupo">
            <p>
                <i className="bi bi-folder2"></i> {nome}</p> 
                <div className="flex">
                    <p>R$ {String(valor).padStart(3,"0").substring(0,String(valor).padStart(3,"0").length-2)},{String(valor).padStart(3,"0").substring(String(valor).padStart(3,"0").length-2)}</p>
                    <i class={"bi bi-caret-down-fill arrowOpen"+ (opened?" flip-v":"")} onClick={() => setOpened(!opened)}></i>
                </div>
        </div>
        
        <div className={"AbreFecha" + (!opened?" Fechado":"")}>
            <div className="OverflowHidden">
                <div className="PaiDescricaoGrupo">
                    <div className="BordaDashed"></div>
                    <div className="CardBottom flex space-between">
                        <div className="DescricaoGrupo">{descricao}</div>
                        <div className="LapisLixeira">
                            <i class="bi bi-pencil-fill"></i>
                            <i class="bi bi-trash3-fill"></i>
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