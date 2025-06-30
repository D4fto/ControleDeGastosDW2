export default function Group({nome, descricao, valor, list}){
    return(<li className="Grupo">
        <div className="NamePrice">
            <p><i className="bi bi-folder2"></i> {nome}</p> <p>R$ {String(valor).padStart(3,"0").substring(0,String(valor).padStart(3,"0").length-2)},{String(valor).padStart(3,"0").substring(String(valor).padStart(3,"0").length-2)}</p>
        </div>
        <div className="Descricao">{descricao}</div>
        <ul className="Lista ListaGrupo">
            {list}
        </ul>
    </li>)
}