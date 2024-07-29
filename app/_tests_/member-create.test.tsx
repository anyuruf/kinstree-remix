import { MemberCreate } from '@/components/members/member-create';
import { validator } from '@/routes/members.create';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createRemixStub } from '@remix-run/testing';
import { validationError } from 'remix-validated-form';
import { ActionFunctionArgs } from '@remix-run/node';

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

	it('Renders CreateMember component', () => {
		render(<RemixStub />);
		screen.debug();
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
			/^Create Member$/,
		);
	});
});
