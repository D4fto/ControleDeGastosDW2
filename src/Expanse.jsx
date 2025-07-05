import { useState } from "react"
export default function Expanse({ nome, valor, descricao, categoria, data, setData}) {
    const [opened, setOpened] = useState(false)
    return (
        <li className="Despesa">
            <div className="NomePreco">
                <p>{nome}</p>
                <div className="flex">
                    <p>R$ {String(valor).padStart(3, "0").substring(0, String(valor).padStart(3, "0").length - 2)},{String(valor).padStart(3, "0").substring(String(valor).padStart(3, "0").length - 2)}</p>
                    <i class={"bi bi-caret-down-fill arrowOpen" + (opened ? " flip-v" : "")} onClick={() => setOpened(!opened)}></i>
                </div>
            </div>
            <div className={"AbreFecha" + (!opened ? " Fechado" : "")}>
                <div className="OverflowHidden">
                    <div className="Descricao">{descricao}</div>
                    <div className="CardBottom flex space-between">
                        <div className="CategoriaData">{categoria} | {data}</div>
                        <div className="LapisLixeira">
                            <i class="bi bi-pencil-fill"></i>
                            <i class="bi bi-trash3-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
