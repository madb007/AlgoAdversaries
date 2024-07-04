import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Split from 'react-split';
import { EditorView, basicSetup } from 'codemirror';
import { githubDark } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import Navbar from './Navbar';
import Footer from './Footer';
import { Problem } from '../../../utils/types/problemStructure';
import { problems } from '../../../utils/problems';
import { useAuth } from '../../../context/AuthContext';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase';

type CodeEditorProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

// Code Editor using CodeMirror to get code from user
const CodeEditor: React.FC<CodeEditorProps> = ({ problem, setSuccess, setSolved }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null); //store editorView
    const [language, setLanguage] = useState('javascript');
    const { user } = useAuth();
    const [activeTestCase, setActiveTestCase] = useState<number>(0);
    let [userCode, setUserCode] = useState<string>(problem.starterCode);
    const [pid, setPid] = useState<string | undefined>(undefined);
    

    const params = useParams();
    const searchParams = useSearchParams();

    useEffect(() => {
        const pid = params.pid || searchParams.get('pid');
        if (pid) {
            setPid(pid as string);
        }
    }, [params, searchParams]);

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Log out and sign back in!", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
            return;
        }
        try {
            userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
            const callBack = new Function(`return ${userCode}`)();
            const handler = problems[pid as string].handlerFunction;
            if (typeof handler === "function") {
                const success = handler(callBack);
                if (success) {
                    toast.success("All Tests Passed!", {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "dark",
                    });
                    setSuccess(true);
                    setTimeout(() => { setSuccess(false) }, 3000);

                    const userRef = doc(firestore, "users", user.email);
                    await updateDoc(userRef, { solvedProblems: arrayUnion(pid) },);
                    setSolved(true);
                }
            }
        } catch (error: any) {
            toast.error("At Least One Test Failed:\n" + error.message, {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
        }
    };

    useEffect(() => {
        // Clean up the previous editor instance
        if (viewRef.current) {
            viewRef.current.destroy();
        }

        if (editorRef.current) {
            viewRef.current = new EditorView({
                parent: editorRef.current,
                extensions: [
                    basicSetup,
                    githubDark,
                    javascript(),
                    EditorView.updateListener.of(update => {
                        if (update.changes) {
                            const newCode = update.state.doc.toString();
                            setUserCode(newCode);
                            localStorage.setItem(`code-${pid}`, JSON.stringify(newCode));
                        }
                    })
                ],
                doc: userCode,
            });
        }
    }, []);

    useEffect(() => {
        // Update the editor content when userCode changes
        if (viewRef.current && userCode !== viewRef.current.state.doc.toString()) {
            const transaction = viewRef.current.state.update({
                changes: { from: 0, to: viewRef.current.state.doc.length, insert: userCode },
            });
            viewRef.current.dispatch(transaction);
        }
    }, [userCode]);

    useEffect(() => {
        const code = localStorage.getItem(`code-${pid}`);
        if (user) {
            setUserCode(code ? JSON.parse(code) : problem.starterCode);
        }
        else {
            toast.error("Login Error");
        }
    }, [pid, user, problem.starterCode])
    return (
        <div className='flex flex-col bg-gray-700 relative'>
            <Navbar setLanguage={setLanguage} />
            <Split className='h-[calc(100vh-125px)]' direction='vertical' sizes={[50, 50]} minSize={60}>
                <div className='w-full overflow-auto'>
                    <div ref={editorRef}></div>
                </div>
                <div className='w-full px-5 overflow-auto'>
                    <div className='flex h-10 items-center space-x-6'>
                        <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                            <div className='text-sm font-medium leading-5 text-white'>Testcases</div>
                            <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                        </div>
                    </div>
                    <div className='flex'>
                        {problem.examples.map((example, index) => (
                            <div
                                className='mr-2 items-start mt-2 '
                                key={example.id}
                                onClick={() => setActiveTestCase(index)}
                            >
                                <div className='flex flex-wrap items-center gap-y-4'>
                                    <div
                                        className={`font-medium items-center transition-all focus:outline-none inline-flex bg-gray-800 hover:bg-gray-900 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                                        ${activeTestCase === index ? "text-white" : "text-gray-500"}
									`}
                                    >
                                        Case {index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='font-semibold my-4'>
                        <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-800 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCase].inputText}
                        </div>
                        <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-800 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCase].outputText}
                        </div>
                    </div>
                </div>
            </Split>
            <Footer handleSubmit={handleSubmit} />
        </div>
    );
};

export default CodeEditor;