import "./PopUp.css"
import "./NewCategory.css"

export default function NewCategory({data, setData, setControl}){
    let categoria = ""
    function adicionarCategoria(e){
        e.preventDefault()
        const newData = {...data}
        newData.categories.push(categoria)
        setData(newData)
        setControl(false)
    }
    return(<div className="PopUp NovaCategoria novaCategoria">
        <button className="x" onClick={()=>{setControl(false)}}><i className="bi bi-x"></i></button>
        <h1>Nova Categoria</h1>
        <form onSubmit={adicionarCategoria} className="NovaCategoriaForm">
           <div className="Epaco">
             <input className="InputNovacategoria" type="text" name="category" id="category" onChange={(e)=>{
                if(data.categories.includes(e.target.value)){
                    e.target.setCustomValidity("Categoria já existe")
                    return
                }
                e.target.setCustomValidity("")
                categoria = e.target.value
                }} placeholder="Nome da categoria" required/>
            <button className="ButtonNovacategoria" >+</button>
           </div>
        </form>
    </div>
    )
}