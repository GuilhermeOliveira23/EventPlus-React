import React from 'react';
import './FormComponents.css'

export const Input = ({
    type,
    id,
    value,
    required,
    additionalClass = "",
    name,
    placeholder,
    manipulationFunction
}) => {
    
    return(
        <input 
        type={type}
        id={id}
        name={name}
        value={value}
        required= {required}
        className={`input-component ${additionalClass}`}
        placeholder={placeholder}
        onChange={manipulationFunction}
        autoComplete='off' />

    );
}

export const Button = ({id,name,type,additionalClass = "",textButton, manipulationFunction}) =>{
return(
    <button 
    type={type}
    name = {name}
    id={id}
    className ={`button-component ${additionalClass}`}
    onClick={manipulationFunction}
    
    
    >{textButton}
    
    </button>
)

}

export const Select = ({
    option = [],
    name,
    id,
    required,
    additionalClass,
    manipulationFunction = "",
    defaultValue



}) => {
    return (
        <select
            name={name}
            id={id}
            required={required}
            className={`input-component ${additionalClass}`}
            onChange={manipulationFunction}
            value={defaultValue}
        >
            <option value="">Selecione</option>
            {option.map((opt) => {
                return (
                    <option key={opt.idInstituicao} value={opt.idInstituicao}>{opt.nomeFantasia}</option>
                )

            })}
        </select>

    );
}
export const SelectEv = ({
    options = [],
    id,
    name ,
    required,
    manipulationFunction,
    defaultValue,
    additionalClass
}) => {
return(
    
<select 
 name={name}
 id={id}
 required = {required}
 className={`input-component ${additionalClass}`}
 onChange={manipulationFunction}
 value={defaultValue}

  >
    <option value="">Selecione o Tipo de Evento</option>

    {options.map((opt) => {
        return (
            <option  key= {opt.idTipoEvento} value={opt.idTipoEvento}>{opt.titulo}</option>
            
        )
    })}
    

</select>

);



}
export const SelectTp = ({
    option = [],
    name,
    id,
    required,
    additionalClass,
    manipulationFunction = "",
    defaultValue



}) => {
    return (
        <select
            name={name}
            id={id}
            required={required}
            className={`input-component ${additionalClass}`}
            onChange={manipulationFunction}
            value={defaultValue}
        >
            <option value="">Selecione</option>
            {option.map((opt) => {
                return (
                    <option key={opt.value} value={opt.value}>{opt.text}</option>
                )

            })}
        </select>

    );
}