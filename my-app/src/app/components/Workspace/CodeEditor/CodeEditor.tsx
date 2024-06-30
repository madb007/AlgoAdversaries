import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Split from 'react-split';
import { EditorView, basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';

type CodeEditorProps = {};

const CodeEditor: React.FC<CodeEditorProps> = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null); // Store the EditorView instance
  const [language, setLanguage] = useState('javascript');

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
          oneDark,
          language === 'javascript' ? javascript() :
          language === 'cpp' ? cpp() : python()
        ],
        doc: 'const a = 1;'
      });
    }
  }, [language]);

  return (
    <div className='flex flex-col bg-gray-500 relative'>
      <Navbar setLanguage={setLanguage} />
      <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
        <div className='w-full overflow-auto'>
          <div ref={editorRef}></div>
        </div>
        <div> Test Cases</div>
      </Split>
    </div>
  );
};

export default CodeEditor;