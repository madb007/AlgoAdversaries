'use client'

import React, { useState ,useEffect} from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";

type NavbarProps = {
    setLanguage: (language: string) => void;
};

// Frontend Code for Navbar In Problems Page
const Navbar: React.FC<NavbarProps> = ({ setLanguage }) => {
    const [isFullScreen,setIsFullScreen] = useState(false);
    const handleFullScreen = () => {
        if(!isFullScreen){
            document.documentElement.requestFullscreen();
        }
        else{
            document.exitFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    }

    useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

    return (
        <div className='flex items-center justify-between bg-gray-800 h-11 w-full'>
            <div className='flex items-center'>
                <select
                    className='flex cursor-pointer items-center focus:outline-none bg-gray-700  hover:bg-gray-800  px-2 py-1.5 text-xs text-white'
                //   onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value='javascript'>JavaScript</option>
                    {/* <option value='cpp'>C++</option>
          <option value='python'>Python</option> */}
                </select>
            </div>

            <div className='flex items-center m-1'>
                <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-dark-fill-3 group' onClick={handleFullScreen}>
                    <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                        {isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit/>}
                        
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Navbar;