import {
	useMemo,
	useEffect,
	useState,
	useCallback,
	lazy,
	Suspense,
	useRef,
} from 'react';
import {
	type NodeObject,
	type LinkObject,
	ForceGraphMethods,
} from 'react-force-graph-2d';
import { GraphData, LinkData, NodeData } from '@/types';
import {
	FEMALE_NODE_SIZE,
	MALE_NODE_SIZE,
	NODE_IMAGE_BOX_USER,
	NODE_IMAGE_ROUND_USER,
} from '@/constants';
import { forceCollide, forceLink, forceManyBody, forceY } from 'd3';
import * as dat from 'dat.gui';

type Node = NodeData & NodeObject;
type Link = LinkObject<NodeData, LinkData>;
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

	const getLinkColor = (d: any) => {
		return nodeMap[d.source].gender ?? null;
	};

	const getLinkWidth = useCallback(
		(link: any): number => {
			return link.id && highlightLinks.has(link.id) ? 3.5 : 2;
		},
		[highlightLinks],
	);

	const linkCurveRotation = useCallback(
		(link: any) => {
			return link.id && highlightLinks.has(link.id) ? 0.35 : 0.25;
		},
		[highlightLinks],
	);

	const linkDirectionalArrowLength = useCallback(
		(link: any) => (link.id && highlightLinks.has(link.id) ? 5.5 : 3.5),
		[highlightLinks],
	);

	const getNodeOptions = useCallback((node: Node) => {
		return node.gender === 'male'
			? { size: MALE_NODE_SIZE, url: NODE_IMAGE_BOX_USER }
			: { size: FEMALE_NODE_SIZE, url: NODE_IMAGE_ROUND_USER };
	}, []);

	const getLabel = useCallback((node: any) => {
		return `${node.firstName} ${node.lastName}`;
	}, []);

	const onNodeRightClick = useCallback((node: any, event: Event): any => {
		if (node && activeNodeId && node.id !== activeNodeId) {
			if (typeof document !== undefined) {
				console.log(Event);
				//Create form
				const form = document.createElement('form');
				form.method = 'post';
				form.onsubmit = function () {
					const response = confirm(
						'Please confirm you want to add child for active member.',
					);
					if (!response) {
						event.preventDefault();
					}
				};

				// Create form inputs
				var inputSource = document.createElement('input');
				inputSource.type = 'text';
				inputSource.name = 'source';
				inputSource.maxLength = 21;
				inputSource.minLength = 21;
				inputSource.value = activeNodeId!;

				// Create form inputs
				var inputTarget = document.createElement('input');
				inputTarget.type = 'text';
				inputTarget.name = 'target';
				inputTarget.maxLength = 21;
				inputTarget.minLength = 21;
				inputTarget.value = node.id;

				// Create submit button
				var buttonSubmit = document.createElement('input');
				buttonSubmit.type = 'submit';
				buttonSubmit.value = 'Submit';

				// Add elements to form
				form.appendChild(inputSource);
				form.appendChild(inputTarget);
				form.appendChild(buttonSubmit);

				// SubmitForm
				form.requestSubmit();
			}
		}
	}, []);

	const handleNodeInteraction = useCallback(
		(node: any | null): any => {
			if (node === null || node.id !== activeNodeId) {
				setActiveNodeId(node ? node.id : null);
			}
		},
		[setActiveNodeId, activeNodeId],
	);

	const handleNodePaint = useCallback(
		(node: any, ctx: Ctx) => {
			if (!node.x || !node.y) return;
			const { size, url } = getNodeOptions(node);
			const image = new Image();
			image.src = url;
			ctx.beginPath();
			ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI, false);
			ctx.fillStyle = '#555';
			ctx.fill();
			ctx.drawImage(image, node.x - size / 2, node.y - size / 2, size, size);
		},
		[getNodeOptions],
	);

	const fgRef = useRef<ForceGraphMethods>();

	/* useEffect(() => {
		if (fgRef.current) {
			fgRef.current.d3Force('many-boby', forceManyBody().strength(0));
		}
	}, []);
 */
	return (
		<Suspense>
			<ForceGraph
				d3VelocityDecay={0.6}
				graphData={data}
				nodeCanvasObject={handleNodePaint}
				linkAutoColorBy={getLinkColor}
				linkDirectionalArrowLength={linkDirectionalArrowLength}
				linkCurvature={linkCurveRotation}
				linkWidth={getLinkWidth}
				minZoom={0.65}
				onNodeClick={handleNodeInteraction}
				onNodeRightClick={onNodeRightClick}
				nodeLabel={getLabel}
				ref={fgRef}
			/>
		</Suspense>
	);
};
