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

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);

  const [eventos, setEventos] = useState([]);
  const [tipoEventos, setTipoEventos] = useState([]);
  const [instituicao, setInstituicao] = useState([]);
  //Variáveis
  const [nomeEvento, setNomeEvento] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tEventos, setTEventos] = useState("")
  const [idInstituicao, setIdInstituicao] = useState("")

  

  const [notifyUser, setNotifyUser] = useState({});
  
  

  useEffect(() => {
    // chamar a api
    async function getEventos() {
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
    }

    getEventos();
    console.log("A Página Tipo de Eventos FOI MONTADA!!!!");
  }, []);

  

  async function showUpdateForm(idEvento){
    setFrmEdit(true)
    try {
    const retornoGetById = await api.get("/Evento/" + idEvento)
    setNomeEvento(retornoGetById.data.nomeEvento);
    setDescricao(retornoGetById.data.descricao);
    setDataEvento(retornoGetById.data.dataEvento);
    setIdInstituicao(retornoGetById.data.instituicao.nomeFantasia);
    setTEventos(retornoGetById.data.tipoEventos.titulo);
    
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
    
  }

   async function handleUpdate(e) {
    e.preventDefault();
    try {
      // const retornoAtualizar =  await api.put("/Evento/"+ idEvento,
      // {nomeEvento:nomeEvento,
      // descricao:descricao,
      // dataEvento:dataEvento,
      // IdTipoEvento: tEventos,
      // idInstituicao: idInstituicao
      // })
      console.log("Atualizado com sucesso")
      const retornoGet = await api.get("/Evento")
      setEventos(retornoGet.data);
      editActionAbort();

    } catch (error) {
      console.log("Deu erro no update")
    }
   
  }

  async function handleSubmit(e) {
    e.preventDefault();
    alert("Cadastro indo")
    
    if (nomeEvento.trim().lenght < 3) {
      alert("Nome deve ter mais de 3 caracteres")
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
        console.log("Deu ruim na api")
        console.log(error)
      }
    
  }
  async function handleDelete(id){

    try {
      const retorno = await api.delete("/Evento/" + id)
      alert("DELETADO COM SUCESSO")


      const retornoGet = await api.get("/Evento")
      setEventos(retornoGet.data)

    } catch (error) {
      console.log("Deu ruim na api")

    }
  
  }

  return (
    <MainContent>
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
