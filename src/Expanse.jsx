export default function Expanse({nome, valor,descricao,categoria,data}){
    return(
        <li>
            <div className="NamePrice">
                <p>{nome}</p> <p>R$ {parseInt(valor).toFixed(2)}</p>
            </div>
            <div>{descricao}</div>
            <div>{categoria} | {data}</div>
        </li>
    )
}
