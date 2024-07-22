import { useNavigate } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import FormInput from '../ui/form-input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { ReactNode } from 'react';
import FormSelect from '../ui/form-select';

export function MemberEdit({ validator }: any): ReactNode {
	const navigate = useNavigate();
	return (
		<ValidatedForm id="edit-form" validator={validator} method="post">
			<FormInput name="id" label="id" type="hidden" />
			<FormInput name="firstName" label="First Name" />
			<FormInput name="lastName" label="Last Name" />
			<FormInput name="kingdomClan" label="Kingdom-Clan" />
			<FormInput name="nationality" label="Nationality" />
			<FormSelect
				name="gender"
				label="Birth Sex"
				placeholder="Select birth sex"
			/>
			<FormInput name="avatarUrl" label="AvatarUrl" type="hidden" />
			<FormInput name="birthDate" label="Birth date" type="date" />
			<FormInput name="deathDate" label="Death date" type="date" />
			<Textarea name="description" label="Description" />
			<Button type="submit" />
			<Button onClick={() => navigate(-1)} type="button" variant="outline">
				Cancel
			</Button>
		</ValidatedForm>
	);
}
