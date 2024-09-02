import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useResize = () => {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = debounce(() => {
			setSize({ width: window.innerWidth, height: window.innerHeight });
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
