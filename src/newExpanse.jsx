export default function NewExpanse({data, setData, updateDataStorage}){
    function send(event){
        event.preventDefault()
        const newData = {...data}
        newData.expanses.push({...newExpanse})
        setData(newData)
        updateDataStorage(newData)
    }
    return(
        <>
        <form onSubmit={send} action="">
            <input onChange={(e)=>{changeObject("nome",e.target.value)}} id="nome" type="text" placeholder="Nome"/> <br />
            <input onChange={(e)=>{changeObject("valor",e.target.value)}} id="valor" type="number" placeholder="R$ 00.00"/> <br />
            <input onChange={(e)=>{changeObject("data",e.target.value)}} id="data" type="date" /> <br />
            <textarea onChange={(e)=>{changeObject("descricao",e.target.value)}} name="" id="descricao" placeholder="Descrição legal"></textarea> <br />
            <select onChange={(e)=>{changeObject("categoria",e.target.value)}} name="" id="categoria">
            <option value="0">Essenciais</option>
            <option value="1">Lazer</option>
            <option value="2">Inesperados</option>
            </select> <br />
            <label><input type="radio" name="tipo" id="fixo" onChange={(e)=>{changeObject("tipo",0)}} /> Fixo </label> <br />
            <label><input type="radio" name="tipo" id="variavel" onChange={(e)=>{changeObject("tipo",1)}} /> Variável </label> <br />
            <button>submit</button>
        </form>
        </>
    );
}

const newExpanse={ 
    "nome" : "", "valor":0,"data":"","descricao":"","categoria":"","tipo":""
}
function changeObject(atributo,valor){
    newExpanse[atributo]=valor;
}