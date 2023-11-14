import React, { useState } from "react";
import Input from "../../Input/Input";
import Button from "../../Button/Button";

const TestePage = () => {
    const [n1, setN1] = useState();
    const [n2, setN2] = useState();
    const [total, setTotal] = useState();


    function handleCalcular(e) {
        e.preventDefault();//chamar no submit do form
        setTotal(parseFloat(n1) + parseFloat(n2));
    }

  return (
    <>
     
      <h1>Página de testes</h1>
      <h2>Calculator</h2>
      <form onSubmit={handleCalcular}>
        <Input
          tipo="number"
          id="numero1"
          dicaCampo="Primeiro número"
          nome="numero1"
          valor = {n1}
          fnAltera = {setN1}
        />
        <Input
          tipo="number"
          id="numero2"
          dicaCampo="Segundo número"
          nome="numero2"
          valor = {n2}
          fnAltera = {setN2}
        />
    
        <Button tipoBotao="submit" textoBotao="Calcular" />
        <p>Resultado: <strong>{total}</strong></p>
      </form>
    </>
  );
};

export default TestePage;
