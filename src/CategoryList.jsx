export default function CategoryList({data}){
    const pin = {}
    for (const element of data.categories) {
        pin[element]=[]
    }
    for (const key in data.expanses.fixo) {
        if (key!="maxId") {
            const element = data.expanses.fixo[key];
            pin[element.categoria].push({"nome":element.nome,"valor":element.valor})
            
        }
    }
    for (const key in data.expanses.variavel) {
        if (key!="maxId") {
            const element = data.expanses.variavel[key];
            pin[element.categoria].push({"nome":element.nome,"valor":element.valor})
            
        }
    }
    for (const element of data.categories) {
        pin[element].sort((a,b)=>parseInt(b.valor)-parseInt(a.valor))
    }
    return(
        <div>
            <h1>Categorias</h1>
            <div>
                {data.categories.map((e)=>{
                    return(
                        <div>
                            <h4>{e}</h4>
                            <ul>
                                {pin[e].map((t)=>(
                                <li>
                                    <p>{t.nome} - {t.valor}</p>
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