import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { initializeDb } from '@/db.server/config.server';
import { getMember } from '@/db.server/members.server';
import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import invariant from 'tiny-invariant';

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
	invariant(params.memberId, 'Expected params.memberId');

	const db = initializeDb(context.connectionString);
	const member = await getMember(db, params.memberId);

	if (!member) {
		throw new Response('Not Found', { status: 404 });
	}
	return json({ member });
};

export default async function MemberId() {
	const { member } = useLoaderData<typeof loader>();

	const fullName = `${member.firstName} ${member.lastName}`;

	return (
		<Card>
			<CardHeader>
				<CardTitle>{fullName}</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/01.png" alt="Avatar" />
						<AvatarFallback>OM</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">{fullName}</p>
						<p className="text-sm text-muted-foreground">
							{member.kingdomClan}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
