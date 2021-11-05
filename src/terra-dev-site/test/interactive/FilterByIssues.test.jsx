import React from 'react';
import InteractiveViewer from '../../../components/InteractiveViewer/InteractiveViewer';
import TracingReportData from '../../../../demos/reports/data_filter_by_issues.json';

const testComp = () => (
    <InteractiveViewer
        data={TracingReportData}
        baseUrl="http://github.cerner.com/Medication-Administration/medication-common-js/tree/master/tracing/report.md"
    />
)
export default testComp