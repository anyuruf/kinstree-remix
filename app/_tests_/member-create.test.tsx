import { MemberCreate } from '@/components/members/member-create';
import { validator } from '@/routes/members.create';
import { logRoles, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createRemixStub } from '@remix-run/testing';
import { validationError } from 'remix-validated-form';
import { ActionFunctionArgs } from '@remix-run/node';
import { string } from 'zod';
import { extractRemixPluginContext } from '@remix-run/dev/dist/vite/plugin';

describe('Create member component', () => {
	const RemixStub = createRemixStub([
		{
			path: '/',
			action: async ({ request }: ActionFunctionArgs) => {
				let data = await validator.validate(await request.formData());
				if (data.error) return validationError(data.error, data.submittedData);
				return data.data;
			},
			Component: () => <MemberCreate validator={validator} />,
		},
	]);
	interface labelTextAttrInput {
		label: string;
		name: string;
		selector?: string;
	}

	/**
	 * @description
	 * Function that checks if a given label has an input assigned with the given name
	 * @params
	 * An object/{} with label as string, name as string and an optional selector as string
	 * @example
	 * labelTextAttribute({ label: 'Last Name', name: 'lastName', selector: 'input' });
	 * @functionBody
	 * expect(
			screen.getByLabelText(label, { selector: selector }),
		).toHaveAttribute('name', name);
	 * */

	function labelTextAttribute({
		label,
		name,
		selector = 'input',
	}: labelTextAttrInput) {
		expect(
			screen.getByLabelText(label, { selector: selector }),
		).toHaveAttribute('name', name);
	}

	it('Renders CreateMember component and checks for all the form elements', () => {
		render(<RemixStub />);
		//Expect H1 heading
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
			/^Create Member$/,
		);
		//Expect form with fields
		expect(screen.getByRole('form')).toHaveAttribute(
			'id',
			'create-member-form',
		);

		// All the form elements
		labelTextAttribute({ label: 'First name', name: 'firstName' });
		labelTextAttribute({ label: 'Last name', name: 'lastName' });
		labelTextAttribute({ label: 'Kingdom-Clan', name: 'kingdomClan' });
		labelTextAttribute({ label: 'Nationality', name: 'nationality' });
		expect(screen.getByRole('combobox')).toHaveTextContent('Select birth sex');
		labelTextAttribute({ label: 'Birth date', name: 'birthDate' });
		labelTextAttribute({ label: 'Death date', name: 'deathDate' });
		labelTextAttribute({
			label: 'Description',
			name: 'description',
			selector: 'textarea',
		});
		expect(
			screen.getByRole('button', { name: 'Create member' }),
		).toHaveAttribute('type', 'submit');
		expect(screen.getByRole('button', { name: 'Cancel' })).toHaveAttribute(
			'type',
			'button',
		);
	});
});
