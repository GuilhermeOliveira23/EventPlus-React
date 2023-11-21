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
import Spinner from "../../Spinner/Spinner";



const TipoEventosPage = () => {
  const [idEvento, setIdEvento] = useState(null);
  const [notifyUser, setNotifyUser] = useState({});
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo]= useState("Edward Elric"); //está em modo de edição?
  const [showSpinner, setShowSpinner] = useState(false)
  //array mocado

//Use effect pode ter dois parâmetros
//ao carregar a página 
  useEffect(()=> {
    // chamar a api
    async function getTipoEventos() {
      setShowSpinner(true)
      try {
        const promise = await api.get("/TiposEvento");
        
        setTipoEventos(promise.data);
  
      } catch (error) {
        console.log('Deu ruim na api');
        console.log(error);
      }
      setShowSpinner(false)
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
    setNotifyUser({
      titleNote : "Sucesso",
      textNote : "Deletado com sucesso",
      imgIcon : "success",
      imgAlt : "Imagem da ilustração de sucesso",
      showMessage : true,
      setNotifyUser,
    })
  
    const retornoGet = await api.get(`/TiposEvento`)
      
    setTipoEventos(retornoGet.data);

    } catch (error) {
      console.log("Deu ruim na api")
    }
  }
//EDITAR CADASTRO
async function showUpdateForm(idElemento){
  setFrmEdit(true);
  
try {
  const retornoGetById = await api.get(`/TiposEvento/${idElemento}`);
  setTitulo(retornoGetById.data.titulo);
  setIdEvento(retornoGetById.data.idTipoEvento);
  
} catch (error) {
  alert("Não foi possível mostrar a tela de edição, tente novamente!")
  console.log(error)
}
  

}
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      //propriedade: titulo
      const retornoUpdate = await api.put(`/TiposEvento/` + idEvento,{
        titulo: titulo
        
      });
      const retornoGet = await api.get(`/TiposEvento`);
      setTipoEventos(retornoGet.data);//atualiza o state da tabela
      alert("Atualizado com sucesso!")
      //limpar o state do título e o idEvento
      editActionAbort();


    } catch (error) {

      console.log("Problemas na atualização, verifique a conexão com a internet")
    }
   
    
  }
  //reseta o state e cancela a tela de edição
  function editActionAbort() {
    
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null)
  }
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote : "Aviso",
        textNote : "Título deve ter no mínimo 3 caracteres",
        imgIcon : "warning",
        imgAlt : "Imagem da ilustração de sucesso",
        showMessage : true,
        setNotifyUser,
      })
      return;

    } 
    try {
      const retorno = await api.post("/TiposEvento", {titulo:titulo})

      setNotifyUser({
        titleNote : "Sucesso",
        textNote : "Cadastrado com sucesso",
        imgIcon : "success",
        imgAlt : "Imagem da ilustração de sucesso",
        showMessage : true,
        setNotifyUser,
      })

      
      console.log(retorno.data)
      setTitulo("");//limpa a variável

      const retornoGet = await api.get('/TiposEvento')
      setTipoEventos(retornoGet.data);

    } catch (error) {
      console.log("Deu ruim na api:");
      console.log(error);
    }

  }

  return (
    <div>
      <MainContent>
        <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
         {showSpinner ? <Spinner/> :null} 
        
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
              <form  
              className="ftipo-evento" 
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  
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
                      <Button
                   textButton={"Cadastrar"}
                   id={"cadastrar"}
                    name={"cadastrar"}
                   type={"submit"}
                    manipulationFunction={handleSubmit}
                    />
                      
                    </>
                  ) : (
                 
                  <>
                  <Input id="titulo"
                  placeholder="Titulo"
                  name="titulo"
                  type="text"
                  value={titulo}
                  manipulationFunction = {((e) => {
                    setTitulo(e.target.value);
                  })} 
                  />
                  
                  
                <div className="buttons-editbox">
                  <Button textButton="Atualizar"
                  id="atualizar"
                  name="atualizar"
                  type="submit"
                  additionalClass="button-component--middle"
                  />
                  <Button textButton="Cancelar"
                  id="cancelar"
                  name="cancelar"
                  type="button"
                  manipulationFunction={editActionAbort}
                  additionalClass="button-component--middle"
                  />
                </div>
                </>
                )}
              </form>
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
