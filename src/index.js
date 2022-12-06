import React from 'react';
import ReactDOM from 'react-dom'
import './functionBased/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import TodoRouter from './functionBased/components/TodoRouter';

ReactDOM.render(
    <Router>
        <TodoRouter />
    </Router>,
        document.getElementById('root'))