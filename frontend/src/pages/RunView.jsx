import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RunView = () => {
    const { id } = useParams();
    const [run, setRun] = useState(null);
    const [cases, setCases] = useState([]); // All cases relevant to this run
    const [results, setResults] = useState([]); // Results for this run
    const [selectedCase, setSelectedCase] = useState(null);
    const [resultForm, setResultForm] = useState({ status: 'PASS', comment: '' });

    useEffect(() => {
        fetchRunData();
    }, [id]);

    const fetchRunData = async () => {
        try {
            const runRes = await fetch(`/api/runs/${id}`);
            if (runRes.ok) {
                const runData = await runRes.json();
                setRun(runData);

                // Fetch Suites for Project -> Then Cases for Suites
                // Simplified: We need an endpoint to get all cases for a project or we iterate.
                // Assuming we implemented: GET /api/projects/{projectId}/suites
                // Then parallel fetch cases. This is inefficient but okay for MVP.
                // OR: I can just implement a quick backend endpoint? No, let's stick to frontend logic.

                const suitesRes = await fetch(`/api/projects/${runData.project.id}/suites`);
                if (suitesRes.ok) {
                    const suites = await suitesRes.json();
                    const casesPromises = suites.map(s => fetch(`/api/suites/${s.id}/cases`).then(r => r.json()));
                    const allCases = (await Promise.all(casesPromises)).flat();
                    setCases(allCases);
                }
            }

            const resultsRes = await fetch(`/api/runs/${id}/results`);
            if (resultsRes.ok) {
                setResults(await resultsRes.json());
            }
        } catch (e) { console.error(e); }
    };

    const handleAddResult = async (e) => {
        e.preventDefault();
        try {
            await fetch(`/api/runs/${id}/cases/${selectedCase.id}/results`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resultForm)
            });
            setSelectedCase(null);
            setResultForm({ status: 'PASS', comment: '' });
            fetchRunData();
        } catch (e) { console.error(e); }
    };

    const getStatus = (caseId) => {
        // Find latest result for this case
        const caseResults = results.filter(r => r.testCase.id === caseId);
        if (caseResults.length === 0) return 'UNTESTED';
        // Assuming results are returned in order or we sort. 
        // Backend doesn't guarantee order, but normally latest insert is last. 
        // We'll trust the list order for MVP.
        return caseResults[caseResults.length - 1].status;
    };

    // Helper for status color
    const getStatusClass = (status) => {
        if (status === 'PASS') return 'pass';
        if (status === 'FAIL') return 'fail';
        return 'blocked';
    }

    if (!run) return <div>Loading...</div>;

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: 1, paddingRight: '2rem' }}>
                <h1>Test Run: {run.name}</h1>
                <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    Project: {run.project.name} | Status: {run.status}
                </div>

                <div className="card">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Latest Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map(c => {
                                const status = getStatus(c.id);
                                return (
                                    <tr key={c.id}>
                                        <td>C{c.id}</td>
                                        <td>{c.title}</td>
                                        <td><span className={`badge ${getStatusClass(status)}`}>{status}</span></td>
                                        <td>
                                            <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => setSelectedCase(c)}>
                                                Result
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedCase && (
                <div style={{ width: '300px', background: 'var(--card-bg)', borderLeft: '1px solid var(--border-color)', padding: '1rem' }}>
                    <h3>Add Result</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{selectedCase.title}</p>
                    <form onSubmit={handleAddResult}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
                            <select className="input" value={resultForm.status} onChange={e => setResultForm({ ...resultForm, status: e.target.value })}>
                                <option value="PASS">Passed</option>
                                <option value="FAIL">Failed</option>
                                <option value="BLOCKED">Blocked</option>
                                <option value="RETEST">Retest</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Comment</label>
                            <textarea className="input" rows="4" value={resultForm.comment} onChange={e => setResultForm({ ...resultForm, comment: e.target.value })}></textarea>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit</button>
                            <button type="button" className="btn" style={{ width: '100%' }} onClick={() => setSelectedCase(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default RunView;
