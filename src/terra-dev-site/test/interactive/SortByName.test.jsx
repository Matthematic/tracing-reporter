import React from 'react';
import InteractiveViewer from '../../../components/InteractiveViewer/InteractiveViewer';
import TracingReportData from '../../../../demos/data_sort_by_name.json';


const testComp = () => (
    <InteractiveViewer
        data={TracingReportData}
        baseUrl="http://github.cerner.com/Medication-Administration/medication-common-js/tree/master/tracing/report.md"
    />
)
export default testComp