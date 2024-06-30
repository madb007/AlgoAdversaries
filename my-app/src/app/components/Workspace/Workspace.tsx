import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import CodeEditor from './CodeEditor/CodeEditor'

type WorkspaceProps = {};

const Workspace: React.FC<WorkspaceProps> = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Delay rendering slightly to allow for initial layout
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div className="workspace-placeholder"></div>;
    }

    return (
        <Split
            className="split bg-gray-800"
            direction="horizontal"
            sizes={[50, 50]}
            minSize={0}
            snapOffset={30}
            dragInterval={5}
        >
            <ProblemDescription />
            <CodeEditor/>
        </Split>
    );
}

export default Workspace;