import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'terra-markdown';
import { useTable, useGroupBy, useExpanded, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, useResizeColumns } from 'react-table';
import smoothscroll from 'smoothscroll-polyfill';
import TableHead from './TableHead';
import TableBody from './TableBody';
import '../../styles/MarkdownViewerStyles.scss';

smoothscroll.polyfill();

const propTypes = {
  baseUrl: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

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
    <React.Fragment>
      <h1>Tracing Report</h1>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <TableHead tableInstance={tableInstance} />
          <TableBody tableInstance={tableInstance} />
      </table>
    </React.Fragment>
  )
}

const InteractiveViewer = ({ baseUrl, data }) => {

  const aggregateTableData = (data) => {
    // we need to add requirement ID to each row and flatten all tests into a single array
    let dataCopy = [];
    Object.keys(data).forEach((key) => {
      dataCopy.push(data[key].map(chunk => ({ requirement: key, ...chunk })))
    })
    return dataCopy.flat();
  }

  /**
   * Splits rows that have combined issues into separate rows e.g. [TRACE-1000, TRACE-1001] becomes [TRACE-1000] [TRACE-1001]
   * @param {array} data 
   */
  const splitTableIssues = (data) => {
    let dataCopy = [];
    
    data.forEach(row => {
      if (row.issues.length < 2) {
        dataCopy.push(row);
      }
      else {
        for (let i = 0; i < row.issues.length; ++i) {
          const rowCopy = Object.assign({}, row);
          rowCopy.issues = row.issues[i]; 
          dataCopy.push(rowCopy);
        }
      }
    });

    return dataCopy;
  }

  const [tableDataSplitIssues, setTableDataSplitIssues] = React.useState(splitTableIssues(aggregateTableData(data)));
  const [tableDataAggregated, setTableDataAggregated] = React.useState(aggregateTableData(data));
  const [tableData, setTableData] = React.useState(tableDataAggregated);
  const [groupIssues, setGroupIssues] = React.useState(false);

  /**
   * "name": "*A*",
      "link": "../demos/testUnit.js#L3",
      "issues": "TRACE-1001, TRACE-1002",
      "shortLink": "testUnit.js",
      "type": "Unit"
   */
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'requirement', // accessor is the "key" in the rowData
        Cell: ({ cell: { value }}) => {
          if (value) {
            return <div className="markdown-wrapper"><Markdown id="TracingReport" src={value} /></div>
          }
          return null;
        },
      },
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the rowData
        Cell: ({ cell: { value }}) => {
          if (value) {
            return <div className="markdown-wrapper"><Markdown id="TracingReport" src={value} /></div>
          }
          return null;
        },
      },
      {
        Header: 'Issues',
        accessor: 'issues',
        Cell: (props) => {
          if (Array.isArray(props.cell.value)) {
            return <div className="markdown-wrapper"><Markdown id="TracingReport" src={props.cell.value.map(issue => `[${issue}](https://jira2.cerner.com/browse/${issue})`).join('\r\n')} /></div>
          }
          return null;
        },
      },
      {
        Header: 'Location',
        accessor: 'shortLink',
        Cell: (props) => {
          if (props.cell.value && props.row.original) {
            return <div className="markdown-wrapper"><Markdown id="TracingReport" src={`[${props.cell.value}](${props.row.original.link})`} baseUrl={'http://github.cerner.com/Medication-Record/mar-js/tree/master/tracing/report.md'} /></div>
          }
          else {
            //console.log(props);
          }
          return null;
        },
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ cell: { value }}) => {
          if (value) {
            return <div className="markdown-wrapper"><Markdown id="TracingReport" src={value} /></div>
          }
          return null;
        },
      },
    ],
    []
  )

  return <RequirementTable columns={columns} data={groupIssues ? tableDataSplitIssues : tableDataAggregated} />
  
}

InteractiveViewer.propTypes = propTypes;

export default InteractiveViewer;