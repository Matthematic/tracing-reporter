import React from 'react';
import MarkdownViewer from '../../../components/MarkdownViewer';
import TracingReport from '!raw-loader!../../../../demos/reports/sort_by_name.md';


const TestComp = () => <MarkdownViewer report={TracingReport} baseUrl="http://github.cerner.com/Medication-Administration/medication-common-js/tree/master/tracing/report.md" />;

export default TestComp;
