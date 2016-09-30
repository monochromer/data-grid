import React from 'react';
import { render } from 'react-dom';

// import 'normalize.css/normalize.css';
import './common.styl';

import DataGrid from './components/datagrid/datagrid.jsx';

render(
    <DataGrid />,
    document.getElementById('app')
);