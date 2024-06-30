'use client';
import Topbar from '@/app/components/Topbar';
import React from 'react';
import Timer from '@/app/components/Timer';
import Workspace from '@/app/components/Workspace/Workspace';

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
    return (
        <div className="relative">
            <Topbar problemPage={true} />
            <div className="absolute top-5 right-[12%] z-50">
                <Timer />
            </div>
            <Workspace/>
        </div>
    );
}

export default ProblemPage;