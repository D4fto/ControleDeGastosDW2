import { useEffect, useState } from "react";
import NewExpanse from "./newExpanse";
import ExpansesList from "./ExpansesList";
import NewCategory from "./NewCategory";
import PopUpButton from "./PopUpButton";
import CategoryList from "./CategoryList";
import Dashboard from "./Dashboard";
import NewGroup from "./NewGroup";
import Storage from "./storage";
import "./App.css";
import bitcoin from "./bitcoin";



function limpaLocal() {
  localStorage.setItem("data", "");
  localStorage.setItem("variavel", "")
}
limpaLocal();
if (!localStorage.getItem("data")) {
  initializeData();
}
if (!localStorage.getItem("variavel")) {
  localStorage.setItem("variavel", JSON.stringify("dashboard"))
}
let searchBTC;

function initializeData() {
  const data = {
    groups: {
      fixo: [
        {
          nome: "Seguros",
          descricao: "Descrição",
          valor: 1200 + 5986 + 41287,
          children: {
            groups: [
              {
                nome: "Carros",
                descricao: "Descrição",
                valor: 5986,
                children: {
                  groups: [],
                  expanses: [2],
                },
              },
              {
                nome: "Motos",
                descricao: "Descrição",
                valor: 41287,
                children: {
                  groups: [],
                  expanses: [3],
                },
              },
            ],
            expanses: [4],
          },
        },
      ],
      variavel: [
        {
          nome: "Alimentação",
          descricao: "Descrição",
          valor: 51232 + 10000,
          children: {
            groups: [],
            expanses: [1, 2],
          },
        },
      ],
    },
    expanses: {
      inRoot: ["fixo1", "variavel3"],
      fixo: {
        maxId: 4,
        1: {
          nome: "Aluguel",
          valor: "84767",
          data: "2025-06-11",
          descricao: "Valor aluguel",
          categoria: "Essenciais",
        },
        2: {
          nome: "Palio",
          valor: "5986",
          data: "2025-06-11",
          descricao: "Seguro do palio",
          categoria: "Essenciais",
        },
        3: {
          nome: "Yamaha MT-09",
          valor: "41287",
          data: "2025-06-11",
          descricao: "Seguro da Yamaha MT-09",
          categoria: "Essenciais",
        },
        4: {
          nome: "Celular",
          valor: "1200",
          data: "2025-06-11",
          descricao: "Seguro do celular kkkkkk",
          categoria: "Lazer",
        },
      },
      variavel: {
        maxId: 3,
        1: {
          nome: "Mercado",
          valor: "51232",
          data: "2025-06-11",
          descricao: "Compra no mercado",
          categoria: "Essenciais",
        },
        2: {
          nome: "Cantina",
          valor: "10000",
          data: "2025-06-11",
          descricao: "Compra na cantina",
          categoria: "Lazer",
        },
        3: {
          nome: "Transporte",
          valor: "18514",
          data: "2025-06-11",
          descricao: "Gasto em transporte",
          categoria: "Essenciais",
        },
      },
    },
    categories: ["Sem categoria", "Essenciais", "Lazer"],
    storage:Storage()
  };
  localStorage.setItem("data", JSON.stringify(data));
}

function updateDataStorage(name,data) {
  localStorage.setItem(name, JSON.stringify(data));
}

function App() {
  const [variavel, setvariavel] = useState(()=>JSON.parse(localStorage.getItem("variavel")));
  const [valorBit, setvalorBit] = useState(0);
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("data"))
  );
  useEffect(() => {
    updateDataStorage("data",data);
  }, [data]);
  useEffect(() => {
    updateDataStorage("variavel",variavel);
  }, [variavel]);
  // if (!searchBTC) {
  //   bitcoin(setvalorBit);
  //   searchBTC = setInterval(() => {
  //     bitcoin(setvalorBit);
  //   }, 60000);
  // }
  return (
    <>
      <nav className="MenuHorizontal">
        <h1 className="Titulo">Investec</h1>

        <div className="MenuHorizontal_DD">
          
          <button onClick={() => setvariavel("despesas")} className={["despesas", "novadespesa", "editardespesa"].includes(variavel)?"Underline":""}>Despesas</button>
          <button onClick={() => setvariavel("dashboard") } className={variavel=="dashboard"?"Underline":""}>Dashboard</button>
        </div>
      </nav>
      <div className="Conteudo">
        <ExpansesList data={data} setData={setData}/>
        <main>
          {variavel === "dashboard" && <>
            <Dashboard data={data} setData={setData}/>
          </>}
          {variavel === "despesas" && (
            <>
              <div className="flex VoDoNovo">
                <div className="PaiDoNovo">
                  <div className="Novo">
                    <h1>Novo</h1>
                    <div className="FilhoDoNovo">
                      <div className="NetoDoNovo">
                        <PopUpButton
                          title={"Grupo"}
                          icon={<i className="bi bi-folder-plus"></i>}
                          PopUp={NewGroup}
                          props={{ data: data, setData: setData }}
                        />
                      </div>
                      <div className="NetoDoNovo">
                        <button onClick={() => setvariavel("novadespesa")}>
                          <i class="bi bi-currency-dollar"></i>
                          Despesa
                        </button>
                      </div>
                      <div className="NetoDoNovo">
                        <PopUpButton
                          title={"Categoria"}
                          icon={<i className="bi bi-bookmark"></i>}
                          PopUp={NewCategory}
                          props={{ data: data, setData: setData }}
                        />
                      </div>
                    </div>
                  </div>
                  <CategoryList data={data}/>
                </div>
                <div>
                  <p>Preço do BitCoin brasileiro: R$ {valorBit}</p>
                  {/* <iframe src="https://marceloast.github.io/Trabalho-final-de-DW-Pedro-Eduardo-e-Marcelo-/" frameborder="0" style={{width: "600px", height: "800px"}}></iframe> */}
                </div>
              </div>
            </>
          )}
          {variavel === "novadespesa" && (
            <>
              <NewExpanse
                data={data}
                setData={setData}
                setVariavel={setvariavel}
              />
            </>
          )}
          {variavel === "editardespesa" && <></>}
        </main>
      </div>
    </>
  );
}

export default App;
