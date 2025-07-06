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

function findGroupToAdd(address, groups, nome, descricao, originalAddress, type, children, valor) {
  for (const element of groups) {
    if (element.nome === address[0]) {
      address.shift();
      addIdToGroup(address, element, nome, descricao, originalAddress, type, children, valor);
      return;
    }
  }
  console.error(address);
  console.error(`Grupo não encontrado`);
}

function addIdToGroup(address, group, nome, descricao, originalAddress, type, children, valor) {
    group.valor+=valor
  if (!address.length) {
    let modifier = verifyDisponibility(group, nome, 0);
    group.children.groups.push({
      nome: nome + (modifier ? modifier : ""),
      descricao: descricao,
      valor: valor,
      children: children,
      address: originalAddress,
      type: type,
    });
    return;
  }
  findGroupToAdd(address, group.children.groups, nome, descricao, originalAddress, type, children, valor);
}

export default function EditGroup({ data, setData, setControl, nomeOriginal, descricaoOriginal, address, typeOriginal}) {
  const [group, setGroup] = useState(address);
  const [nome, setNome] = useState(nomeOriginal);
  const [descricao, setDescricao] = useState(descricaoOriginal);
  const [type, setType] = useState(typeOriginal);

  let children = {
    expanses:[],
    groups:[]
  }
  let valorOriginal

  function updateAddresses(groupsa, newAddress){
    for (const element of groupsa.children.groups) {
        element.address = newAddress
        updateAddresses(element, newAddress+element.nome+'/')
    }
  }

  function searchAndDelete(adr, groupsa){
    if(adr.length==0){
        groupsa.children.groups = groupsa.children.groups.filter((x)=>{
            if(x.nome==nomeOriginal){
                groupsa.valor-=x.valor
                children = {...x.children}
                valorOriginal = x.valor
                console.log(x.valor)
                updateAddresses(x, group + nome + '/')
                return false
            }
            return true
            
        })
        console.log(group)
        return
    }
    findGroup(adr, group.children.groups)
    }
    function findGroup(adr, groupList){
        let group
        for (let i = 0; i < groupList.length; i++) {
            const element = groupList[i];
            console.log(adr, element.nome, i, groupList)
            if(element.nome==adr[0]){
                group=element
                break
            }
        }
        adr.shift()
        return searchAndDelete(adr, group, groupList)
    }



  function editarGrupo(e) {
    e.preventDefault();
    const newData = { ...data };

    let adr = []
    if(address!="/"){
        adr = address.substring(1, address.length - 1).split("/")
        findGroup(adr, newData.groups[typeOriginal])
    }else{
        let x
        for (let i = 0; i < newData.groups[typeOriginal].length; i++) {
            const element = newData.groups[typeOriginal][i];
            if(element.nome == nomeOriginal){
                x=i
                break
            }
        }
        children = newData.groups[type][x].children
        valorOriginal = newData.groups[type][x].valor
        updateAddresses(newData.groups[type][x], group + nome + '/')
        newData.groups[type].splice(x,1)
    }


    if (group === "/") {
      newData.groups[type].push({
        nome: nome,
        descricao: descricao,
        valor: valorOriginal,
        children: children,
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
        type,
        children,
        valorOriginal
      );
    }

    setData(newData);
    setControl(false);
  }

  return (
    <div className="PopUp novoGrupo Portal">
      <button className="x" onClick={() => setControl(false)}>
        <i className="bi bi-x"></i>
      </button>

      <div className="flex">
        <h1 className="h1NovoGrupo">Editar Grupo</h1>
      </div>

      <div className="CaixaNovoGrupo">
        <form onSubmit={editarGrupo}>
          <input
            className="BoxNovoGrupo"
            type="text"
            name="nome"
            id="nome"
            placeholder="Nome do grupo"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
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