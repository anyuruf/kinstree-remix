import { Header } from '@/components/header';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getMembers } from '@/db.server/members.server';
import { initializeDb } from '@/db.server/config.server';
import { cn } from '@/lib/styles';

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
		<div className="w-full max-h-screen">
			<Header isAuthenticated={true} />
			<main className="grid gap-2 md:grid-cols-12 p-2 md:p-3 ">
				<div className="w-full md:col-span-9 border-r ">
					{members?.length === 0 ? (
						<p className="p-4">No notes yet</p>
					) : (
						<ol>
							{members?.map(member => (
								<li key={member.id}>
									<NavLink
										className={({ isActive }) =>
											cn(
												`block border-b p-4 text-xl ${isActive ? 'bg-accent' : ''}`,
											)
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
				<div className="md:col-span-3">
					<div className="overflow-y-scroll">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
