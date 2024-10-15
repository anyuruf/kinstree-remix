import { getMember } from '@/db.server/members.server';
import { LoaderFunctionArgs } from '@remix-run/node';

import invariant from 'tiny-invariant';
import { Member } from '@/components/members/member';

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
