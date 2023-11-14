import React, { useState } from "react";
import Titulo from "../../Titulo/Titulo";
import "./TipoEventosPage.css";
import MainContent from "../../MainContent/MainContent";
import ImageIllustrator from "../../ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../../assets/images/default-image.jpeg";
import Container from "../../Container/Container";
import { Input, Button } from "../../../components/FormComponents/FormComponents";
import api from "../../../Services/Services"


const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo]= useState("Edward Elric"); //está em modo de edição?

  function handleUpdate() {
    alert("Bora Atualizar");
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

            
            
          </Container>
        </section>
      </MainContent>
    </div>
  );
};

export default TipoEventosPage;
