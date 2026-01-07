import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectView from './pages/ProjectView';
import SuiteView from './pages/SuiteView';
import RunView from './pages/RunView';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects/:id" element={<ProjectView />} />
                    <Route path="/suites/:id" element={<SuiteView />} />
                    <Route path="/runs/:id" element={<RunView />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
