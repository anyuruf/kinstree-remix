import {
	useMemo,
	useEffect,
	useState,
	useCallback,
	lazy,
	Suspense,
} from 'react';
import { type NodeObject, type LinkObject } from 'react-force-graph-2d';
import { GraphData, LinkData, NodeData } from '@/types';

type Node = NodeObject<NodeData> & { links?: Link[]; id: string };
type Link = LinkObject<NodeData, LinkData> & { id: string };
type NodeMap = Record<string, Node>;
type Data = { graph: { nodes: Node[]; links: Link[] }; nodeMap: NodeMap };
type Ctx = any; // eslint-disable-line

const ForceGraph = lazy(() => import('react-force-graph-2d'));

export const PeopleGraph = (props: { data: GraphData }) => {
	const { graph: data, nodeMap } = useMemo(() => {
		const data: Data = { graph: props.data, nodeMap: {} };

		// Create a map of nodes for quick access
		data.nodeMap = data.graph.nodes.reduce((acc, node) => {
			acc[node.id] = node;
			return acc;
		}, {} as NodeMap);

		// Add links to nodes
		data.graph.links.forEach(link => {
			const source = data.nodeMap[link.source];
			const target = data.nodeMap[link.target];
			if (source) {
				if (source.links === undefined) source.links = [];
				source.links.push(link);
				data.nodeMap[source.id] = source;
			}
			if (target) {
				if (target.links === undefined) target.links = [];
				target.links.push(link);
				data.nodeMap[target.id] = target;
			}
		});

		return data;
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [highlightLinks, setHighlightLinks] = useState(new Set<string>());
	const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

	// Update highlighted links when a node is selected
	useEffect(() => {
		const activeLinks = new Set<string>();
		if (activeNodeId) {
			const node = nodeMap[activeNodeId];
			if (!node) return;
			node?.links?.forEach((link: Link) => {
				link.id && activeLinks.add(link.id);
				const source = nodeMap[link.source];
				const target = nodeMap[link.target];
				source?.links?.forEach(
					(link: Link) => link.index && activeLinks.add(link.id),
				);
				target?.links?.forEach(
					(link: Link) => link.index && activeLinks.add(link.id),
				);
			});
		}
		setHighlightLinks(activeLinks);
	}, [activeNodeId, data.nodes, nodeMap]);

	const getLinkColor = useCallback(
		(link: Link): string => {
			return link.id && highlightLinks.has(link.id)
				? 'rgba(0, 174, 239, 0.4)'
				: 'rgba(170, 170, 170, 0.5)';
		},
		[highlightLinks],
	);

	const getLinkWidth = useCallback(
		(link: Link): number => {
			return link.id && highlightLinks.has(link.id) ? 5 : 1;
		},
		[highlightLinks],
	);

	const linkDirectionalParticleWidth = useCallback(
		(link: Link) => (link.id && highlightLinks.has(link.id) ? 4 : 0),
		[highlightLinks],
	);

	const getNodeSize = useCallback((node: Node): number => {
		if (node.gender === 'male') return 8;
		return 7;
	}, []);

	const handleNodeInteraction = useCallback(
		(node: NodeObject<NodeData> | null): void => {
			if (node === null || node.id !== activeNodeId) {
				setActiveNodeId(node ? node.id : null);
			}
		},
		[setActiveNodeId, activeNodeId],
	);

	const handleNodePaint = useCallback(
		(node: any, ctx: Ctx) => {
			if (!node.x || !node.y) return;
			let size = getNodeSize(node);
			const image = new Image();
			image.src = 'app/assets/react-force-graph/user-round.svg';
			ctx.beginPath();
			ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI, false);
			ctx.fillStyle = '#555';
			ctx.fill();
			ctx.drawImage(image, node.x - size / 2, node.y - size / 2, size, size);
		},
		[getNodeSize],
	);

	return (
		<Suspense>
			<ForceGraph
				d3VelocityDecay={0.6}
				graphData={data}
				nodeCanvasObject={handleNodePaint}
				/* linkColor={getLinkColor}
				linkDirectionalParticleWidth={linkDirectionalParticleWidth}
				linkDirectionalParticles={4}
				linkWidth={getLinkWidth}
				minZoom={0.75}
				nodeCanvasObject={handleNodePaint}
				nodeVal={getNodeSize}
				onNodeClick={handleNodeInteraction} */
			/>
		</Suspense>
	);
};
