import Expanse from "./Expanse"
import Group from "./Group"


function handleInRoot(inRoot, type){
    let newArr = []
    for (const element of inRoot) {
        if(element.includes(type)){
            newArr.push(element.substring(type.length))
        }
    }
    return newArr
}
function createExpansesList2(expIdArray, expanses, groupArray){
    let elements = []
    let expansesArray = []
    let expPointer = 0
    let groupPointer = 0
    for (const element of expIdArray) {
        expansesArray.push(expanses[element])
    }
    expansesArray.sort((a, b) => parseInt(b.valor)-parseInt(a.valor))
    groupArray.sort((a, b) => b.valor-a.valor)
    while(expPointer<expansesArray.length || groupPointer<groupArray.length){
        if(expPointer<expansesArray.length&&groupPointer<groupArray.length){
            if(parseInt(expansesArray[expPointer].valor)>groupArray[groupPointer].valor){
                let e = expansesArray[expPointer]
                elements.push(<Expanse key={expPointer} data={e.data} categoria={e.categoria} descricao={e.descricao} nome={e.nome} valor={e.valor}/>)
                expPointer++
                continue
            }
            let e = groupArray[groupPointer]
            elements.push(<Group key={groupPointer+expansesArray.length} nome={e.nome} descricao={e.descricao} valor={e.valor} list={createExpansesList2(e.children.expanses, expanses, e.children.groups)}/>)
            groupPointer++
            continue
        }
        if(expPointer<expansesArray.length){
            let e = expansesArray[expPointer]
            elements.push(<Expanse key={expPointer} data={e.data} categoria={e.categoria} descricao={e.descricao} nome={e.nome} valor={e.valor}/>)
            expPointer++
            continue
        }
        let e = groupArray[groupPointer]
        elements.push(<Group key={groupPointer+expansesArray.length} nome={e.nome} descricao={e.descricao} valor={e.valor} list={createExpansesList2(e.children.expanses, expanses, e.children.groups)}/>)
        groupPointer++
        continue
    }

    return <div>{elements}</div>
}
export default function ExpansesList({data}){
    
    
    
    
    console.log(data)
    return(
        <div className="ListaDespesas">
            <h1>Despesas</h1>
            <h1 className="Tipo">Fixo</h1>
            <ul className="Lista">
                {
                createExpansesList2(handleInRoot(data.expanses.inRoot, "fixo"), data.expanses.fixo, data.groups.fixo)
                }
            </ul>
            <h1 className="Tipo">Variável</h1>
            <ul className="Lista">
            {
                createExpansesList2(handleInRoot(data.expanses.inRoot, "variavel"), data.expanses.variavel, data.groups.variavel)
                }
            </ul>
        </div>
    )

}