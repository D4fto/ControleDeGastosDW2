export default function Expanse({nome, valor,descricao,categoria,data}){
    return(
        <li className="Despesa">
            <div className="NomePreco">
                <p>{nome}</p> <p>R$ {String(valor).padStart(3,"0").substring(0,String(valor).padStart(3,"0").length-2)},{String(valor).padStart(3,"0").substring(String(valor).padStart(3,"0").length-2)}</p>
            </div>
            <div className="Descricao">{descricao}</div>
            <div className="CategoriaData">{categoria} | {data}</div>
        </li>
    )
}
