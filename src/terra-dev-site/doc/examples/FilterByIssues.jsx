import React from 'react';
import MarkdownViewer from '../../../components/MarkdownViewer';
import InteractiveViewer from '../../../components/InteractiveViewer/InteractiveViewer';

import TracingReportMarkdown from '!raw-loader!../../../../demos/reports/filter_by_issues.md';
import TracingReportData from '../../../../demos/reports/data_filter_by_issues.json';

const testComp = () => (
    <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
            <h1>Markdown</h1>
            <MarkdownViewer
                report={TracingReportMarkdown}
                baseUrl="http://github.cerner.com/Medication-Administration/medication-common-js/tree/master/tracing/report.md"
            />
        </div>
        <div style={{ width: '50%' }}>
            <h1>Interactive</h1>
            <InteractiveViewer
                data={TracingReportData}
                baseUrl="http://github.cerner.com/Medication-Administration/medication-common-js/tree/master/tracing/report.md"
            />
        </div>
    </div>
)
export default testComp