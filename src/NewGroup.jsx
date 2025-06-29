export default function NewGroup({data, setData, setControl}){
    function adicionarGrupo(e){
        e.preventDefault()
    }
    return(<div className="popUp novoGrupo">
        <button onClick={()=>{setControl(false)}}><i className="bi bi-x"></i></button>
        <h1>Novo Grupo</h1>
        <form onSubmit={adicionarGrupo}>
            <input type="text" name="nome" id="nome"placeholder="Nome do grupo"/>
            <button>+</button>
        </form>
    </div>
    )
}