import { useNavigate } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import FormInput from '../ui/form-input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { ReactNode } from 'react';
import FormSelect from '../ui/form-select';
import { SelectMember } from '@/db.server/schema';
import { Input } from '../ui/input';
import FormShell from './form-shell';

type MemberEditInput = {
	validator: any;
	defaultValue: any;
};

export function MemberEdit({
	validator,
	defaultValue,
}: MemberEditInput): ReactNode {
	const navigate = useNavigate();
	return (
		<FormShell
			title="Edit Member"
			description="Edit the form fields below and click the Save Member button below to edit family member details"
		>
			<ValidatedForm
				id="edit-form"
				validator={validator}
				method="post"
				//creates space between the action buttons n textarea as well
				className="space-y-4"
			>
				<Input name="id" type="hidden" />
				<FormInput
					name="firstName"
					label="First Name"
					defaultValue={defaultValue.firstName}
				/>
				<FormInput
					name="lastName"
					label="Last Name"
					defaultValue={defaultValue.lastName}
				/>
				<FormInput
					name="kingdomClan"
					label="Kingdom-Clan"
					defaultValue={defaultValue.kingdomClan}
				/>
				<FormInput
					name="nationality"
					label="Nationality"
					defaultValue={defaultValue.nationality}
				/>
				<FormSelect
					name="gender"
					label="Birth Sex"
					placeholder="Select birth sex"
					defaultValue={defaultValue.gender}
				/>
				<Input
					name="avatarUrl"
					type="hidden"
					defaultValue={defaultValue.avatarUrl}
				/>
				<FormInput
					name="birthDate"
					label="Birth date"
					type="date"
					defaultValue={defaultValue.birthDate}
				/>
				<FormInput
					name="deathDate"
					label="Death date"
					type="date"
					defaultValue={defaultValue.deathDate}
				/>
				<Textarea
					name="description"
					label="Description"
					defaultValue={defaultValue.description}
				/>
				<FormShell.Footer className="flex justify-between">
					<Button type="submit">Save Changes</Button>
					<Button onClick={() => navigate(-1)} type="button" variant="outline">
						Cancel
					</Button>
				</FormShell.Footer>
			</ValidatedForm>
		</FormShell>
	);
}
