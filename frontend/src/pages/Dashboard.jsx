import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({ name: '', description: '' });
                setShowForm(false);
                fetchProjects();
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Projects</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    + New Project
                </button>
            </div>

            {showForm && (
                <div className="card">
                    <h3>Create New Project</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            placeholder="Project Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <input
                            className="input"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn btn-primary">Create</button>
                            <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-3">
                {projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card" style={{ height: '100%', transition: 'transform 0.2s', cursor: 'pointer' }}>
                            <h3 style={{ color: 'var(--primary-color)' }}>{project.name}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {projects.length === 0 && !showForm && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    No projects found. Create one to get started.
                </div>
            )}
        </div>
    );
};

export default Dashboard;
