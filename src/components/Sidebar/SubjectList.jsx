import React from 'react';

const SubjectList = () => {
    const subjects = [
        { id: 1, name: "Web Programming", code: "BCSE203E", color: "#FFB7B2" },
        { id: 2, name: "Computer Networks", code: "BCSE308L", color: "#ADD8E6" },
        { id: 3, name: "Database Systems", code: "BCSE302L", color: "#B5EAD7" },
        { id: 4, name: "Theory of Computation", code: "BCS304L", color: "#E6E6FA" },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--text-main)' }}>Courses</h3>
            <div className="flex-col gap-sm">
                {subjects.map(subject => (
                    <div key={subject.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid #f0f0f0',
                        transition: 'background-color 0.2s'
                    }}>
                        <div>
                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{subject.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{subject.code}</div>
                        </div>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: subject.color
                        }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubjectList;
