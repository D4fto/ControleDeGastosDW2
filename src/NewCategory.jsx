import "./PopUp.css"

export default function NewCategory({data, setData, setControl}){
    let categoria = ""
    function adicionarCategoria(e){
        e.preventDefault()
        const newData = {...data}
        newData.categories.push(categoria)
        setData(newData)
        setControl(false)
    }
    return(<div className="PopUp novaCategoria">
        <button onClick={()=>{setControl(false)}}><i className="bi bi-x"></i></button>
        <h1>Nova Categoria</h1>
        <form onSubmit={adicionarCategoria}>
            <input type="text" name="category" id="category" onChange={(e)=>{categoria = e.target.value}} placeholder="Nome da categoria" required/>
            <button>+</button>
        </form>
    </div>
    )
}