import React from 'react';
import Markdown from 'terra-markdown';
import PropTypes from 'prop-types';

const TableBody = ({ tableInstance }) => {
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
      } = tableInstance;

      console.log("groupBy", groupBy)
    return (
        <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
             {row.cells.map(cell => {
                  return (
                    <td
                      // For educational purposes, let's color the
                      // cell depending on what type it is given
                      // from the useGroupBy hook
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',    
                        borderRadius: '5px',
                        background: cell.isGrouped
                          ? '#fcad0380' : 'papayawhip',
                        visibility: (cell.isPlaceholder || cell.isAggregated) ? 'hidden' : 'unset'
                      }}
                    >
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <div style={{ display: 'flex' }}>
                          <span {...row.getToggleRowExpandedProps()} style={{ "font-size": '20px', cursor: 'pointer' }}>
                            {row.isExpanded ? '↳' : '→'}
                          </span>{' '}
                          
                          {cell.render('Cell')} 
                          <span>({row.subRows.length})</span>
                        </div>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        
                        cell.render('Cell')
                        
                      )}
                    </td>
                  )
                })}
             </tr>
           )
         })}
       </tbody>
     
    );
}

export default TableBody;