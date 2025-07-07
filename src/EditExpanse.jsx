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
  if(!valoresAntigos.tipo){
    return(<></>)
  }
  const [group, setGroup] = useState("/");
  useEffect(()=>{
    if(!data.expanses.inRoot.includes(valoresAntigos.tipo+valoresAntigos.id)){

      let address = findAddress(data.groups[valoresAntigos.tipo], "/", valoresAntigos.id)
      setGroup(address)
    }

  },[])

  const [type, setType] = useState(valoresAntigos.tipo);
  const [nome, setNome] = useState(valoresAntigos.nome);
  const [descricao, setDescricao] = useState(valoresAntigos.descricao);
  const [date, setDate] = useState(valoresAntigos.data);
  const [valorCentavos, setValorCentavos] = useState(0);
  const [valorFormatado, setValorFormatado] = useState("R$ 0,00");
  const [categoria, setCategoria] = useState(valoresAntigos.categoria);
  
  useEffect(()=>{

    if(!data.expanses.inRoot.includes(valoresAntigos.tipo+valoresAntigos.id)){

      let address = findAddress(data.groups[valoresAntigos.tipo], "/", valoresAntigos.id)
      setGroup(address)
    }
    setType(valoresAntigos.tipo);
    setNome(valoresAntigos.nome);
    setDescricao(valoresAntigos.descricao);
    setDate(valoresAntigos.data);
    const valorInicial = parseInt(valoresAntigos.valor || 0);
    setValorCentavos(valorInicial);
    setValorFormatado((valorInicial / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    }));
    setCategoria(valoresAntigos.categoria);
    
    
  },[valoresAntigos])
  
  
    function updateValues(address, groupList){
        for (const element of groupList) {
            if(element.nome == address[0]){
                element.valor-=valoresAntigos.valor
                address.shift()
                updateValues(address, element.children.groups)
                return
            }

        }
    }

    function findAddress(groupList, address, id){
        for (const element of groupList) {
            if(element.children.expanses.includes(id)){
                return (address + element.nome + "/")
            }
            let x = findAddress(element.children.groups, address + element.nome + "/", id)
            if(x){
                return x
            }
        }
        return false
    }
    function findAddressAndRemove(groupList, address){
        for (const element of groupList) {
            if(element.children.expanses.includes(valoresAntigos.id)){
                element.children.expanses = element.children.expanses.filter((x)=>x!=valoresAntigos.id)
                return (address + element.nome + "/")
            }
            let x = findAddressAndRemove(element.children.groups, address + element.nome + "/")
            if(x){
                return x
            }
        }
        return false
    }

  
  function send(event) {
    event.preventDefault();
    const newData = { ...data };
    
    let id = valoresAntigos.id;
    const newExpanse = {
      id: id,
      nome: nome,
      valor: valorCentavos,
      data: date,
      descricao: descricao,
      categoria: categoria,
      tipo: type,
      active: true
    };



    newData.expanses[type][id] = { ...newExpanse };


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
      <h1>Editar Despesa</h1>
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
          
          <input
            className="DValor"
            id="valor"
            type="text"
            inputMode="numeric"
            placeholder="R$ 0,00"
            value={valorFormatado}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, ""); // só números
              const centavos = parseInt(raw || "0", 10);
              const formatado = (centavos / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
              setValorCentavos(centavos);
              setValorFormatado(formatado);
            }}
            required
          />
          
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
          
          <div className="ParenteBarra" style={{ position: "relative"}}>
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
              }}
            />
            
          </div>
          <div className="Alinhamento">
           <div className="DataCategoria flex">
            <div className="flex">
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
            </div>
            
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
         </div>
          <div className="TipoSubmit">
            
            
            <button>submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
