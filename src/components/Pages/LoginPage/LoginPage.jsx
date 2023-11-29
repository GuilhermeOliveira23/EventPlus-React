import React, { useContext, useState } from "react";
import ImageIllustrator from "../../ImageIllustrator/ImageIllustrator";
import logo from "../../../assets/images/logo-pink.svg";
import { Input, Button } from "../../FormComponents/FormComponents";
import api from "../../../Services/Services";

import "./LoginPage.css";
import { UserContext, userDecodeToken } from "../../../context/AuthContext";

const LoginPage = () => {

const [user,setUser] = useState({email: "comum@gmail.com", senha:"123456"})
const {userData,setUserData} = useContext(UserContext);

async function handleSubmit (e) {
    e.preventDefault()
    console.log(user)
    if (user.email.length >= 3 && user.senha.length > 3) {
       alert("Postando os dados na api")
    }
    else{
        alert("Preencha os campos corretamente")
    }
try {
    const retornoPost = await api.post("/login",{
    email:user.email,
    senha:user.senha
    })
    console.log(retornoPost.data.token)

    const userFullToken = userDecodeToken(retornoPost.data.token);
    setUserData(userFullToken)//guarda os dados decodificados(payload)
    localStorage.setItem("token", JSON.stringify(userFullToken));
    console.log("Dados do usuario")
    console.log(userData)
   
} catch (error) {
    console.log("Deu ruim no login");
    console.log(error);
    
}

}

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageRender={logo}
            imageName="login"
            altText="Imagem de um homem em frente de uma porta de entrada"
            className="login-illustrator"
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              additionalClass="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {
                setUser({
                    ...user,
                    email: e.target.value.trim()
                })
              }}
              placeholder="Username"
            />
            <Input
              additionalClass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) =>{
                setUser({
                    ...user,
                    senha: e.target.value.trim()
                })
              }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              additionalClass="frm-login__button"
              
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;