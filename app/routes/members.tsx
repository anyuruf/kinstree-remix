import { Header } from '@/components/header';
import { initializeDb } from '@/db.server/config.server';
import { getMembers } from '@/db.server/members.server';
import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const db = initializeDb(context.connectionString);
	const members = await getMembers(db);
	return json({ members });
};

export default function MembersPage() {
	const data = useLoaderData<typeof loader>();

	return (
		<div className="h-full min-h-screen w-full">
			<Header isAuthenticated={true} />
			<main className="grid md:grid-cols-12 h-full">
				<div className="h-full md:grid-cols-span-9 border-r ">
					{data.members?.length === 0 ? (
						<p className="p-4">No notes yet</p>
					) : (
						<ol>
							{data.members?.map(member => (
								<li key={member.id}>
									<NavLink
										className={({ isActive }) =>
											`block border-b p-4 text-xl ${isActive ? 'bg-white' : ''}`
										}
										to={member.id}
									>
										📝 {member.firstName}
									</NavLink>
								</li>
							))}
						</ol>
					)}
				</div>
				<div className="h-full md:grid-cols-span-3">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
