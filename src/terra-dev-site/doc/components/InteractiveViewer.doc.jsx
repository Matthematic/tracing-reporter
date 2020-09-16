/* eslint-disable react/prop-types, import/no-extraneous-dependencies */
import React from 'react';
import InteractiveViewer from '../../../components/InteractiveViewer/InteractiveViewer';
import TracingReport from '../../../../demos/data_sort_by_id.json';

const TestComp = () => <InteractiveViewer data={TracingReport} baseUrl="http://github.cerner.com/Medication-Administration/medication-common-js/tree/master/tracing/report.md" />;

export default TestComp;
