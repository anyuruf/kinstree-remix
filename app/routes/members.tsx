import type { ActionFunctionArgs } from '@remix-run/node';
import { Header } from '@/components/header';
import { Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import {
	createParent,
	getMember,
	getMembers,
	getParents,
} from '@/db.server/members.server';
import { PeopleGraph } from '@/components/members/member-graph';
import { GraphData } from '@/types';
import { createParentValidator } from '@/lib/validators';
import { validationError } from '@rvf/remix';

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = await createParentValidator.validate(await request.formData());
	if (data.error) return validationError(data.error);
	const [{ parentId }] = await createParent(data.data);
	const member = await getMember(parentId);
	if (!member) {
		throw new Response('Not Found', { status: 404 });
	}
	return { member };
};

export async function loader() {
	const [members, parents] = await Promise.all([getMembers(), getParents()]);
	return json({
		nodes: members,
		links: parents,
	});
}

export default function MembersPage() {
	const { nodes, links } = useLoaderData<GraphData>();
	if (!nodes || !links) throw new Response('Not Found', { status: 404 });

	return (
		<div className="w-full max-h-screen">
			<Header isAuthenticated={true} />
			<main className="grid gap-2 md:grid-cols-12 p-2 md:p-3 ">
				<div
					id="graphDiv"
					className="w-full md:col-span-9 border-r overflow-x-clip "
				>
					<PeopleGraph data={{ nodes, links }} />
				</div>
				<div className="md:col-span-3">
					<div>
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
