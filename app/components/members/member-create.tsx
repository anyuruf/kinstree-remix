import FormShell from '@/components/members/form-shell';
import FormSelect from '@/components/ui/form-select';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/ui/form-input';
import { Textarea } from '@/components/ui/textarea';
import { ReactNode } from 'react';
import { useForm } from '@rvf/remix';
import { Form } from '@remix-run/react';

export function MemberCreate({ validator }: any): ReactNode {
	const form = useForm({
		validator,
		method: 'post',
		id: 'create-member-form',
	});

	return (
		<FormShell
			title="Create Member"
			description="Fill the form fields below and click the Create member button below to create a new family member"
		>
			<Form
				method="post"
				//creates space between the action buttons  n textarea as the title
				className="space-y-4"
				// Added role for testing and accessibilty purposes
				role="form"
				{...form.getFormProps()}
			>
				<FormInput
					fieldError={form.error('firstName')}
					name="firstName"
					label="First name"
					maxLength={48}
					required
				/>
				<FormInput
					fieldError={form.error('lastName')}
					name="lastName"
					label="Last name"
					maxLength={48}
					required
				/>
				<FormInput
					fieldError={form.error('kingdomClan')}
					name="kingdomClan"
					label="Kingdom-Clan"
					maxLength={96}
				/>
				<FormInput
					fieldError={form.error('nationality')}
					name="nationality"
					label="Nationality"
					maxLength={48}
				/>
				<FormSelect
					fieldError={form.error('gender')}
					name="gender"
					label="Birth Sex"
					placeholder="Select birth sex"
				/>
				<FormInput
					fieldError={form.error('birthDate')}
					name="birthDate"
					label="Birth date"
					type="date"
					max={new Date().toISOString().split('T')[0]}
				/>
				<FormInput
					fieldError={form.error('deathDate')}
					name="deathDate"
					label="Death date"
					type="date"
					max={new Date().toISOString().split('T')[0]}
				/>
				<Textarea
					fieldError={form.error('description')}
					name="description"
					label="Description"
					maxLength={512}
				/>
				<FormShell.Footer className="flex justify-between">
					<Button type="submit">Create member</Button>
					<Button variant="ghost" type="button">
						Cancel
					</Button>
				</FormShell.Footer>
			</Form>
		</FormShell>
	);
}
