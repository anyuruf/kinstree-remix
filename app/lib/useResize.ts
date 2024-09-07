import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useResize = () => {
	const [size, setSize] = useState({});
	useEffect(() => {
		const container = document.getElementById('graphDiv');
		const containerRect = container!.getBoundingClientRect();
		const handleResize = debounce(() => {
			setSize({ width: containerRect.width, height: containerRect.height });
		}, 150);
		window.addEventListener('resize', handleResize);

		return () => {
			handleResize.cancel();
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return size;
};

export default useResize;
