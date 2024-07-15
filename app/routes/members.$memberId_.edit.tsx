import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import FormInput from '@/components/ui/form-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { initializeDb } from '@/db.server/config.server';
import { editMember, getMember } from '@/db.server/members.server';
import { redirect, useNavigate, useRouteLoaderData } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import {
	ValidatedForm,
	setFormDefaults,
	validationError,
} from 'remix-validated-form';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { z } from 'zod';
import { MemberEdit } from '@/components/members/member-edit';

const genderEnum = ['male', 'female'] as const;

export const validator = withZod(
	z.object({
		id: z.string().length(21, { message: 'Nanoid for id field' }),
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
		avatarUrl: z
			.string()
			.length(21, { message: 'Nanoid for id avatarUrl field' }),
	}),
);

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.memberId, 'Expected memberId param');
	const db = initializeDb(process.env.DATABASE_URL!);
	const member = await getMember(db, params.memberId);

	if (!member) {
		throw new Response('Not Found', { status: 404 });
	}
	return json(
		setFormDefaults('editForm', {
			...member,
		}),
	);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = await validator.validate(await request.formData());
	if (data.error) return validationError(data.error, data.submittedData);

	const db = initializeDb(process.env.DATABASE_URL!);

	const editedMember = await editMember(db, {
		...data.data,
	});

	return redirect(`/members/${editedMember.id}`);
};

export default function EditMember() {
	return <MemberEdit validator={validator} />;
}
