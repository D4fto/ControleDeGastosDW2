import { useState } from 'react'
import NewExpanse from './newExpanse'
import ExpansesList from './ExpansesList'
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
    expanses: {
      fixo: [],
      variavel: []
    },
    categorias: ["Essenciais","Lazer","Inesperado", "shit", "FDS"]
  }
  localStorage.setItem("data", JSON.stringify(data))
}

function updateDataStorage(data){
  localStorage.setItem("data", JSON.stringify(data))
}

function App() {
  const [valorBit, setvalorBit] = useState(0)
  const [data, setData] = useState(()=>JSON.parse(localStorage.getItem("data")))
  if(!searchBTC){
    bitcoin(setvalorBit)
    searchBTC = setInterval(()=>{bitcoin(setvalorBit)},60000)
  }
  return (
    <>
    <NewExpanse data={data} setData={setData} updateDataStorage={updateDataStorage}/>
    <ExpansesList data={data}/>
    <p>Preço do BitCoin brasileiro: R$ {valorBit}</p>
    </>
  )
}

export default App
