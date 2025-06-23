import Expanse from "./Expanse"
export default function ExpansesList({data}){
    console.log(data)
    return(
        <>
        <ul>
            {data.expanses.map((e)=>{
                return <Expanse nome={e.nome} valor={e.valor}/>
            })}
        </ul>
        </>
    )

}