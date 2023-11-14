import React  from "react";

const Input = (props) => {
//state é a variável que representa o dado do componente
    
  return (
    <div>
      <input
    //   Camel Case
        type={props.tipo}
        placeholder={props.dicaCampo}
        id={props.id}
        name={props.nome}
        value = {props.valor}
        onChange={(e)=>{
            props.fnAltera(e.target.value)//valor do input
        }}
      />
      <span>{props.valor}</span>
    </div>
  );
};

export default Input;