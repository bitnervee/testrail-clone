import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectView from './pages/ProjectView';
import SuiteView from './pages/SuiteView';
import RunView from './pages/RunView';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reports from './pages/Reports';
import Admin from './pages/Admin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/*" element={
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/projects/:id" element={<ProjectView />} />
                            <Route path="/suites/:id" element={<SuiteView />} />
                            <Route path="/runs/:id" element={<RunView />} />
                        </Routes>
                    </Layout>
                } />
            </Routes>
        </Router>
    );
}

export default App;
