import React, { useContext } from 'react';
import Titulo from '../../Titulo/Titulo';
import MainContent from '../../MainContent/MainContent';
import Banner from '../../Banner/Banner';
import VisionSection from '../../VisionSection/VisionSection';
import NextEvent from '../../NextEvent/NextEvent';
import Container from '../../Container/Container';
import api from '../../../Services/Services'
import ContactSection from '../../ContactSection/ContactSection'
import { useEffect, useState } from 'react';
import { UserContext } from '../../../context/AuthContext';
import './HomePage.css'

const HomePage = () => {
  const {userData} = useContext(UserContext);
  console.log("Dados globais do usuário")
  console.log(userData);
    useEffect(()=> {
      // chamar a api
      async function getProximosEventos() {
        try {
          const promise = await api.get("/Evento/ListarProximos");

          setNextEvents(promise.data);

        } catch (error) {
          alert('Deu ruim na api');
        }
      }
      getProximosEventos();
        console.log("A HOME FOI MONTADA!!!!");
    }, []);

  // fake mock - api mocada
  const [nextEvents, setNextEvents] = useState([]);

  return (
    <MainContent>
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Titulo titleText={"Próximos Eventos"} />

          <div className="events-box">
            
            {
              nextEvents.map((e) => {
                return(
                    <NextEvent
                      title={e.nomeEvento}
                      description={ e.descricao}
                      eventDate={e.dataEvento}
                      idEvento={e.idEvento}
                    />
                );
              })
            }
            
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;