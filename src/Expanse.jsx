export default function Expanse({nome, valor}){
    return(
        <li>
            <h1>{nome} - R$ {parseInt(valor).toFixed(2)}</h1>
        </li>
    )
}