import React, { useState, useEffect } from "react";
import { useStateValue } from "../context-api/state-provider";
import moment from "moment";
import { maximumCharacters } from "../common/form-validations";
declare var $: any;
function CreateTodo() {
  const [{ todoById, todoList }, dispatch]: any = useStateValue();
  const [summary, setSummary]: any = useState("");
  const [description, setDescription]: any = useState("");
  const [priority, setPriority]: any = useState("");
  const [dueDate, setDueDate]: any = useState("");
  const [status_, setStatus]: any = useState("");
  const [level_, setLevel]: any = useState("");
  const priorities: any = ["None", "CreatedOn", "PendingOn", "Priority"];
  const status: any = ["Select Status", "Pending", "Completed"];
  const level: any = ["Select Level", "Low", "Medium", "High"];
  const [summaryMsg, setSummaryMsg]: any = useState("");
  const [descriptionMsg, setDescriptionMsg]: any = useState("");
  const [priorityMsg, setPriorityMsg]: any = useState("");
  const [dueDateMsg, setDueDateMsg]: any = useState("");
  const [statusMsg, setStatusMsg]: any = useState("");
  const [levelMsg, setLevelMsg]: any = useState("");
  const handleChange = (e: any) => {
    const {
      target: { value, id },
    } = e;
    if (id === "summary") {
      setSummary(value);
      setSummaryMsg("");
    } else if (id === "description") {
      setDescription(value);
      setDescriptionMsg("");
    } else if (id === "priority") {
      setPriority(value);
      setPriorityMsg("");
    } else if (id === "dueDate") {
      setDueDate(moment(value).format("YYYY-MM-DD"));
      setDueDateMsg("");
    } else if (id === "level") {
      setLevel(value);
      setLevelMsg("");
    } else if (id === "status") {
      setStatus(value);
      setStatusMsg("");
    }
  };
  useEffect(() => {
    if (todoById.length > 0) {
      $("#exampleModal").modal("show");
      todoById.map((res: any) => {
        setSummary(res.summary);
        setDescription(res.description);
        setPriority(res.priority);
        setDueDate(res.dueDate);
        setLevel(res.level);
        setStatus(res.status);
      });
    }
    return () => {
      $("#exampleModal").modal("hide");
    };
  }, [todoById]);
  const save = (e: any) => {
    if (
      !summary ||
      !description ||
      !level_ ||
      !dueDate ||
      !status_ ||
      !priority
    ) {
      setSummaryMsg("Summary Is Required");
      setDescriptionMsg("Description Is Required");
      setPriorityMsg("Priority Is Required");
      setDueDateMsg("DueDate Is Required");
      setLevelMsg("Level Is Required");
      setStatusMsg("Status Is Required");
      return;
    } else if (!summary) {
      setSummaryMsg("Summary Is Required");
      return;
    } else if (!description) {
      setDescriptionMsg("Description Is Required");
      return;
    } else if (!level_) {
      setLevelMsg("Level Is Required");
      return;
    } else if (!dueDate) {
      setDueDateMsg("DueDate Is Required");
      return;
    } else if (!status_) {
      setStatusMsg("Status Is Required");
      return;
    } else if (!priority) {
      setPriorityMsg("Priority Is Required");
      return;
    } else if (!maximumCharacters(summary, "summary")) {
      setSummaryMsg("Summary Limit between 3-150 charcters");
      return;
    } else if (!maximumCharacters(description, "")) {
      setDescriptionMsg("Description Limit between 10-500 charcters");
      return;
    } else {
      let isTrigger: boolean = false;
      const request: any = {
        id: `${summary.slice(0, 2)}${description.slice(0, 2)}${priority.slice(
          0,
          2
        )}${Math.floor(Math.random() * 10 + 1)}`,
        summary: summary,
        description: description,
        priority: priority,
        createDate: moment().format("YYYY-MM-DD"),
        dueDate: dueDate,
        status: status_,
        level: level_,
      };
      if (todoById.length > 0) {
        let updated: any = todoList.map((item: any) => {
          const { id }: any = todoById.find((ele: any) => ele.id);
          if (item.id === id) {
            item.status = request.status;
          }
          return item;
        });
        dispatch({
          type: "EDIT_VALUE_TODO",
          data: updated,
        });
        isTrigger = true;
      } else {
        dispatch({
          type: "ADD_TODO",
          data: request,
        });
        isTrigger = true;
      }
      if (isTrigger) {
        $("#exampleModal").modal("hide");
        setSummary("");
        setDescription("");
        setPriority("");
        setDueDate("");
        setLevel("");
        setStatus("");
        alert("Data saved");
      }
    }
  };
  return (
    <>
      <i
        className="fa fa-plus-circle"
        data-toggle={"modal"}
        data-target={"#exampleModal"}
        style={{ fontSize: "35px", color: "blue" }}
        onClick={() => {
          dispatch({
            type: "EDIT_TODO",
            value: [],
          });
        }}
      ></i>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Summary *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="summary"
                    placeholder="Summary"
                    onChange={handleChange}
                    value={summary}
                    readOnly={todoById.length > 0 ? true : false}
                  />
                  {summaryMsg && <p style={{ color: "red" }}>{summaryMsg}</p>}
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={description}
                    readOnly={todoById.length > 0 ? true : false}
                  ></textarea>
                  {descriptionMsg && (
                    <p style={{ color: "red" }}>{descriptionMsg}</p>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <div className="form-group">
                      <label>Due Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        placeholder="Due Date"
                        onChange={handleChange}
                        value={dueDate}
                        readOnly={todoById.length > 0 ? true : false}
                      />
                      {dueDateMsg && (
                        <p style={{ color: "red" }}>{dueDateMsg}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Priority *</label>
                      <select
                        className="form-control"
                        id="priority"
                        onChange={handleChange}
                        value={priority}
                        disabled={todoById.length > 0 ? true : false}
                      >
                        {priorities &&
                          priorities.length &&
                          priorities.map((element: any) => (
                            <>
                              <option key={element} value={element}>
                                {element}
                              </option>
                            </>
                          ))}
                      </select>
                      {priorityMsg && (
                        <p style={{ color: "red" }}>{priorityMsg}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <div className="form-group">
                      <label>Level *</label>
                      <select
                        className="form-control"
                        id="level"
                        onChange={handleChange}
                        value={level_}
                        disabled={todoById.length > 0 ? true : false}
                      >
                        {level &&
                          level.length &&
                          level.map((element: any) => (
                            <>
                              <option key={element} value={element}>
                                {element}
                              </option>
                            </>
                          ))}
                      </select>
                      {levelMsg && <p style={{ color: "red" }}>{levelMsg}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Status *</label>
                      <select
                        className="form-control"
                        id="status"
                        onChange={handleChange}
                        value={status_}
                      >
                        {status &&
                          status.length &&
                          status.map((element: any) => (
                            <>
                              <option key={element} value={element}>
                                {element}
                              </option>
                            </>
                          ))}
                      </select>
                      {statusMsg && <p style={{ color: "red" }}>{statusMsg}</p>}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={save}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTodo;
