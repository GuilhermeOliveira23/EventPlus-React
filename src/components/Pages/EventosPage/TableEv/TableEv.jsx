import React from "react";
import "./TableEv.css";
import trashDelete from "../../../../assets/images/trash-delete.svg";
import editPen from "../../../../assets/images/edit-pen.svg";
const TableEv = ({ dados, fnUpdate = null, fnDelete = null }) => {
  return (
    <table className="table-data">
      <thead>
        <tr className="table-data__head-row">
          <th className="table-data__head-title">Nome</th>
          <th className="table-data__head-title">Descrição</th>
          <th className="table-data__head-title">Data</th>
          <th className="table-data__head-title">TipoEvento</th>
          <th className="table-data__head-title">Instituição</th>
        </tr>
      </thead>
      <tbody className="table-data__data">
        {dados.map((ev) => {
          return (
            <tr className="table-data__head-row">
              <td className="table-data__head-title">{ev.nomeEvento}</td>
              <td className="table-data__head-title">{ev.descricao}</td>
              <td className="table-data__head-title">{ev.dataEvento}</td>
              <td className="table-data__head-title">{ev.idTipoEvento}</td>
              <td className="table-data__head-title">{ev.idInstituicao}</td>

              <td className="table-data__head-title--little">
                <img className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={() => {
                    fnUpdate(ev.idEvento);
                  }}
                />
              </td>
              <td className="table-data__head-title-little">
                <img className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={() => {
                    fnDelete(ev.idEvento);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableEv;
