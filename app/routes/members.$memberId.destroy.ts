import { deleteMember } from '@/db.server/members.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import invariant from 'tiny-invariant';

export const action = async ({ params }: ActionFunctionArgs) => {
	invariant(params.memberId, 'Missing contactId param');
	await deleteMember(params.memberId);
	return redirect('/members');
};
