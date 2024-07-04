'use client'

import React, { useEffect, useState } from "react";
import { FiRefreshCcw, FiPlay, FiPause } from "react-icons/fi";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
	const [time, setTime] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(true);

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes < 10 ? "0" + minutes : minutes}:${
			seconds < 10 ? "0" + seconds : seconds
		}`;
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (isRunning) {
			intervalId = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		}
		return () => clearInterval(intervalId);
	}, [isRunning]);

	const toggleTimer = () => {
		setIsRunning(!isRunning);
	};

	const resetTimer = () => {
		setTime(0);
		setIsRunning(false);
	};

    return (
		<div className="flex items-center space-x-2 bg-dark-fill-3 p-1.5 rounded">
			<div className="text-white">{formatTime(time)}</div>
			<button 
				onClick={toggleTimer}
				className="text-white hover:text-gray-300"
			>
				{isRunning ? <FiPause /> : <FiPlay />}
			</button>
			<button 
				onClick={resetTimer}
				className="text-white hover:text-gray-300"
			>
				<FiRefreshCcw />
			</button>
		</div>
	);
};

export default Timer;