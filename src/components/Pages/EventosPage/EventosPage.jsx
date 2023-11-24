import React, { useState, useEffect } from "react";
import "./EventosPage.css";
import MainContent from "../../MainContent/MainContent";
import Container from "../../Container/Container";
import ImageIllustrator from "../../ImageIllustrator/ImageIllustrator";
import { Input, Button, Select, SelectEv } from "../../FormComponents/FormComponents";
import api from "../../../Services/Services";
import Titulo from "../../Titulo/Titulo";
import eventImage from "../../../assets/images/evento.svg";
import TableEv from "./TableEv/TableEv";
import Notification from "../../Notification/Notification";
import Spinner from "../../Spinner/Spinner";

const EventosPage = () => {
  //CSS funcionalidades
  const [frmEdit, setFrmEdit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false)
  const [notifyUser, setNotifyUser] = useState({});

//States para puxar info 
  const [eventos, setEventos] = useState([]);
  const [tipoEventos, setTipoEventos] = useState([]);
  const [instituicao, setInstituicao] = useState([]);

  //Variáveis
  const [nomeEvento, setNomeEvento] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tEventos, setTEventos] = useState("")
  const [idInstituicao, setIdInstituicao] = useState("")
  const [idEvento, setIdEvento] = useState(null)



  useEffect(() => {
    // chamar a api
    async function getEventos() {
      setShowSpinner(true)
      try {
        const promise = await api.get("/Evento");
        const promiseTipoEventos = await api.get("/TiposEvento")
        const promiseInstituicao = await api.get("/Instituicao")

       
        setEventos(promise.data);
        setInstituicao(promiseInstituicao.data);
        setTipoEventos(promiseTipoEventos.data); 
        console.log(promise.data)


      } catch (error) {
        console.log("Deu ruim na api");
        console.log(error);
      }
      setShowSpinner(false)
    }

    getEventos();
    console.log("A Página Tipo de Eventos FOI MONTADA!!!!");
  }, []);

  

  async function showUpdateForm(idElemento){
    setFrmEdit(true)
    try {
      
    const retornoGetById = await api.get("/Evento/" + idElemento)
    setNomeEvento(retornoGetById.data.nomeEvento);
    setDescricao(retornoGetById.data.descricao);
    setDataEvento(retornoGetById.data.dataEvento);
    setIdEvento(retornoGetById.data.idEvento);
    
    
    } catch (error) {
      console.log("deu ruim no showUpdate")
      console.log(error)
    }
    
  }
  function editActionAbort() {
    
    setFrmEdit(false);
    setNomeEvento("");
    setDescricao("");
    setDataEvento("");
    setIdInstituicao([]);
    setTEventos([]);
    setIdEvento(null)
    
  }
  // function fromToEventType(arrEvents) {
  //   if (arrEvents.length === 0) return [];
    
  //   const arrAux = [];
  //    arrEvents.forEach(event)
      
  // }

   async function handleUpdate(e) {
    e.preventDefault();
    try {
      const retornoAtualizar =  await api.put("/Evento/"+ idEvento,
      {nomeEvento:nomeEvento,
      descricao:descricao,
      dataEvento:dataEvento,
      IdTipoEvento: tEventos,
      idInstituicao: idInstituicao
      })
      setNotifyUser({
        titleNote : "Sucesso",
        textNote : "Atualizado com sucesso",
        imgIcon : "success",
        imgAlt : "Imagem da ilustração de sucesso",
        showMessage : true,
        setNotifyUser,
      })
      
      
      const retornoGet = await api.get("/Evento")
      
      setEventos(retornoGet.data);
      editActionAbort();

    } 
    catch (error) {
      setNotifyUser({
        titleNote : "Aviso",
        textNote : "Erro ao atualizar",
        imgIcon : "warning",
        imgAlt : "Imagem da ilustração de aviso",
        showMessage : true,
        setNotifyUser,
      })
    }
   
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    
    if (nomeEvento.trim().length < 3) {
      setNotifyUser({
        titleNote : "Aviso",
        textNote : "Nome deve ter no mínimo 3 caracteres",
        imgIcon : "warning",
        imgAlt : "Imagem da ilustração de sucesso",
        showMessage : true,
        setNotifyUser,
      })
      return;
      }
      
      try {
      const retorno = await api.post('/Evento', {
        nomeEvento:nomeEvento, 
        dataEvento:dataEvento,
        descricao:descricao , 
        idInstituicao:idInstituicao,
        idTipoEvento:tEventos
        })

        setNotifyUser({
          titleNote : "Sucesso",
          textNote : "Cadastrado com sucesso",
          imgIcon : "success",
          imgAlt : "Imagem da ilustração de sucesso",
          showMessage : true,
          setNotifyUser,
        })
      const retornoGet = await api.get("/Evento")
      setEventos(retornoGet.data)
      
      console.log(retornoGet.data)
      setNomeEvento("");
      setDescricao("");
      setDataEvento("");
      setIdInstituicao("");
      setTEventos("");
        alert("Cadastrado com sucesso");
      
      } catch (error) {
        setNotifyUser({
          titleNote : "Aviso",
          textNote : "Erro ao Cadastrar",
          imgIcon : "warning",
          imgAlt : "Imagem da ilustração de aviso",
          showMessage : true,
          setNotifyUser,
        })
        console.log(error)
      }
    
  }
  async function handleDelete(id){

    try {
      const retorno = await api.delete("/Evento/" + id)
      setNotifyUser({
        titleNote : "Sucesso",
        textNote : "Deletado com sucesso",
        imgIcon : "success",
        imgAlt : "Imagem da ilustração de sucesso",
        showMessage : true,
        setNotifyUser,
      })


      const retornoGet = await api.get("/Evento")
      setEventos(retornoGet.data)

    } catch (error) {

      setNotifyUser({
      titleNote : "Aviso",
      textNote : "Erro ao deletar",
      imgIcon : "warning",
      imgAlt : "Imagem da ilustração de aviso",
      showMessage : true,
      setNotifyUser,
    })

    }
  
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
      {showSpinner ? <Spinner/> :null}
      <Container>
        <div className="cadastro-evento__box">
          <Titulo
            titleText={"Cadastrar Eventos"}
            additionalClass="cor-titulo"
            color="purple"
          />
          <ImageIllustrator imageRender={eventImage} />
          <form
            action=""
            className="ftipo-evento"
            onSubmit={frmEdit ? handleUpdate : handleSubmit}
          >
            {!frmEdit ? (
              <>
                <Input
                  id={"nomeEvento"}
                  type={"text"}
                  required={"required"}
                  placeholder={"Nome do evento"}
                  name={"nomeEvento"}
                  value={nomeEvento}
                  manipulationFunction={(e) => {
                    setNomeEvento(e.target.value);
                  }}
                />
                <Input
                  id={"descricao"}
                  type={"text"}
                  required={"required"}
                  placeholder={"Descrição do evento"}
                  name={"descricao"}
                  value={descricao}
                  manipulationFunction={(e) => {
                    setDescricao(e.target.value);
                  }}
                />
               {/* idInstituicao  e idTipoEvento vão ser select */}
                

                <Input
                  id={"dataEvento"}
                  type={"date"}
                  required={"required"}
                  placeholder={"Id da instituição"}
                  name={"dataEvento"}
                  value={dataEvento}
                  manipulationFunction={(e) => {
                    setDataEvento(e.target.value);
                  }}
                />
                <Select option={instituicao}
                name="instituicao"
                id="instituicao"
                manipulationFunction={(e) => {
                  setIdInstituicao(e.target.value);
                }}

                
                />
                <SelectEv options={tipoEventos}
                id="tEventos"
                name="tEventos"
                manipulationFunction={(e) => {
                  setTEventos(e.target.value)
                }}
                />
                
                <Button
                textButton={"Cadastrar"}
                id={"cadastrar"}
                name={"cadastrar"}
                manipulationFunction={handleSubmit}/>
              </>
            ) : (
              
              <>
                <Input
                  id={"nomeEvento"}
                  type={"text"}
                  required={"required"}
                  placeholder={"Nome do evento"}
                  name={"nomeEvento"}
                  value={nomeEvento}
                  manipulationFunction={(e) => {
                    setNomeEvento(e.target.value);
                  }}
                />
                <Input
                  id={"descricao"}
                  type={"text"}
                  required={"required"}
                  placeholder={"Descrição do evento"}
                  name={"descricao"}
                  value={descricao}
                  manipulationFunction={(e) => {
                    setDescricao(e.target.value);
                  }}
                />
               {/* idInstituicao  e idTipoEvento vão ser select */}


                <Input
                  id={"dataEvento"}
                  type={"date"}
                  required={"required"}
                  placeholder={"Id da instituição"}
                  name={"dataEvento"}
                  value={dataEvento}
                  manipulationFunction={(e) => {
                    setDataEvento(e.target.value);
                  }}
                />

                <Select option={instituicao}
                name="instituicao"
                id="instituicao"
                manipulationFunction={(e) => {
                  setIdInstituicao(e.target.value);
                }}

                />
                <SelectEv options={tipoEventos}
                id="tEventos"
                name="tEventos"
                manipulationFunction={(e) => {
                  setTEventos(e.target.value)
                }}
                />


                <Button 
                textButton={"Atualizar"}
                id={"atualizar"}
                name={"atualizar"}
                manipulationFunction={handleUpdate}/ >

                <Button 
                textButton={"Cancelar"}
                id={"cancelar"}
                name={"cancelar"}
                manipulationFunction={editActionAbort}/ >
                </>
                

            )}

          </form>
        </div>
      </Container>
      <section className="lista-eventos-section">
        <Container>
        <TableEv
        dados={eventos}
        fnUpdate={showUpdateForm}
        fnDelete={handleDelete} />
        </Container>

      </section>
    </MainContent>
  );
};

export default EventosPage;
