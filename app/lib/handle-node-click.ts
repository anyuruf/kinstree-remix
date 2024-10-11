import { NavigateFunction } from '@remix-run/react';
import { Dispatch, RefObject } from 'react';

interface HandleNodeInteractionProps {
	node: any | null;
	activeNodeId: string | null;
	setActiveNodeId: Dispatch<React.SetStateAction<string | null>>;
	clickTimeout: number;
	setClickTimeout: Dispatch<React.SetStateAction<number>>;
	navigate: NavigateFunction;
	setParentData: Dispatch<
		React.SetStateAction<{ source: string; target: string }>
	>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const handleNodeInteraction = ({
	node,
	activeNodeId,
	setActiveNodeId,
	clickTimeout,
	setClickTimeout,
	navigate,
	setParentData,
	setOpen,
}: HandleNodeInteractionProps) => {
	const doubleClickDelay = 350;
	// Clear the timeout if the click is fast enough
	if (clickTimeout) {
		clearTimeout(clickTimeout);
		setClickTimeout(0);
		handleDoubleClick({ node, activeNodeId, setParentData, setOpen });
	} else {
		// Set a timeout for single click
		const results = window.setTimeout(() => {
			handleSingleClick(node, activeNodeId, setActiveNodeId, navigate);
			setClickTimeout(0); // Reset timeout
		}, doubleClickDelay);

		setClickTimeout(results);
	}
};

const handleSingleClick = (
	node: any,
	activeNodeId: string | null,
	setActiveNodeId: Dispatch<React.SetStateAction<string | null>>,
	navigate: NavigateFunction,
) => {
	// it was a single click
	if (node === null || node.id !== activeNodeId) {
		setActiveNodeId(node ? node.id : null);
		navigate(`/members/${node.id}`);
	}
};
interface HandleDoubleClickProps {
	node: any;
	activeNodeId: string | null;
	setParentData: Dispatch<
		React.SetStateAction<{ source: string; target: string }>
	>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const handleDoubleClick = ({
	node,
	activeNodeId,
	setParentData,
	setOpen,
}: HandleDoubleClickProps) => {
	console.log('Double Click');
	if (node && activeNodeId && node.id !== activeNodeId) {
		if (typeof document !== undefined) {
			// Set show modal to true
			setParentData({ source: activeNodeId, target: node.id });
			setOpen(true);
		}
	}
};
