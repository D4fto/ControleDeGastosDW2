import Expanse from "./Expanse"
export default function ExpansesList({data}){
    console.log(data)
    return(
        <>
        <ul>
            {data.expanses.map((e)=>{
                return <Expanse data={e.data} categoria={e.categoria} descricao={e.descricao} nome={e.nome} valor={e.valor}/>
            })}
        </ul>
        </>
    )

}