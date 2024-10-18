import { createParent, getMember } from '@/db.server/members.server';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

import invariant from 'tiny-invariant';
import { Member } from '@/components/members/member';
import { validationError } from '@rvf/remix';
import { createParentValidator } from '@/lib/validators';

export async function action({ request }: ActionFunctionArgs) {
	const data = await createParentValidator.validate(await request.formData());
	if (data.error) return validationError(data.error);
	const [{ parentId }] = await createParent(data.data);
	const member = await getMember(parentId);
	if (!member) {
		throw new Response('Not Found', { status: 404 });
	}
	return { member };
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
