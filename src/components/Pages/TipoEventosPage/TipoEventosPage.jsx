import React, { useState } from "react";
import Titulo from "../../Titulo/Titulo";
import "./TipoEventosPage.css";
import MainContent from "../../MainContent/MainContent";
import ImageIllustrator from "../../ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../../assets/images/tipo-evento.svg";
import Container from "../../Container/Container";
import { Input, Button } from "../../../components/FormComponents/FormComponents";
import api from "../../../Services/Services"
import TableTp from "./TableTp/TableTp";


const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo]= useState("Edward Elric"); //está em modo de edição?
  const [tipoEventos,setTipoEventos] = useState([
    
     {idTipoEvento: "123", titulo: "Evento ABC"},
     {idTipoEvento: "555", titulo: "Evento xpto"},
     {idTipoEvento: "778", titulo: "Evento de JavaScript"}
    
  ]);//array mocado

 
  function handleDelete(){
    alert("Apagar na api");
  }
//EDITAR CADASTRO
function showUpdateForm(){
  alert("Mostrando a tela de update")

}
  function handleUpdate() {
    alert("Bora Atualizar");
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
