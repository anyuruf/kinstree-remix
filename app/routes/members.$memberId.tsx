import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { initializeDb } from '@/db.server/config.server';
import { getMember } from '@/db.server/members.server';
import { Form, redirect, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';

import invariant from 'tiny-invariant';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/format.date';
import Modal from '@/components/modal/modal';
import { members } from '@/db.server/schema';
import { eq } from 'drizzle-orm';

export async function action({ params }: ActionFunctionArgs) {
	invariant(params.memberId, 'Missing expected memberId param');
	const memberId = params.memberId;
	const db = initializeDb(process.env.DATABASE_URL!);

	await db.delete(members).where(eq(members.id, memberId));

	return redirect('/members');
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.memberId, 'Expected params.memberId');

	const db = initializeDb(process.env.DATABASE_URL!);
	const member = await getMember(db, params.memberId);

	if (!member) {
		throw new Response('Not Found', { status: 404 });
	}
	return { member };
};

export default function MemberId() {
	const { member } = useLoaderData<typeof loader>();

	const fullName = `${member.firstName} ${member.lastName}`;

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{fullName}</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-16 w-16 sm:flex">
						<AvatarImage src="/avatars/01.png" alt="Avatar" />
						<AvatarFallback delayMs={600}>OM</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
							{member.description}
						</p>
						<p className="text-sm text-muted-foreground">
							{member.kingdomClan}
						</p>
					</div>
				</div>
				<table className="table-auto">
					<tbody>
						<tr className="w-min">
							<td className="text-muted-foreground">Kingdom-Clan</td>
							<td>{member.kingdomClan}</td>
						</tr>
						<tr>
							<td className="text-muted-foreground">Birth Sex</td>
							<td className="capitalize">{member.gender}</td>
						</tr>
						<tr>
							<td className="text-muted-foreground">Nationality</td>
							<td>{member.nationality}</td>
						</tr>
						<tr>
							<td className="text-muted-foreground">D.O.B</td>
							<td>{formatDate(member.birthDate)}</td>
						</tr>
						<tr>
							<td className="text-muted-foreground">D.O.D</td>
							<td>{formatDate(member.deathDate)}</td>
						</tr>
					</tbody>
				</table>
			</CardContent>
			<CardFooter className="flex justify-around">
				<Button size="lg">Edit</Button>
				<Modal>
					<Modal.Button asChild>
						<Button variant="destructive" size="lg">
							Delete
						</Button>
					</Modal.Button>
					<Modal.Content title="Sure want to delete the member?">
						<p className="mt-4">
							This action cannot be undone. Are you sure want to permanently
							delete this member from the servers?
						</p>
						<div className="flex items-center justify-around pt-6">
							<Modal.Close asChild>
								<Button variant="outline" size="lg">
									Cancel
								</Button>
							</Modal.Close>
							<Form method="post">
								<Button variant="destructive" size="lg">
									Confirm Delete
								</Button>
							</Form>
						</div>
					</Modal.Content>
				</Modal>
			</CardFooter>
		</Card>
	);
}
