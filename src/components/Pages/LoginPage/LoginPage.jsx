import React, { useContext, useState, useEffect } from "react";
import ImageIllustrator from "../../ImageIllustrator/ImageIllustrator";
import logo from "../../../assets/images/logo-pink.svg";
import loginImage from "../../../assets/images/login.svg"
import { Input, Button } from "../../FormComponents/FormComponents";
import api from "../../../Services/Services";
import Notification from "../../Notification/Notification";

import "./LoginPage.css";
import MainContent from "../../MainContent/MainContent";
import { useNavigate } from "react-router-dom";
import { UserContext, userDecodeToken } from "../../../context/AuthContext";

const LoginPage = () => {
  const [notifyUser, setNotifyUser] = useState({});
    const [user, setUser] = useState({email: "comum@gmail.com", senha: "123456"});
    // Dados globais do usuário
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData.nome) navigate("/");
    }, [userData]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (user.email.length <= 3 || user.senha.length <= 3) {
            setNotifyUser({
        titleNote : "Aviso",
        textNote : "Título e senha devem ter no mínimo 3 caracteres",
        imgIcon : "warning",
        imgAlt : "Imagem da ilustração de sucesso",
        showMessage : true,
        setNotifyUser,
      })
            return;
        }

        try {
            const promise = await api.post("/Login", {
                email: user.email,
                senha: user.senha
            });
            const userFullToken = userDecodeToken(promise.data.token);
            setUserData(userFullToken); // Guarda os dados decodificados (payload)
            localStorage.setItem("token", JSON.stringify(userFullToken));
            navigate("/");

            setNotifyUser({
        titleNote : "Aviso",
        textNote : "Login Feito com sucesso",
        imgIcon : "success",
        imgAlt : "Imagem da ilustração de sucesso",
        showMessage : true,
        setNotifyUser,
      })
        } catch (error) {
          setNotifyUser({
            titleNote : "Aviso",
            textNote : "Erro ao logar",
            imgIcon : "warning",
            imgAlt : "Imagem da ilustração de sucesso",
            showMessage : true,
            setNotifyUser,
          })
        }
    }

  return (
    <MainContent>
        <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
        <div className="layout-grid-login">
            <div className="login">
                <div className="login__illustration">
                <div className="login__illustration-rotate"></div>
                <ImageIllustrator
                    imageRender={loginImage}
                    altText="Imagem de um homem em frente de uma porta de entrada"
                    additionalClass="login-illustrator "
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
                            email: e.target.value.trim(),
                        });
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
                    manipulationFunction={(e) => {
                        setUser({
                            ...user,
                            senha: e.target.value.trim(),
                        });
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
    </MainContent>
  );
};
export default LoginPage;