import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'terra-markdown';
import smoothscroll from 'smoothscroll-polyfill';
import RequirementTable from './RequirementTable';
import TableMap from '../../models/TableMap';
import '../../styles/MarkdownViewerStyles.scss';

smoothscroll.polyfill();

export const propTypes = {
  /** the url that is prepended to all hyperlinks in the report. */
  baseUrl: PropTypes.string.isRequired,
  /** the raw data of the report's data file. */
  data: PropTypes.array.isRequired,
};


const InteractiveViewer = ({ baseUrl, data }) => {
  const tableMap = new TableMap(data);

  const [tableDataSplitIssues] = React.useState(tableMap.getTestsSplitByIssue());
  const [tableDataAggregated] = React.useState(tableMap.getTests());
  const [groupIssues] = React.useState(false);


  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', // accessor is the "key" in the rowData
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
        Header: 'Location',
        accessor: 'shortLink',
        Cell: (props) => {
          if (props.cell.value && props.row.original) {
            return <div className="markdown-wrapper"><Markdown id="TracingReport" src={`[${props.cell.value}](${props.row.original.link})`} baseUrl={baseUrl + '/tree/master/tree/master'} /></div>
          }
          else {
            //console.log(props);
          }
          return null;
        },
      },
      {
        Header: 'Issues',
        accessor: 'issues',
        Cell: (props) => {
          if (Array.isArray(props.cell.value)) {
            return <div className="markdown-wrapper"><Markdown id="TracingReport" src={props.cell.value.map(issue => `[${issue}](https://jira2.cerner.com/browse/${issue})`).join('\n')} /></div>
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