import { createMember } from '@/db.server/members.server';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { MemberCreate } from '@/components/members/member-create';
import { createValidator } from '@/lib/validators';
import { validationError } from '@rvf/remix';

export const action = async ({ request }: ActionFunctionArgs) => {
	let data = await createValidator.validate(await request.formData());
	if (data.error) return validationError(data.error);
	console.log(data.data);
	const { deathDate, birthDate, ...rest } = data.data;
	const [{ insertedId }] = await createMember({
		birthDate: birthDate ? new Date(birthDate) : null,
		deathDate: deathDate ? new Date(deathDate) : null,
		...rest,
	});
	return redirect(`/members/${insertedId}`);
};

export default function CreateMember() {
	return <MemberCreate validator={createValidator} />;
}
