import Expanse from "./Expanse"
export default function ExpansesList({data}){
    console.log(data)
    return(
        <>
        <h1>Fixo</h1>
        <ul>
            {data.expanses.fixo.map((e)=>{
                return <Expanse data={e.data} categoria={e.categoria} descricao={e.descricao} nome={e.nome} valor={e.valor}/>
            })}
        </ul>
        <h1>Variável</h1>
        <ul>
            {data.expanses.variavel.map((e)=>{
                return <Expanse data={e.data} categoria={e.categoria} descricao={e.descricao} nome={e.nome} valor={e.valor}/>
            })}
        </ul>
        </>
    )

}