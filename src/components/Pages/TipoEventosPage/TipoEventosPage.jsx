import React, { useState, useEffect } from "react";
import Titulo from "../../Titulo/Titulo";
import "./TipoEventosPage.css";
import MainContent from "../../MainContent/MainContent";
import ImageIllustrator from "../../ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../../assets/images/tipo-evento.svg";
import Container from "../../Container/Container";
import { Input, Button } from "../../../components/FormComponents/FormComponents";
import api from "../../../Services/Services"
import TableTp from "./TableTp/TableTp";
import Notification from "../../../components/Notification/Notification"



const TipoEventosPage = () => {
  const [notifyUser, setNotifyUser] = useState({});
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo]= useState("Edward Elric"); //está em modo de edição?
  //array mocado

//Use effect pode ter dois parâmetros, uma function e 
  useEffect(()=> {
    // chamar a api
    async function getTipoEventos() {
      try {
        const promise = await api.get("/TiposEvento");
        
        
  
        setTipoEventos(promise.data);
  
      } catch (error) {
        console.log('Deu ruim na api');
        console.log(error);
      }
    }

    getTipoEventos();
      console.log("A Página Tipo de Eventos FOI MONTADA!!!!");
  }, []);

  const [tipoEventos,setTipoEventos] = useState([
    
    {idTipoEvento: "123", titulo: "Evento ABC"},
    {idTipoEvento: "555", titulo: "Evento xpto"},
    {idTipoEvento: "778", titulo: "Evento de JavaScript"}
   
 ]);
 
//  const deleteById = id => {
//   setFruits(oldValues => {
//     return oldValues.filter(tipoEventos => tipoEventos.idTipoEventos !== id)
//   })
 
 async function handleDelete(idEvento){
    
    try {
  //deleta o objeto
    const retorno = await api.delete(`/TiposEvento/${idEvento}`)
    alert("Registro apagado com sucesso")
  
    const retornoGet = await api.get(`/TiposEvento`)
      
    setTipoEventos(retornoGet.data);

    } catch (error) {
      console.log("Deu ruim na api")
    }
  }
//EDITAR CADASTRO
function showUpdateForm(){
  alert("Mostrando a tela de update")

}
  function handleUpdate() {
    try {
      
    } catch (error) {
      
    }
  }
  function editActionAbort() {
    alert("Cancelar a tela de edição de dados");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (titulo.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres")
      return;

    } 
    try {
      const retorno = await api.post("/TiposEvento", {titulo:titulo})

      setNotifyUser({
        titleNote : "Título não informado",
        textNote : "Mensagem não informada",
        imgIcon : "default",
        imgAlt : "Icone da ilustração",
        showMessage : false,
        setNotifyUser,
      })

      console.log("CADASTRADO COM SUCESSO")
      console.log(retorno.data)
    } catch (error) {
      console.log("Deu ruim na api:");
      console.log(error);
    }

  }

  return (
    <div>
      <MainContent>
        <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
        
        {/* Cadastro de tipos de eventos */}
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Titulo
                titleText={"Página Tipo de Eventos"}
                additionalClass={"cor-titulo"}
                color="purple"
              />

              <ImageIllustrator
                alterText={"????"}
                imageRender={eventTypeImage}
              />
              <form  className="ftipo-evento" onSubmit={frmEdit ? handleUpdate : handleSubmit}>
                {!frmEdit ? (
                  
                  (
                    <>
                      <Input
                        id={"titulo"}
                        type={"text"}
                        required={"required"}
                        placeholder={"Título"}
                        name={"titulo"}
                        value={titulo}
                        manipulationFunction={
                          (e) => {
                          setTitulo(e.target.value)
                        }
                      }
                      />
                     <span>{titulo}</span> 
                    </>
                  )
                ) : (
                  <p>Tela de Edição</p>
                )}
              </form>
            </div>
            <div className="buttons-box">


            
            <Button
            textButton={"Cadastrar"}
            id={"cadastrar"}
            name={"cadastrar"}
            type={"submit"}
            manipulationFunction={handleSubmit}
            />
            <Button
            textButton={"Atualizar"}
            id={"atualizar"}
            name={"atualizar"}
            type={"submit"}
            />

          </div>

          
            
          </Container>
        </section>
        {/* Listagem de tipos de eventos */}
        <section className="lista-eventos-section">
          <Container>
            
          <Titulo titleText={"Lista Tipo de Eventos"}
          additionalClass={"cor-titulo"}
          color={"white"}/>
          

        <TableTp
        dados={tipoEventos}
        fnUpdate={showUpdateForm}
        fnDelete={handleDelete}
        />

          </Container>

          </section>
      </MainContent>
    </div>
  );
};

export default TipoEventosPage;
