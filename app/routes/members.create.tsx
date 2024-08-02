import { initializeDb } from '@/db.server/config.server';
import { createMember } from '@/db.server/members.server';
import { withZod } from '@remix-validated-form/with-zod';
import { validationError } from 'remix-validated-form';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { z } from 'zod';
import { parseISO } from 'date-fns';
import { MemberCreate } from '@/components/members/member-create';
import { useActionData } from '@remix-run/react';

const genderEnum = ['male', 'female'] as const;

export const validator = withZod(
	z.object({
		firstName: z
			.string()
			.min(1, { message: 'First name is required' })
			.max(48, { message: 'First name characters may not exceed 48' }),
		lastName: z
			.string()
			.min(1, { message: 'Last name is required' })
			.max(48, { message: 'Last name characters may not exceed 48' }),
		kingdomClan: z
			.string()
			.max(96, { message: 'Kingdom-Clan characters may not exceed 96' }),
		gender: z.enum(genderEnum),
		nationality: z
			.string()
			.max(96, { message: 'Nationality characters may not exceed 48' }),
		birthDate: z.string(), // No need for date validation as parseDate below
		deathDate: z.string(), // will throw with an invalid string
		description: z
			.string()
			.max(512, { message: 'Description characters may not exceed 512' }),
	}),
);

export const action = async ({ request }: ActionFunctionArgs) => {
	let data = await validator.validate(await request.formData());
	if (data.error) return validationError(data.error, data.submittedData);

	const { deathDate, birthDate, ...rest } = data.data;
	const db = initializeDb(process.env.DATABASE_URL!);
	const createdMember = await createMember(db, {
		birthDate: birthDate ? new Date(birthDate) : null,
		deathDate: deathDate ? new Date(deathDate) : null,
		...rest,
	});

	return redirect(`/members/${createdMember.id}`);
};

export default function CreateMember() {
	const actionData = useActionData<typeof action>();

	return (
		<MemberCreate
			validator={validator}
			defaultValues={actionData?.repopulateFields}
		/>
	);
}
