import "./CategoryList.css";
export default function CategoryList({data}){
    const pin = {}
    const values = {}
    for (const element of data.categories) {
        pin[element]=[]
        values[element]=0
    }
    for (const key in data.expanses.fixo) {
        if (key!="maxId") {
            const element = data.expanses.fixo[key];
            pin[element.categoria].push({"nome":element.nome,"valor":element.valor})
            values[element.categoria]+=parseInt(element.valor)
        }
    }
    for (const key in data.expanses.variavel) {
        if (key!="maxId") {
            const element = data.expanses.variavel[key];
            pin[element.categoria].push({"nome":element.nome,"valor":element.valor})
            values[element.categoria]+=parseInt(element.valor)
            
        }
    }
    for (const element of data.categories) {
        pin[element].sort((a,b)=>parseInt(b.valor)-parseInt(a.valor))
    }
    return(
        <div>
            <h1 className="h1Categoria">Categorias</h1>
            <div className="CaixaCategoria">
                {data.categories.map((e)=>{
                    return(
                        <div>
                            <div className="flex Categoria">
                                <h4>{e} - R$ {String(values[e]).padStart(3, "0").substring(0, String(values[e]).padStart(3, "0").length - 2)},{String(values[e]).padStart(3, "0").substring(String(values[e]).padStart(3, "0").length - 2)}<i className="bi bi-trash3-fill"></i></h4>
                                <i className="bi bi-caret-down-fill"></i>
                            </div>
                            <ul>
                                {pin[e].map((t)=>(
                                <li>
                                    <p>{t.nome} - R$ {String(t.valor).padStart(3, "0").substring(0, String(t.valor).padStart(3, "0").length - 2)},{String(t.valor).padStart(3, "0").substring(String(t.valor).padStart(3, "0").length - 2)}</p>
                                </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}