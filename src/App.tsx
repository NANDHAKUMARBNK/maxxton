import React, { useState } from "react";
import "./App.css";
import CreateTodo from "./components/create-todo";
import Grid from "./components/grid";
function App() {
  const [searchTerm, setSearchTerm]: any = useState("");
  const [groupBy, setGroupBy]: any = useState("");
  const groups: any = ["None", "CreatedOn", "PendingOn", "Priority"];
  const handleChangeSearch = (e: any) => {
    let {
      target: { value, id },
    } = e;
    if (id === "search") {
      setSearchTerm(value);
    } else {
      setGroupBy(value);
    }
  };
  return (
    <div className="App">
      <div className="row my-5">
        <div className="col-md-6">
          <h4>Maxxton ToDo App</h4>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Search any fields</label>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Type something here ..."
              onChange={handleChangeSearch}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>GroupBy</label>
            <select
              className="form-control"
              id="groupBy"
              onChange={handleChangeSearch}
            >
              {groups &&
                groups.length &&
                groups.map((element: any) => (
                  <>
                    <option key={element} value={element}>
                      {element}
                    </option>
                  </>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-md-12">
          <Grid searchTerm={searchTerm} groupBy={groupBy}></Grid>
          <CreateTodo></CreateTodo>
        </div>
      </div>
    </div>
  );
}

export default App;
