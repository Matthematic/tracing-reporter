import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useGroupBy, useExpanded, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table';
import { motion, AnimatePresence } from 'framer-motion'

const Grouper = ({ column,  }) => {
    return column.canGroupBy ? (
      // If the column can be grouped, let's add a toggle
      <span {...column.getGroupByToggleProps()}>
        {column.isGrouped ? '⚍ ' : '☰ '}
      </span>
    ) : null
}

const Sorter = ({ column, onClick }) => {
    return (
        <span {...column.getSortByToggleProps()}>
        {column.isSorted
            ? column.isSortedDesc
            ? ' ⇩'
            : ' ⇧'
            : ' ⇳'}
        </span>
    );
}
  
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 500)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
}

const TableHead = ({ tableInstance }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { groupBy, expanded, globalFilter },
      } = tableInstance

    return (
        <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                  <Grouper column={column} />
                  {column.render('Header')}
                  <Sorter column={column} />
                  {/* <div {...column.getResizerProps()}>⇥</div> */}
               </th>
             ))}
           </tr>
         ))}
         
         <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
       </thead>
    );
}

export default TableHead;