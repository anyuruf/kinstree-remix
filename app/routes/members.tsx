import { Header } from '@/components/header';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getMembers } from '@/db.server/members.server';
import { initializeDb } from '@/db.server/config.server';

export async function loader() {
	const db = initializeDb(process.env.DATABASE_URL!);
	const members = await getMembers(db);

	return json({
		members,
	});
}

export default function MembersPage() {
	const { members } = useLoaderData<typeof loader>();

	return (
		<div className="h-full min-h-screen w-full">
			<Header isAuthenticated={true} />
			<main className="grid gap-2 md:grid-cols-12 h-full p-2 md:p-3">
				<div className="h-full w-full md:col-span-9 border-r ">
					{members?.length === 0 ? (
						<p className="p-4">No notes yet</p>
					) : (
						<ol>
							{members?.map(member => (
								<li key={member.id}>
									<NavLink
										className={({ isActive }) =>
											`block border-b p-4 text-xl ${isActive ? 'bg-white' : ''}`
										}
										to={`${member.id}`}
									>
										📝 {member.firstName}
									</NavLink>
								</li>
							))}
						</ol>
					)}
				</div>
				<div className="h-full md:col-span-3">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
