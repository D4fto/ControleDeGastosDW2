import "./CategoryList.css";
import { useState } from "react";
export default function CategoryList({data, setData}){
    const [abertos, setAbertos] = useState({});
    function toggleCategoria(categoria) {
        setAbertos(x => ({ ...x, [categoria]: !x[categoria] }));
    }
    function excluiCategoria(nomeCategoria){
        if(nomeCategoria=="Sem categoria"){
            return
        }
        const newData= {...data}
        for (const key in newData.expanses.fixo) {
        if (key!="maxId") {
            const element = newData.expanses.fixo[key];
            if (element.categoria == nomeCategoria){
                element.categoria="Sem categoria"
            }
            }
        }
        for (const key in newData.expanses.variavel) {
            if (key!="maxId") {
                const element = newData.expanses.variavel[key];
            if (element.categoria == nomeCategoria){
                element.categoria="Sem categoria"
                } 
                }
            }

        newData.categories=newData.categories.filter((y)=>y!=nomeCategoria)
        setData(newData)
    }
    const pin = {}
    const values = {}
    for (const element of data.categories) {
        pin[element]=[]
        values[element]=0
    }
    for (const key in data.expanses.fixo) {
        if (key!="maxId") {
            const element = data.expanses.fixo[key];
            if(element.active){

                pin[element.categoria].push({"nome":element.nome,"valor":element.valor})
                values[element.categoria]+=parseInt(element.valor)
            }
        }
    }
    for (const key in data.expanses.variavel) {
        if (key!="maxId") {
            const element = data.expanses.variavel[key];
            if(element.active){
                pin[element.categoria].push({"nome":element.nome,"valor":element.valor})
                values[element.categoria]+=parseInt(element.valor)

            }
            
        }
    }
    for (const element of data.categories) {
        pin[element].sort((a,b)=>parseInt(b.valor)-parseInt(a.valor))
    }
    return(
        <div className="ListaCategoria">
            <h1 className="h1Categoria">Categorias</h1>
            <div className="CaixaCategoria">
                {data.categories.map((e, i)=>{
                    const isOpen = abertos[e] || false;
                    return(
                        <div key={i}>
                            <div className="flex Categoria">
                                <h4>{e} - {(values[e]/100).toLocaleString("pt-BR", {style: "currency",currency: "BRL",minimumFractionDigits: 2})}{e!="Sem categoria"?<i onClick={(no)=>excluiCategoria(e)} className="bi bi-trash3-fill torto"></i>:<></>}</h4>
                                <i className={"bi bi-caret-down-fill"+(isOpen?" Aberto":"")} onClick={() => toggleCategoria(e)}></i>
                            </div>
                            <div className={"UlCategoria"+(isOpen?" Aberto":"")}>
                                <ul>
                                {pin[e].map((t, k)=>(
                                <li key={k}>
                                    <p>{t.nome} - {(parseInt(t.valor)/100).toLocaleString("pt-BR", {style: "currency",currency: "BRL",minimumFractionDigits: 2})}</p>
                                </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}