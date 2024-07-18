import { Button } from '@/components/ui/button';
import FormInput from '@/components/ui/form-input';
import { Textarea } from '@/components/ui/textarea';
import { initializeDb } from '@/db.server/config.server';
import { createMember } from '@/db.server/members.server';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { z } from 'zod';

import FormShell from '@/components/members/form-shell';
import FormSelect from '@/components/ui/form-select';
import { parseISO } from 'date-fns';

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
		birthDate: z.string(), //Turn string to date
		deathDate: z.string(),
		description: z
			.string()
			.max(512, { message: 'Description characters may not exceed 512' }),
	}),
);

export const action = async ({ request }: ActionFunctionArgs) => {
	let data = await validator.validate(await request.formData());
	console.log(data);
	if (data.error) return validationError(data.error, data.submittedData);

	const { deathDate, birthDate, ...rest } = data.data;

	const db = initializeDb(process.env.DATABASE_URL!);
	const createdMember = await createMember(db, {
		birthDate: birthDate ? parseISO(birthDate) : undefined,
		deathDate: deathDate ? parseISO(deathDate) : undefined,
		...rest,
	});

	return redirect(`/members/${createdMember.id}`);
};

export default function CreateMember() {
	return (
		<FormShell
			title="Create Member"
			description="Fill the form fields below and click the Create button below to create a new family member"
		>
			<ValidatedForm validator={validator} method="post" className="space-y-4">
				<FormInput name="firstName" label="First Name" />
				<FormInput name="lastName" label="Last Name" />
				<FormInput name="kingdomClan" label="Kingdom-Clan" />
				<FormInput name="nationality" label="Nationality" />
				<FormSelect
					name="gender"
					label="Birth Sex"
					placeholder="Select birth sex"
				/>
				<FormInput name="birthDate" label="Birth date" type="date" />
				<FormInput name="deathDate" label="Death date" type="date" />
				<Textarea name="description" label="Description" />
				<FormShell.Footer className="flex justify-between">
					<Button type="submit">Create </Button>
					<Button variant="ghost" type="button">
						Cancel
					</Button>
				</FormShell.Footer>
			</ValidatedForm>
		</FormShell>
	);
}
