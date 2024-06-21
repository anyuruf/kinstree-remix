import { initializeDb } from '@/db.server/config.server';
import { getMember } from '@/db.server/members.server';
import { redirect } from '@remix-run/react';
import { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';

import invariant from 'tiny-invariant';
import { members } from '@/db.server/schema';
import { eq } from 'drizzle-orm';
import { Member } from '@/components/members/member';

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
	return <Member />;
}
