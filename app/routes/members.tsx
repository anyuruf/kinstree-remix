import { Header } from '@/components/header';
import { Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getMembers, getParents } from '@/db.server/members.server';
import { PeopleGraph } from '@/components/members/member-graph';

export async function loader() {
	const [members, parents] = await Promise.all([getMembers(), getParents()]);
	return json({
		nodes: members,
		links: parents,
	});
}

export default function MembersPage() {
	const { nodes, links } = useLoaderData<any>();
	if (!nodes || !links) throw new Response('Not Found', { status: 404 });

	return (
		<div className="w-full max-h-screen">
			<Header isAuthenticated={true} />
			<main className="grid gap-2 md:grid-cols-12 p-2 md:p-3 ">
				<div className="w-full md:col-span-9 border-r overflow-x-clip ">
					<PeopleGraph data={{ nodes, links }} />
				</div>
				<div className="md:col-span-3">
					<div className="overflow-y-scroll">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
