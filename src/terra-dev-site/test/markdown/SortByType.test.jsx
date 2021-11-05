import React from 'react';
import MarkdownViewer from '../../../components/MarkdownViewer';
import TracingReportMarkdown from '!raw-loader!../../../../demos/reports/sort_by_type.md';


const testComp = () => (
    <MarkdownViewer
        report={TracingReportMarkdown}
        baseUrl="http://github.cerner.com/Medication-Administration/medication-common-js/tree/master/tracing/report.md"
    />
)
export default testComp