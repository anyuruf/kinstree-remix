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

export interface NodeData extends MemberData {
	links?: LinkData[];
}

export interface LinkData {
	id: string;
	source: string;
	target: string;
}

export type GraphData = {
	nodes: NodeData[];
	links: LinkData[];
};
