import React from 'react';
import { useTable, useGroupBy, useExpanded, useFilters, useGlobalFilter, useSortBy, useResizeColumns } from 'react-table';
import TableHead from './TableHead';
import TableBody from './TableBody';

const RequirementTable = ({ reqId, columns, data }) => {
    const defaultColumn = React.useMemo(
      () => ({
        minWidth: 50,
        width: 150,
        maxWidth: 400,
      }),
      []
    )
  
    const tableInstance = useTable({ columns, data, defaultColumn }, useFilters, useGlobalFilter, useGroupBy, useSortBy, useExpanded, useResizeColumns)
  
    const {
      getTableProps,
    } = tableInstance
  
    return (
      <React.Fragment>
        <h1>Tracing Report</h1>
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <TableHead tableInstance={tableInstance} />
            <TableBody tableInstance={tableInstance} />
        </table>
      </React.Fragment>
    )
  }

export default RequirementTable;