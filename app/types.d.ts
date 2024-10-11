import { SimulationLinkDatum } from 'd3-force';
export interface MemberData {
	id: string;
	firstName: string;
	lastName: string;
	kingdomClan?: string;
	gender?: string;
	nationality?: string;
	birthDate?: string;
	deathDate?: string;
	description?: string;
	avatarUrl?: string;
}

export interface NodeData {
	id: string;
	firstName: string;
	lastName: string;
	kingdomClan?: string;
	gender?: string;
	nationality?: string;
	birthDate?: string;
	deathDate?: string;
	description?: string;
	avatarUrl?: string;
	links?: LinkData[];
}

export interface LinkData extends SimulationLinkDatum<NodeData> {
	id: string;
	source: string;
	target: string;
}

export type GraphData = {
	nodes: NodeData[];
	links: LinkData[];
};
