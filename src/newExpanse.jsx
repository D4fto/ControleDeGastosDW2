import { useState, useEffect } from "react";
import ChooseGroup from "./ChooseGroup";
import PopUpButton from "./PopUpButton";
import "./NewExpanse.css";

function findGroupToAdd(address, groups, id, value) {
  for (const element of groups) {
    if (element.nome == address[0]) {
      address.shift();
      addIdToGroup(address, element, id, value);
      return;
    }
  }
  console.error(address);
  console.error(`Grupo não encontrado`);
}
function addIdToGroup(address, group, id, value) {
  group.valor += value;
  if (!address.length) {
    group.children.expanses.push(id);
    return;
  }
  findGroupToAdd(address, group.children.groups, id, value);
}
export default function NewExpanse({ data, setData, setVariavel }) {
  const [group, setGroup] = useState("/");
  const [type, setType] = useState("fixo");
  const [valorFormatado, setValorFormatado] = useState("R$ 0,00");


  useEffect(() => {
    setGroup("/");
  }, [type]);

  function send(event) {
    event.preventDefault();
    if(!newExpanse.data || !newExpanse.nome || !newExpanse.valor){
      return
    }
    const newData = { ...data };

    let id = newData.expanses[type].maxId + 1;
    newData.expanses[type].maxId = id;
    newExpanse.id = id
    newExpanse.tipo = type
    newData.expanses[type][id] = { ...newExpanse };
    if (group === "/") {
      newData.expanses.inRoot.push(type + id);
    } else {
      findGroupToAdd(
        group.substring(1, group.length - 1).split("/"),
        newData.groups[type],
        id,
        newExpanse.valor
      );
    }
    setData(newData);
    setVariavel("despesas");
  }
  return (
    <div className="NovaDespesa">
      <h1>Nova Despesa</h1>
      <div className="Caixa">
        <form className="Form" onSubmit={send} action="">
          <label htmlFor="nome">Nome: </label>
          
          <input className="DNome"
            onChange={(e) => {
              changeObject("nome", e.target.value);
            }}
            id="nome"
            type="text"
            placeholder="Nome"
            required
          />{" "}
          <label htmlFor="valor">Valor:</label>
          <input
          className="DValor"
          id="valor"
          type="text"
          inputMode="numeric"
          placeholder="R$ 0,00"
          value={valorFormatado}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            const centavos = parseInt(raw || "0", 10);
            const formatado = (centavos / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
            setValorFormatado(formatado);
            changeObject("valor", centavos); // armazena em centavos
          }}
          required
        />
          
          <label htmlFor="descricao">Descrição: </label>
          
          <textarea className="DCaixa"
            onChange={(e) => {
              changeObject("descricao", e.target.value);
            }}
            name=""
            id="descricao"
            placeholder="Descrição legal"
          ></textarea>{" "}
          
          <div className="ParenteBarra"style={{ position: "relative"}}>
            <label>Local: </label>
            <PopUpButton
              id="local"
              title={group}
              PopUp={ChooseGroup}
              above={true}
              props={{
                data: data,
                setData: setData,
                type: type,
                group: group,
                setGroup: setGroup,
                withNew: true
              }}
            />
            
          </div>
         <div className="Alinhamento">
           <div className="DataCategoria flex">
            <div className="flex">
              <label htmlFor="data">Data: </label>
            <input
              onChange={(e) => {
                changeObject("data", e.target.value);
              }}
              id="data"
              type="date"
              required
            />{" "}
            </div>
            
            <div className="DCategoria flex">
              <label htmlFor="categoria">Categoria: </label>
              <select
                onChange={(e) => {
                  changeObject("categoria", e.target.value);
                }}
                name=""
                id="categoria"
              >
                {data.categories.map((e, k) => {
                  return (
                    <option key={k} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
         </div>
          <div className="TipoSubmit">
            <label>
              <input
                type="radio"
                name="tipo"
                id="fixo"
                onChange={() => {
                  setType("fixo");
                }}
                checked={type === "fixo"}
              />{" "}
              Fixo{" "}
            </label>
            <label>
              <input
                type="radio"
                name="tipo"
                id="variavel"
                onChange={() => {
                  setType("variavel");
                }}
                checked={type === "variavel"}
              />{" "}
              Variável{" "}
            </label>{" "}
            
            <button>ADICIONAR DESPESA</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const newExpanse = {
  id: 0,
  nome: "",
  valor: 0,
  data: "",
  descricao: "",
  categoria: "Sem categoria",
  tipo: "",
  active: true
};
function changeObject(atributo, valor) {
  newExpanse[atributo] = valor;
}
