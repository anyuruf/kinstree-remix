import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calender';
import FormInput from '@/components/ui/form-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { initializeDb } from '@/db.server/config.server';
import { createMember } from '@/db.server/members.server';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { z } from 'zod';

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
		birthDate: z.string(),
		deathDate: z.string(),
		description: z
			.string()
			.max(512, { message: 'Description characters may not exceed 512' }),
	}),
);

export const action = async ({ request, context }: ActionFunctionArgs) => {
	const data = await validator.validate(await request.formData());
	if (data.error) return validationError(data.error, data.submittedData);

	const db = initializeDb(process.env.DATABASE_URL!);
	const {
		firstName,
		lastName,
		kingdomClan,
		gender,
		nationality,
		birthDate,
		deathDate,
		description,
	} = data.data;
	const createdMember = await createMember(db, {
		firstName,
		lastName,
		kingdomClan,
		gender,
		nationality,
		birthDate,
		deathDate,
		description,
	});

	return redirect(`/members/${createdMember.id}`);
};

export default function CreateMember() {
	return (
		<ValidatedForm validator={validator} method="post">
			<FormInput name="firstName" label="First Name" />
			<FormInput name="lastName" label="Last Name" />
			<FormInput name="kingdomClan" label="Kingdom-Clan" />
			<FormInput name="nationality" label="Nationality" />
			<RadioGroup name="gender" label="Gender">
				<RadioGroupItem name="male" label="Male" />
				<RadioGroupItem name="female" label="Female" />
			</RadioGroup>
			<Calendar name="birthDate" label="Birth date" />
			<Calendar name="deathDate" label="Death date" />
			<Textarea name="description" label="Description" />
			<Button type="submit" />
		</ValidatedForm>
	);
}
