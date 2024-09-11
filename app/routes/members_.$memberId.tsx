import { deleteMember, getMember } from '@/db.server/members.server';
import { redirect } from '@remix-run/react';
import { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';

import invariant from 'tiny-invariant';
import { Member } from '@/components/members/member';

export async function action({ params }: ActionFunctionArgs) {
	invariant(params.memberId, 'Missing expected memberId param');
	await deleteMember(params.memberId);

	return redirect('/members');
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.memberId, 'Expected params.memberId');
	const member = await getMember(params.memberId);

	if (!member) {
		throw new Response('Not Found', { status: 404 });
	}
	return { member };
};

export default function MemberId() {
	return <Member />;
}
