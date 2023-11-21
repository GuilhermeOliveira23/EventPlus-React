import React, { useState, useEffect } from 'react';
import './EventosPage.css'
import MainContent from '../../MainContent/MainContent';
import Container from '../../Container/Container';
import ImageIllustrator from '../../ImageIllustrator/ImageIllustrator';
import {Input, Button} from '../../FormComponents/FormComponents'
import api from '../../../Services/Services'
import Titulo from '../../Titulo/Titulo';
const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false)
  const [nomeEvento, setNomeEvento] = useState("")
  const [dataEvento, setDataEvento] = useState("")
  const [descricao, setDescricao] = useState("")
  const [idInstituicao, setIdInstituicao] = useState("")
  
  useEffect(()=> {
    // chamar a api
    async function getEventos() {
      try {
        const promise = await api.get("/Evento");
        
        setEventos(promise.data);
  
      } catch (error) {
        console.log('Deu ruim na api');
        console.log(error);
      }
    }

    getEventos();
      console.log("A Página Tipo de Eventos FOI MONTADA!!!!");
  }, []);
  const [Eventos, setEventos] = useState(
  [
    {IdEvento: "123", nomeEvento:"Criar api Bradesco" ,
     dataEvento: "11/23/2010",descricao: "Trabalhar",
     idInstituicao:"3fa85f64-5717-4562-b3fc-2c963f66afa6",idTipoEvento: "123"} 



  ]);


  function handleUpdate(e){
    
  }


  async function handleSubmit(e){
    e.preventDefault();

    if (nome.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres")
      return;
    }
    
    try {
      const retorno = await api.post("/Evento" , {nomeEvento:nome}, {dataEvento:dataEvento},
       {descricaoEvento:descricao}, {idInstituicao:idInstituicao})

       console.log("CADASTRADO COM SUCESSO")
       console.log(retorno.data)
      
      
    } catch (error) {
      console.log("Deu ruim na api:");
      console.log(error);

    }


  }

    return (
      
        <div>
          <form  className="ftipo-evento" onSubmit={frmEdit ? handleUpdate : handleSubmit}>
                {!frmEdit ? (
                  
                  (
                    <>
                      <Input
                        id={"nome"}
                        type={"text"}
                        required={"required"}
                        placeholder={"Nome"}
                        name={"nome"}
                        value={nome}
                        manipulationFunction={
                          (e) => {
                          setNome(e.target.value)
                        }
                      }

                      />
                      <Input
                        id={"dataEvento"}
                        type={"date"}
                        required={"required"}
                        placeholder={"Data do Evento"}
                        name={"dataEvento"}
                        value={dataEvento}
                        manipulationFunction={
                          (e) => {
                          setDataEvento(e.target.value)
                        }
                      }
                      />
                      <Input
                        id={"descricao"}
                        type={"text"}
                        required={"required"}
                        placeholder={"Descrição do Evento"}
                        name={"descricao"}
                        value={descricao}
                        manipulationFunction={
                          (e) => {
                          setDescricao(e.target.value)
                        }
                      }
                      />
                      <Input
                        id={"idInstituicao"}
                        type={"text"}
                        required={"required"}
                        placeholder={"Id da Instituição"}
                        name={"idInstituicao"}
                        value={idInstituicao}
                        manipulationFunction={
                          (e) => {
                          setIdInstituicao(e.target.value)
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
                  )
                ) : (
                  <p>Tela de Edição</p>
                )}
              </form>
        </div>
    );
};

export default EventosPage;