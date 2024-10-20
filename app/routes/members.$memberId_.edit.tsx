import { editMember, getMember } from '@/db.server/members.server';
import { redirect } from '@remix-run/react';
import { validationError } from '@rvf/remix';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { MemberEdit } from '@/components/members/member-edit';
import { editValidator } from '@/lib/validators';

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.memberId, 'Expected memberId param');
	const member = await getMember(params.memberId);

	if (!member) {
		throw new Response('Not Found', { status: 404 });
	}
	return member;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = await editValidator.validate(await request.formData());
	if (data.error) return validationError(data.error, data.submittedData);

	const { deathDate, birthDate, ...rest } = data.data;
	const [{ insertedId }] = await editMember({
		birthDate: birthDate ? new Date(birthDate) : null,
		deathDate: deathDate ? new Date(deathDate) : null,
		...rest,
	});

	return redirect(`/members/${insertedId}`);
};

export default function EditMember() {
	return <MemberEdit validator={editValidator} />;
}
