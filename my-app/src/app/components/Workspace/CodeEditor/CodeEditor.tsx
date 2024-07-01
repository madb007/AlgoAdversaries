import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Split from 'react-split';
import { EditorView, basicSetup } from 'codemirror';
import { githubDark } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import Footer from './Footer';
import {Problem} from '@/app/utils/types/problemStructure';

type CodeEditorProps = {
    problem: Problem;
};

//Code Editor using CodeMirror to get code from user
const CodeEditor: React.FC<CodeEditorProps> = ({problem}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null); //store editorView
    const [language, setLanguage] = useState('javascript');

    const[activeTestCase,setActiveTestCase] = useState<number>(0);

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
                    language === 'javascript' ? javascript() :
                        language === 'cpp' ? cpp() : python()
                ],
                doc: problem.starterCode,
            });
        }
    }, [language]);

    return (
        <div className='flex flex-col bg-gray-700 relative'>
            <Navbar setLanguage={setLanguage} />
            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
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
                                onClick={()=> setActiveTestCase(index)}
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
            <Footer/>
        </div>
    );
};

export default CodeEditor;