import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SuiteView = () => {
    const { id } = useParams();
    const [cases, setCases] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', type: 'Functional', priority: 'Medium', description: '' });

    useEffect(() => {
        fetchCases();
    }, [id]);

    const fetchCases = async () => {
        try {
            const res = await fetch(`/api/suites/${id}/cases`);
            if (res.ok) setCases(await res.json());
        } catch (e) { console.error(e); }
    };

    const handleCreateCase = async (e) => {
        e.preventDefault();
        try {
            await fetch(`/api/suites/${id}/cases`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setFormData({ title: '', type: 'Functional', priority: 'Medium', description: '' });
            setShowForm(false);
            fetchCases();
        } catch (e) { console.error(e); }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1>Test Suite</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ New Case</button>
            </div>

            {showForm && (
                <div className="card">
                    <form onSubmit={handleCreateCase}>
                        <input className="input" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <select className="input" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option>Functional</option>
                                <option>Regression</option>
                                <option>Smoke</option>
                            </select>
                            <select className="input" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                        <textarea className="input" placeholder="Description" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        <button type="submit" className="btn btn-primary">Save Case</button>
                    </form>
                </div>
            )}

            <div className="card">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map(c => (
                            <tr key={c.id}>
                                <td>C{c.id}</td>
                                <td>
                                    <strong>{c.title}</strong>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.description}</div>
                                </td>
                                <td>{c.type}</td>
                                <td>{c.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuiteView;
