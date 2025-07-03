export default function SaveMonth({data, setData}){
    function save(){
        const newData = {...data}
        const date = new Date()
        const expanses = []
        const categoryHashMap = {}
        let total = 0

        for (const element of newData.categories) {
            categoryHashMap[element]=0
        }

        for (const key in newData.expanses.fixo) {
            if (key!="maxId") {
                const element = newData.expanses.fixo[key];
                expanses.push([element.nome, parseInt(element.valor)])
                categoryHashMap[element.categoria]+=parseInt(element.valor)
                total+=parseInt(element.valor)
            }
        }
        for (const key in newData.expanses.variavel) {
            if (key!="maxId") {
                const element = newData.expanses.variavel[key];
                expanses.push([element.nome, parseInt(element.valor)])
                categoryHashMap[element.categoria]+=parseInt(element.valor)
                total+=parseInt(element.valor)
            }
        }
        expanses.sort((a,b)=>{
            return b[1]-a[1]
        })

        newData.storage[`${date.getMonth()}/01/${date.getFullYear()}`] = {
            total: total,
            categoryMap: categoryHashMap,
            expanses: expanses
        }
        setData(newData)
    }
    return(<>
        <button onClick={save}>SALVAR MÊS</button>
    </>)
}