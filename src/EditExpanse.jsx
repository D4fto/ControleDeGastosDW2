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
export default function EditExpanse({ data, setData, setVariavel , valoresAntigos}) {
  const [group, setGroup] = useState(valoresAntigos.address);
  const [type, setType] = useState(valoresAntigos.tipo);
  const [nome, setNome] = useState(valoresAntigos.nome);
  const [descricao, setDescricao] = useState(valoresAntigos.descricao);
  const [date, setDate] = useState(valoresAntigos.data);
  const [valor, setValor] = useState(valoresAntigos.valor);
  const [categoria, setCategoria] = useState(valoresAntigos.categoria);

  
    function updateValues(address, groupList){
        for (const element of groupList) {
            if(element.nome == address[0]){
                element.valor-=parseInt(newExpanse.valor)
                address.shift()
                updateValues(address, element.children.groups)
                return
            }

        }
    }

    function findAddressAndRemove(groupList, address){
        for (const element of groupList) {
            if(element.children.expanses.includes(newExpanse.id)){
                element.children.expanses = element.children.expanses.filter((x)=>x!=newExpanse.id)
                return (address + element.nome + "/")
            }
            let x = findAddressAndRemove(element.children.groups, address + element.nome + "/")
            if(x){
                return x
            }
        }
        return false
    }

  useEffect(() => {
    setGroup("/");
  }, [type]);

  function send(event) {
    event.preventDefault();
    const newData = { ...data };
    const newExpanse = {}

    let id = newData.expanses[type].maxId + 1;
    newData.expanses[type].maxId = id;
    newExpanse.id = id
    newExpanse.tipo = type
    newData.expanses[type][id] = { ...newExpanse };

    console.log(type)
    let address
    if(newData.expanses.inRoot.includes(type+id)){
        newData.expanses.inRoot = newData.expanses.inRoot.filter((x)=>x!=type+id)
    }else{
        address = findAddressAndRemove(newData.groups[type], "/")
        updateValues(address.substring(1, address.length - 1).split("/"), newData.groups[type])
    }



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
          
          <input className="DNome"
            onChange={(e) => {
              setNome(e.target.value);
            }}
            value={nome}
            id="nome"
            type="text"
            placeholder="Nome"
            required
          />{" "}
          
          <label htmlFor="valor">valor: </label>
          
          <input className="DValor"
            onChange={(e) => {
              setValor(e.target.value);
            }}
            value={valor}
            id="valor"
            type="number"
            placeholder="R$ 00.00"
            required
          />{" "}
          
          <label htmlFor="descricao">Descrição: </label>
          
          <textarea className="DCaixa"
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
            value={descricao}
            name=""
            id="descricao"
            placeholder="Descrição legal"
          ></textarea>{" "}
          
          <div style={{ position: "relative", width: "fit-content" }}>
            <label htmlFor="local">Local: </label>
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
              }}
            />
            
          </div>
          <div className="DataCategoria flex">
            <label htmlFor="data">Data: </label>
            <input
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
              id="data"
              type="date"
              required
            />{" "}
            
            <div className="DCategoria flex">
              <label htmlFor="categoria">Categoria: </label>
              <select
                onChange={(e) => {
                  setCategoria(e.target.value);
                }}
                value={categoria}
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
          <div className="TipoSubmit">
            
            
            <button>submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
