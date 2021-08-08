import React, { useEffect, useState } from "react";
import { useStateValue } from "../context-api/state-provider";
import Table from "./table";

function Grid({ searchTerm, groupBy }: any) {
  const [{ todoList }, dispatch]: any = useStateValue();
  const [gridData, setGridData]: any = useState([]);
  const [allData, setAllData]: any = useState([]);
  const [sort, setSort]: any = useState("None");
  useEffect(() => {
    setAllData(todoList);
    manipulateData(searchTerm, sortByColumn, sort, todoList);
  }, [todoList]);
  useEffect(() => {
    manipulateData(searchTerm, sortByColumn, sort, allData);
  }, [searchTerm]);
  useEffect(() => {
    setSort(groupBy);
    manipulateData(searchTerm, sortByColumn, groupBy, allData);
  }, [groupBy]);
  const manipulateData = (
    search: any,
    sort: any,
    group: any,
    dataForFilter: any
  ) => {
    if (dataForFilter && dataForFilter.length > 0) {
      let finalData: any = dataForFilter;
      if (search && search.length > 0) {
        finalData = finalData.filter((item: any) => {
          if (item.summary.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item;
          } else if (
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return item;
          } else if (
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return item;
          } else if (
            item.priority.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return item;
          } else if (item.createDate.includes(searchTerm.toLowerCase())) {
            return item;
          } else if (item.dueDate.includes(searchTerm.toLowerCase())) {
            return item;
          } else if (
            item.level.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return item;
          } else {
          }
        });
      }
      let groupKey: any = "";
      let key: any = "priority";
      if (group === "PendingOn") {
        groupKey = "dueDate";
      } else if (group === "CreatedOn") {
        groupKey = "createDate";
      } else if (group === "Priority") {
        groupKey = "level";
      }
      if (groupKey && key && groupKey.length > 0 && key.length > 0) {
        const filterByColumn: any = finalData.filter(
          (it: any) => it.priority === group
        );
        let result: any;
        result = filterByColumn.reduce(function (r: any, a: any) {
          r[a[`${groupKey}`]] = r[a[`${groupKey}`]] || [];
          r[a[`${groupKey}`]].push(a);
          return r;
        }, Object.create(null));
        let finalResult: any = [];
        if (result && Object.keys(result).length > 0) {
          Object.keys(result).map((ele: any) => {
            if (result[`${ele}`] && result[`${ele}`].length > 0) {
              finalResult.push({
                isHeader: true,
                value: groupBy + " " + ele,
              });
              if (sort && sort.length > 0) {
                if (result[`${ele}`] && result[`${ele}`].length > 1) {
                  result[`${ele}`] = result[`${ele}`].sort(function (
                    a: any,
                    b: any
                  ) {
                    let B: any = new Date(b.createDate);
                    let A: any = new Date(a.createDate);
                    return B - A;
                  });
                }
              }
              result[`${ele}`].map((ite: any) => {
                finalResult.push(ite);
              });
              setGridData(finalResult);
            }
          });
        } else {
          setGridData([]);
        }
      } else {
        if (sort && sort.length > 0) {
          if (finalData && finalData.length > 1) {
            finalData = finalData.sort(function (a: any, b: any) {
              let B: any = new Date(b.createDate);
              let A: any = new Date(a.createDate);
              return B - A;
            });
            setGridData(finalData);
          } else {
            setGridData(finalData);
          }
        } else {
          setGridData(finalData);
        }
      }
    }
  };
  const handleClick = (e: any) => {
    let {
      target: { id },
    }: any = e;
    if (id === "nav-pending-tab") {
      const pendingFilter: any = todoList.filter(
        (item: any) => item.status.toLowerCase() === "pending"
      );
      setGridData(pendingFilter);
    } else if (id === "nav-completed-tab") {
      const completedFilter: any = todoList.filter(
        (item: any) => item.status.toLowerCase() === "completed"
      );
      setGridData(completedFilter);
    } else {
      setGridData(todoList);
    }
  };
  const sortByColumn = (colName: any) => {
    manipulateData(searchTerm, colName, sort, allData);
  };
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active"
            id="nav-all-tab"
            data-toggle="tab"
            href="#nav-all"
            role="tab"
            aria-controls="nav-all"
            aria-selected="true"
            onClick={handleClick}
          >
            ALL
          </a>
          <a
            className="nav-item nav-link"
            id="nav-pending-tab"
            data-toggle="tab"
            href="#nav-pending"
            role="tab"
            aria-controls="nav-pending"
            aria-selected="false"
            onClick={handleClick}
          >
            PENDING
          </a>
          <a
            className="nav-item nav-link"
            id="nav-completed-tab"
            data-toggle="tab"
            href="#nav-completed"
            role="tab"
            aria-controls="nav-completed"
            aria-selected="false"
            onClick={handleClick}
          >
            COMPLETED
          </a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-all"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <Table gridData={gridData} sortByColumn={sortByColumn} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-pending"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <Table gridData={gridData} sortByColumn={sortByColumn} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-completed"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <Table gridData={gridData} sortByColumn={sortByColumn} />
        </div>
      </div>
    </>
  );
}

export default Grid;
