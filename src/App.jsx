import { useEffect, useState } from 'react'
import NewExpanse from './newExpanse'
import ExpansesList from './ExpansesList'
import	NewCategory from './NewCategory'
import PopUpButton from './PopUpButton'
import NewGroup from './NewGroup'
import ChooseGroup from './ChooseGroup'
import './App.css'
import bitcoin from './bitcoin'

function limpaLocal(){
  localStorage.setItem("data","")
}
limpaLocal()
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
          valor: 0,
          children: {
            groups: [
              {
                nome: "Carros",
                descricao: "Descrição",
                valor: 0,
                children: {
                  groups: [],
                  expanses: []
                }
              },
              {
                nome: "Motos",
                descricao: "Descrição",
                valor: 0,
                children: {
                  groups: [],
                  expanses: []
                }
              },
            ],
            expanses: []
          }
        },
      ],
      variavel: []
    },
    expanses: {
      inRoot: [],
      fixo: {"maxId":0},
      variavel: {"maxId":0}
    },
    categories: ["Sem categoria", "jkfdbfd", "kldfhfion"]
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
  // if(!searchBTC){
  //   bitcoin(setvalorBit)
  //   searchBTC = setInterval(()=>{bitcoin(setvalorBit)},60000)
  // }
  return (
    <>
    <NewExpanse data={data} setData={setData}/>
    <div>
      <PopUpButton title={"Categoria"} icon={<i className="bi bi-bookmark"></i>} PopUp={NewCategory} props={{data: data, setData: setData}}/>
    </div>
    <div>
      <PopUpButton title={"Grupo"} icon={<i class="bi bi-folder-plus"></i>} PopUp={NewGroup} props={{data: data, setData: setData}}/>
    </div>
    <ExpansesList data={data}/>
    <p>Preço do BitCoin brasileiro: R$ {valorBit}</p>
    </>
  )
}

export default App
