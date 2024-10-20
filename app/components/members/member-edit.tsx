import { useLoaderData, useNavigate } from '@remix-run/react';
import FormInput from '../ui/form-input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { ReactNode } from 'react';
import FormSelect from '../ui/form-select';
import { Input } from '../ui/input';
import FormShell from './form-shell';
import { formatDate } from '@/lib/formatDate';
import { MemberData } from '@/types';
import { useForm } from '@rvf/remix';

type MemberEditInput = {
	validator: any;
};

export function MemberEdit({ validator }: MemberEditInput): ReactNode {
	// Could not use the default loader type; type errors in form for default fields
	const defaultValue = useLoaderData<MemberData>();
	const navigate = useNavigate();
	const form = useForm({
		validator,
		method: 'post',
		//defaultValues: defaultValue,
	});

	return (
		<FormShell
			title="Edit Member"
			description="Edit the form fields below and click the Save Member button below to edit family member details"
		>
			<form
				method="post"
				//creates space between the action buttons n textarea as title
				className="space-y-4"
				{...form.getFormProps()}
			>
				<Input
					fieldError={form.error('id')}
					name="id"
					type="hidden"
					defaultValue={defaultValue.id}
					minLength={21}
					maxLength={21}
				/>
				<FormInput
					fieldError={form.error('firstName')}
					name="firstName"
					label="First Name"
					defaultValue={defaultValue.firstName}
					maxLength={48}
				/>
				<FormInput
					fieldError={form.error('lastName')}
					name="lastName"
					label="Last Name"
					defaultValue={defaultValue.lastName}
					maxLength={48}
				/>
				<FormInput
					fieldError={form.error('kingdomClan')}
					name="kingdomClan"
					label="Kingdom-Clan"
					defaultValue={defaultValue?.kingdomClan}
					maxLength={96}
				/>
				<FormInput
					fieldError={form.error('nationality')}
					name="nationality"
					label="Nationality"
					defaultValue={defaultValue?.nationality}
					maxLength={48}
				/>
				<FormSelect
					fieldError={form.error('gender')}
					name="gender"
					label="Birth Sex"
					placeholder="Select birth sex"
					defaultValue={defaultValue.gender}
				/>
				<Input
					fieldError={form.error('avatarUrl')}
					name="avatarUrl"
					type="hidden"
					defaultValue={defaultValue?.avatarUrl}
					minLength={21}
					maxLength={21}
				/>
				<FormInput
					fieldError={form.error('birthDate')}
					name="birthDate"
					label="Birth date"
					type="date"
					defaultValue={formatDate(defaultValue?.birthDate)}
					max={new Date().toISOString().split('T')[0]}
				/>
				<FormInput
					fieldError={form.error('deathDate')}
					name="deathDate"
					label="Death date"
					type="date"
					defaultValue={formatDate(defaultValue?.deathDate)}
					max={new Date().toISOString().split('T')[0]}
				/>
				<Textarea
					fieldError={form.error('description')}
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
			</form>
		</FormShell>
	);
}
