import FormShell from '@/components/members/form-shell';
import FormSelect from '@/components/ui/form-select';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/ui/form-input';
import { Textarea } from '@/components/ui/textarea';
import { ValidatedForm } from 'remix-validated-form';
import { ReactNode } from 'react';
import { formatDate } from '@/lib/formatDate';

export function MemberCreate({ validator }: any): ReactNode {
	return (
		<FormShell
			title="Create Member"
			description="Fill the form fields below and click the Create button below to create a new family member"
		>
			<ValidatedForm
				validator={validator}
				method="post"
				//creates space between the action buttons  n textarea as the title
				className="space-y-4"
				id="create-member-form"
				// Added role for testing and accessibilty purposes
				role="form"
			>
				<FormInput
					name="firstName"
					label="First name"
					maxLength={48}
					required
				/>
				<FormInput name="lastName" label="Last name" maxLength={48} required />
				<FormInput name="kingdomClan" label="Kingdom-Clan" maxLength={96} />
				<FormInput name="nationality" label="Nationality" maxLength={48} />
				<FormSelect
					name="gender"
					label="Birth Sex"
					placeholder="Select birth sex"
				/>
				<FormInput name="birthDate" label="Birth date" type="date" />
				<FormInput name="deathDate" label="Death date" type="date" />
				<Textarea name="description" label="Description" maxLength={512} />
				<FormShell.Footer className="flex justify-between">
					<Button type="submit">Create member</Button>
					<Button variant="ghost" type="button">
						Cancel
					</Button>
				</FormShell.Footer>
			</ValidatedForm>
		</FormShell>
	);
}
