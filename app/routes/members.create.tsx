import { createMember } from '@/db.server/members.server';
import { validationError } from 'remix-validated-form';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { MemberCreate } from '@/components/members/member-create';
import { createValidator } from '@/lib/validators';

export const action = async ({ request }: ActionFunctionArgs) => {
	let data = await createValidator.validate(await request.formData());
	if (data.error) return validationError(data.error);

	const { deathDate, birthDate, ...rest } = data.data;
	const createdMember = await createMember({
		birthDate: birthDate ? new Date(birthDate) : null,
		deathDate: deathDate ? new Date(deathDate) : null,
		...rest,
	});

	return redirect(`/members/${createdMember.id}`);
};

export default function CreateMember() {
	return <MemberCreate validator={createValidator} />;
}
