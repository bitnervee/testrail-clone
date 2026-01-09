import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectView = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [suites, setSuites] = useState([]);
    const [runs, setRuns] = useState([]);
    const [showSuiteForm, setShowSuiteForm] = useState(false);
    const [showRunForm, setShowRunForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [activeTab, setActiveTab] = useState('suites'); // suites or runs

    useEffect(() => {
        fetchProjectData();
    }, [id]);

    const fetchProjectData = async () => {
        try {
            const [projRes, suitesRes, runsRes] = await Promise.all([
                fetch(`/api/projects/${id}`),
                fetch(`/api/projects/${id}/suites`),
                fetch(`/api/projects/${id}/runs`)
            ]);

            if (projRes.ok) setProject(await projRes.json());
            if (suitesRes.ok) setSuites(await suitesRes.json());
            if (runsRes.ok) setRuns(await runsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCreateSuite = async (e) => {
        e.preventDefault();
        try {
            await fetch(`/api/projects/${id}/suites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            setFormData({ name: '', description: '' });
            setShowSuiteForm(false);
            fetchProjectData(); // refresh
        } catch (err) { console.error(err); }
    };

    const handleCreateRun = async (e) => {
        e.preventDefault();
        try {
            await fetch(`/api/projects/${id}/runs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            setFormData({ name: '', description: '' });
            setShowRunForm(false);
            fetchProjectData(); // refresh
        } catch (err) { console.error(err); }
    };

    if (!project) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>{project.name}</h1>
                <p style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
            </div>

            <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                <button
                    className={`btn ${activeTab === 'suites' ? 'btn-primary' : ''}`}
                    style={{ borderRadius: '0', marginRight: '1rem' }}
                    onClick={() => setActiveTab('suites')}
                >
                    Test Suites
                </button>
                <button
                    className={`btn ${activeTab === 'runs' ? 'btn-primary' : ''}`}
                    style={{ borderRadius: '0' }}
                    onClick={() => setActiveTab('runs')}
                >
                    Test Runs
                </button>
            </div>

            {activeTab === 'suites' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h2>Test Suites</h2>
                        <button className="btn btn-primary" onClick={() => setShowSuiteForm(!showSuiteForm)}>+ Add Suite</button>
                    </div>

                    {showSuiteForm && (
                        <div className="card">
                            <form onSubmit={handleCreateSuite}>
                                <input className="input" placeholder="Suite Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                <input className="input" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                <button type="submit" className="btn btn-primary">Save Suite</button>
                            </form>
                        </div>
                    )}

                    <div className="grid">
                        {suites.map(suite => (
                            <div key={suite.id} className="card">
                                <h3>{suite.name}</h3>
                                <p>{suite.description}</p>
                                {/* Link to suite details for adding cases */}
                                <Link to={`/suites/${suite.id}`} className="btn">View Cases</Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'runs' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h2>Test Runs</h2>
                        <button className="btn btn-primary" onClick={() => setShowRunForm(!showRunForm)}>+ Start Run</button>
                    </div>

                    {showRunForm && (
                        <div className="card">
                            <form onSubmit={handleCreateRun}>
                                <input className="input" placeholder="Run Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                <button type="submit" className="btn btn-primary">Start Run</button>
                            </form>
                        </div>
                    )}

                    <div className="card">
                        <table>
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {runs.map(run => (
                                    <tr key={run.id}>
                                        <td><span className="badge pass">{run.status}</span></td>
                                        <td>{run.name}</td>
                                        <td>{new Date(run.createdDate).toLocaleDateString()}</td>
                                        <td><Link to={`/runs/${run.id}`} className="btn">Execute</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectView;
