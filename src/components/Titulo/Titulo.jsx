import "./Titulo.css"
import React from "react";



const Titulo = ({ titleText, additionalClass = "" , color = ""}
) => {

  return (
    <h1 className={`title ${additionalClass}`}
    //em json, por isso dos colchetes antes do valor
    style={{color: color}}
    
    >

      {titleText}
      <hr
      className="title__underscore" 
      style={{borderColor:color}} />
    </h1>


  );
};

export default Titulo;
