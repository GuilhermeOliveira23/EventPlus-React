import React, {useState} from 'react';
import Rotas from './routes';
import { UserContext } from './context/AuthContext';



function App() {
  const [userData,setUserData] = useState(UserContext);


  return (
    
      <UserContext.Provider value = {{userData,setUserData}}>
      <Rotas/>
      </UserContext.Provider>
    
  );
}

export default App;