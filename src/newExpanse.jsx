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

  useEffect(() => {
    setGroup("/");
  }, [type]);

  function send(event) {
    event.preventDefault();
    const newData = { ...data };

    let id = newData.expanses[type].maxId + 1;
    newData.expanses[type].maxId = id;
    newData.expanses[type][id] = { ...newExpanse };
    if (group === "/") {
      newData.expanses.inRoot.push(type + id);
    } else {
      findGroupToAdd(
        group.substring(1, group.length - 1).split("/"),
        newData.groups[type],
        id,
        parseInt(newExpanse.valor)
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
          <br />
          <input
            onChange={(e) => {
              changeObject("nome", e.target.value);
            }}
            id="nome"
            type="text"
            placeholder="Nome"
            required
          />{" "}
          <br />
          <label htmlFor="valor">valor: </label>
          <br />
          <input
            onChange={(e) => {
              changeObject("valor", e.target.value);
            }}
            id="valor"
            type="number"
            placeholder="R$ 00.00"
            required
          />{" "}
          <br />
          <label htmlFor="descricao">Descrição: </label>
          <br />
          <textarea
            onChange={(e) => {
              changeObject("descricao", e.target.value);
            }}
            name=""
            id="descricao"
            placeholder="Descrição legal"
          ></textarea>{" "}
          <br />
          <div style={{ position: "relative", width: "fit-content" }}>
            <label htmlFor="local">Local: </label>
            <PopUpButton
              id="local"
              title={group}
              PopUp={ChooseGroup}
              props={{
                data: data,
                setData: setData,
                type: type,
                group: group,
                setGroup: setGroup,
              }}
            />
            <br />
          </div>
          <div className="DataCategoria">
            <label htmlFor="data">Data: </label>
            <br />
            <input
              onChange={(e) => {
                changeObject("data", e.target.value);
              }}
              id="data"
              type="date"
              required
            />{" "}
            <br />
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
            <br />
            <button>submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const newExpanse = {
  nome: "",
  valor: 0,
  data: "",
  descricao: "",
  categoria: "Sem categoria",
};
function changeObject(atributo, valor) {
  newExpanse[atributo] = valor;
}
