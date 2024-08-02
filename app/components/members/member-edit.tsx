import { useNavigate } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import FormInput from '../ui/form-input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { ReactNode } from 'react';
import FormSelect from '../ui/form-select';
import { Input } from '../ui/input';
import FormShell from './form-shell';
import { format } from 'date-fns';
import { formatDate } from '@/lib/formatDate';

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
				//creates space between the action buttons n textarea as title
				className="space-y-4"
			>
				<Input
					name="id"
					type="hidden"
					defaultValue={defaultValue.id}
					minLength={21}
					maxLength={21}
				/>
				<FormInput
					name="firstName"
					label="First Name"
					defaultValue={defaultValue.firstName}
					maxLength={48}
				/>
				<FormInput
					name="lastName"
					label="Last Name"
					defaultValue={defaultValue.lastName}
					maxLength={48}
				/>
				<FormInput
					name="kingdomClan"
					label="Kingdom-Clan"
					defaultValue={defaultValue?.kingdomClan}
					maxLength={96}
				/>
				<FormInput
					name="nationality"
					label="Nationality"
					defaultValue={defaultValue?.nationality}
					maxLength={48}
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
					defaultValue={defaultValue?.avatarUrl}
					minLength={21}
					maxLength={21}
				/>
				<FormInput
					name="birthDate"
					label="Birth date"
					type="date"
					defaultValue={formatDate(defaultValue?.birthDate)}
					max={Date.now()}
				/>
				<FormInput
					name="deathDate"
					label="Death date"
					type="date"
					defaultValue={formatDate(defaultValue?.deathDate)}
				/>
				<Textarea
					name="description"
					label="Description"
					defaultValue={defaultValue?.description}
					maxLength={640}
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
