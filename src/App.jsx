import { useEffect, useState } from 'react'
import NewExpanse from './newExpanse'
import ExpansesList from './ExpansesList'
import	NewCategory from './NewCategory'
import PopUpButton from './PopUpButton'
import NewGroup from './NewGroup'
import './App.css'
import bitcoin from './bitcoin'

function limpaLocal(){
  localStorage.setItem("data","")
}
// limpaLocal()
if(!localStorage.getItem("data")){
  initializeData()
}
let searchBTC

function initializeData(){
  const data = {
    groups : {
      fixo: [
        {
          nome: "Seguros",
          descricao: "Descrição",
          valor: 1200+5986+41287,
          children: {
            groups: [
              {
                nome: "Carros",
                descricao: "Descrição",
                valor: 5986,
                children: {
                  groups: [],
                  expanses: [2]
                }
              },
              {
                nome: "Motos",
                descricao: "Descrição",
                valor: 41287,
                children: {
                  groups: [],
                  expanses: [3]
                }
              },
            ],
            expanses: [4]
          }
        },
      ],
      variavel: [
        {
          nome: "Alimentação",
          descricao: "Descrição",
          valor: 51232+10000,
          children: {
            groups: [],
            expanses: [1,2]
          }
        }
      ]
    },
    expanses: {
      inRoot: ["fixo1", "variavel3"],
      fixo: {"maxId":4,
        1: {
          "nome": "Aluguel",
          "valor": "84767",
          "data": "2025-06-11",
          "descricao": "Valor aluguel",
          "categoria": "Essenciais"
        },
        2: {
          "nome": "Palio",
          "valor": "5986",
          "data": "2025-06-11",
          "descricao": "Seguro do palio",
          "categoria": "Essenciais"
        },
        3: {
          "nome": "Yamaha MT-09",
          "valor": "41287",
          "data": "2025-06-11",
          "descricao": "Seguro da Yamaha MT-09",
          "categoria": "Essenciais"
        },
        4: {
          "nome": "Celular",
          "valor": "1200",
          "data": "2025-06-11",
          "descricao": "Seguro do celular kkkkkk",
          "categoria": "Essenciais"
        },
      },
      variavel: {"maxId":3, 
        1: {
          "nome": "Mercado",
          "valor": "51232",
          "data": "2025-06-11",
          "descricao": "Compra no mercado",
          "categoria": "Essenciais"
        },
        2: {
          "nome": "Cantina",
          "valor": "10000",
          "data": "2025-06-11",
          "descricao": "Compra na cantina",
          "categoria": "Essenciais"
        },
        3: {
          "nome": "Transporte",
          "valor": "18514",
          "data": "2025-06-11",
          "descricao": "Gasto em transporte",
          "categoria": "Essenciais"
        }
      }
    },
    categories: ["Sem categoria", "Essenciais", "Lazer"]
  }
  localStorage.setItem("data", JSON.stringify(data))
}

function updateDataStorage(data){
  localStorage.setItem("data", JSON.stringify(data))
}

function App() {
  const [valorBit, setvalorBit] = useState(0)
  const [data, setData] = useState(()=>JSON.parse(localStorage.getItem("data")))
  useEffect(()=>{
    updateDataStorage(data)
  },[data])
  if(!searchBTC){
    bitcoin(setvalorBit)
    searchBTC = setInterval(()=>{bitcoin(setvalorBit)},60000)
  }
  return (
    <>
    <NewExpanse data={data} setData={setData}/>
    <div>
      <PopUpButton title={"Categoria"} icon={<i className="bi bi-bookmark"></i>} PopUp={NewCategory} props={{data: data, setData: setData}}/>
    </div>
    <div>
      <PopUpButton title={"Grupo"} icon={<i className="bi bi-folder-plus"></i>} PopUp={NewGroup} props={{data: data, setData: setData}}/>
    </div>
    <ExpansesList data={data}/>
    <p>Preço do BitCoin brasileiro: R$ {valorBit}</p>
    </>
  )
}

export default App
