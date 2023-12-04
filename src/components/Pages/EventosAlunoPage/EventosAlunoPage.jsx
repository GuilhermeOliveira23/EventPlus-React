import React, { useContext, useEffect, useState } from "react";
import Header from "../../Header/Header";
import MainContent from "../../MainContent/MainContent";
import Titulo from "../../Titulo/Titulo";
import Table from "./TableEvA/TableEvA"
import Container from "../../Container/Container";
import { SelectTp } from "../../../components/FormComponents/FormComponents";
import Spinner from "../../../components/Spinner/Spinner";
import Modal from "../../../components/Modal/Modal";
import api from "../../../Services/Services";

import "./EventosAlunoPage.css";
import { UserContext } from "../../../context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    loadEventsType();

async function loadEventsType() {
  setShowSpinner(true);
  try {
    
    if (tipoEvento === "1") {
      const retorno=  await api.get("/Evento")
      console.log(retorno.data)
      setEventos(retorno.data);
    }else{
      let arrEventos = [];
      const retornoEv = await api.get("/PresencasEvento/ListarMinhas/" + userData.userId )
      console.log(retornoEv.data)
      retornoEv.data.array.forEach((element) => {
      arrEventos.push(element.evento)
      });
      setEventos(arrEventos);
    }
    

  } catch (error) {
    console.log("Erro ao carregar os eventos")
  }
  setShowSpinner(false);

}
    
  }, [tipoEvento]);

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    alert("Desenvolver a função conectar evento");
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Titulo titleText={"Eventos"} additionalClass="custom-title" />

          <SelectTp
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            option={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
