import { useState } from 'react'
import NewExpanse from './newExpanse'
import ExpansesList from './ExpansesList'
import './App.css'

function limpaLocal(){
  localStorage.setItem("data","")
}
limpaLocal()
if(!localStorage.getItem("data")){
  initializeData()
}

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
  const [data, setData] = useState(()=>JSON.parse(localStorage.getItem("data")))
  return (
    <>
    <NewExpanse data={data} setData={setData} updateDataStorage={updateDataStorage}/>
    <ExpansesList data={data}/>
    </>
  )
}

export default App
