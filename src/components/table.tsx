import React, { useState } from "react";
import { useStateValue } from "../context-api/state-provider";

function Table({ gridData, sortByColumn }: any) {
  const [{ todoList }, dispatch]: any = useStateValue();
  const [isSort, setIsSort]: any = useState(false);
  const handleClick = (id: any, type: any) => {
    if (type === "delete") {
      dispatch({
        type: "REMOVE_TODO",
        id: id,
      });
    } else {
      let specificData: any = todoList.filter((item: any) => item.id === id);
      dispatch({
        type: "EDIT_TODO",
        value: specificData,
      });
    }
  };
  function sort(name: any) {
    sortByColumn(name);
  }
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Summary</th>
            <th scope="col">Priority</th>
            <th scope="col">
              Created On{" "}
              {!isSort && (
                <i
                  className="fa fa-arrow-up"
                  onClick={() => {
                    setIsSort(true);
                    sort("CreatedOn");
                  }}
                ></i>
              )}
              {isSort && (
                <i
                  className="fa fa-arrow-down"
                  onClick={() => {
                    setIsSort(false);
                  }}
                ></i>
              )}
            </th>
            <th scope="col">Due By</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {gridData && gridData.length ? (
            gridData.map((element: any) =>
              element.isHeader ? (
                <tr>
                  <td>{element.value}</td>
                </tr>
              ) : (
                <tr>
                  <td>{element.summary}</td>
                  <td>{element.level}</td>
                  <td>{element.createDate}</td>
                  <td>{element.dueDate}</td>
                  <td>
                    <i
                      className="fa fa-edit"
                      onClick={() => handleClick(element.id, "edit")}
                      style={{ fontSize: "30px", color: "blue" }}
                    ></i>
                    &nbsp; &nbsp;
                    <i
                      className={
                        element.status === "Pending"
                          ? "fa fa-history pending"
                          : "fa fa-check completed"
                      }
                    ></i>
                    &nbsp; &nbsp;
                    <i
                      className="fa fa-trash"
                      onClick={() => handleClick(element.id, "delete")}
                      style={{ fontSize: "30px", color: "red" }}
                    ></i>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td>No Data Found</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
