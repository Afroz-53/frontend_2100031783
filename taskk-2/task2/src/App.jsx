import React from "react";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { data } from "./assets/data.json";
import Confetti from "react-confetti"; 

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); 
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const columns = [
  {
    Header: "ID",
    accessor: "id",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Name",
    accessor: "name",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Gender",
    accessor: "gender",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Salary",
    accessor: "salary",
    Filter: DefaultColumnFilter,
  },
];

const App = () => {
  const [confettiActive, setConfettiActive] = React.useState(false); // State for confetti animation

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize, pageCount },
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useFilters, // useFilters!
    useSortBy,
    usePagination
  );

  return (
    <div className="container">
      {confettiActive && <Confetti />} {}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <div>
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
                  {column.isSorted ? (column.isSortedDesc ? "Sort By Ascending ⬇️" : "Sort By Descending ⬆️") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btn-container">
        <button onClick={() => { gotoPage(0); setConfettiActive(true); }} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => { previousPage(); setConfettiActive(true); }} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
        <button onClick={() => { nextPage(); setConfettiActive(true); }} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => { gotoPage(pageCount - 1); setConfettiActive(true); }} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
      <div className="page-size-container">
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default App;
