import Expanse from "./Expanse"
export default function ExpansesList({data}){
    function createExpansesList(type){
        return Object.entries(data.expanses[type]).sort((a, b)=>{
            if(a[0]=="maxId"){
                return -1
            }
            if(b[0]=="maxId"){
                return 1
            }
            return(parseInt(b[1].valor)-parseInt(a[1].valor))
        }).map((k)=>{
            if(k[0]=="maxId"){
                return;
            }
            let e = k[1]
            return <Expanse data={e.data} categoria={e.categoria} descricao={e.descricao} nome={e.nome} valor={e.valor}/>
        })
    }
    console.log(data)
    return(
        <>
        <h1>Fixo</h1>
        <ul>
            {
            createExpansesList("fixo")
        }
        </ul>
        <h1>Variável</h1>
        <ul>
        {
            createExpansesList("variavel")
            }
        </ul>
        </>
    )

}