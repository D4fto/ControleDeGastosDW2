export default function bitcoin(setvalorBit){
    const bit = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl'
    fetch(bit)
    .then(response => response.json())
    .then(data => {
        setvalorBit(data.bitcoin.brl);
        console.log(data.bitcoin.brl)
    })
    .catch(error => {
        console.error('Erro ao buscar o preço do Bitcoin:', error);
    });
}