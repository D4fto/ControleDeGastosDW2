import { useState, useEffect } from "react";
import PopUpButton from "./PopUpButton";
import ChooseGroup from "./ChooseGroup";
import "./PopUp.css";
import "./NewGroup.css";

function verifyDisponibility(group, nome, modifier) {
  let x = false;
  for (const element of group.children.groups) {
    if (element.nome === nome + (modifier > 0 ? modifier : "")) {
      x = true;
      modifier++;
    }
  }
  if (x) {
    return verifyDisponibility(group, nome, modifier);
  }
  return modifier;
}

function findGroupToAdd(address, groups, nome, descricao, originalAddress, type) {
  for (const element of groups) {
    if (element.nome === address[0]) {
      address.shift();
      addIdToGroup(address, element, nome, descricao, originalAddress, type);
      return;
    }
  }
  console.error(address);
  console.error(`Grupo não encontrado`);
}

function addIdToGroup(address, group, nome, descricao, originalAddress, type) {
  if (!address.length) {
    let modifier = verifyDisponibility(group, nome, 0);
    group.children.groups.push({
      nome: nome + (modifier ? modifier : ""),
      descricao: descricao,
      valor: 0,
      children: {
        groups: [],
        expanses: [],
      },
      address: originalAddress,
      type: type,
    });
    return;
  }
  findGroupToAdd(address, group.children.groups, nome, descricao, originalAddress, type);
}

export default function NewGroup({ data, setData, setControl }) {
  const [group, setGroup] = useState("/");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [type, setType] = useState("fixo");

  useEffect(() => {
    setGroup("/");
  }, [type]);

  function adicionarGrupo(e) {
    e.preventDefault();
    const newData = { ...data };

    if (group === "/") {
      let x = true
      let modifier = 0

      while(x){
        let y = false
        for (const element of newData.groups[type]) {
          if (element.nome === nome + (modifier > 0 ? modifier : "")) {
            y = true;
            modifier++;
            break
          }
        }
        if(!y){
          x=false
        }
      }
      
      newData.groups[type].push({
        nome: nome + (modifier > 0 ? modifier : ""),
        descricao: descricao,
        valor: 0,
        children: {
          groups: [],
          expanses: [],
        },
        address: "/",
        type: type,
      });
    } else {
      findGroupToAdd(
        group.substring(1, group.length - 1).split("/"),
        newData.groups[type],
        nome,
        descricao,
        group,
        type
      );
    }

    setData(newData);
    setControl(false);
  }

  return (
    <div className="PopUp novoGrupo">
      <button className="x" onClick={() => setControl(false)}>
        <i className="bi bi-x"></i>
      </button>

      <div className="flex">
        <h1 className="h1NovoGrupo">Novo Grupo</h1>
      </div>

      <div className="CaixaNovoGrupo">
        <form onSubmit={adicionarGrupo}>
          <input
            className="BoxNovoGrupo"
            type="text"
            name="nome"
            id="nome"
            placeholder="Nome do grupo"
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <br />
          <textarea
            className="BoxNovoGrupo2"
            name="descricao"
            id="descricao"
            placeholder="Descrição"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
          ></textarea>
          <br />
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="tipo"
                id="fixo"
                onChange={() => setType("fixo")}
                checked={type === "fixo"}
              />
              Fixo
            </label>
            <label>
              <input
                type="radio"
                name="tipo"
                id="variavel"
                onChange={() => setType("variavel")}
                checked={type === "variavel"}
              />
              Variável
            </label>
          </div>
          <div className="flex Barra">
            <PopUpButton
              className="FilhoDoBarra"
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
            <button
              className="BarraButton"
              disabled={nome === ""}
              style={{ cursor: nome === "" ? "unset" : "" }}
            >
              +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
