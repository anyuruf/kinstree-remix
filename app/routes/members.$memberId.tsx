import {
	createParent,
	deleteMember,
	getMember,
} from '@/db.server/members.server';
import { redirect } from '@remix-run/react';
import { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';

import invariant from 'tiny-invariant';
import { Member } from '@/components/members/member';
import { createParentValidator } from '@/lib/validators';
import { validationError } from 'remix-validated-form';

export async function action({ params, request }: ActionFunctionArgs) {
	invariant(params.memberId, 'Missing expected memberId param');
	const data = await createParentValidator.validate(await request.formData());
	if (data.error) return validationError(data.error);

	const parentId = await createParent(data.data);

	return redirect(`/members/${parentId[0].parentId}`);
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
