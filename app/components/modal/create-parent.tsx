import Modal from './modal';
import { Button } from '../ui/button';
import { Dispatch } from 'react';
import FormInput from '../ui/form-input';
import { createParentValidator } from '@/lib/validators';
import FormShell from '../members/form-shell';
import { Form, useFetcher } from '@remix-run/react';
import { useForm } from '@rvf/remix';

interface CreateParentProps {
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
	source: string;
	target: string;
}

export function CreateParent({
	open,
	setOpen,
	source,
	target,
}: CreateParentProps) {
	// The open and setOpen variables from the modal
	// Required for frame-motion to function

	const fetcher = useFetcher();

	const form = useForm({
		// Validation schema
		validator: createParentValidator,
		id: 'create-parent',
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		//e.preventDefault()
		fetcher.submit(e.currentTarget, { method: 'POST' });
	};

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<Modal.Content open={open}>
				<FormShell
					title="Create Parent"
					description="The form fields below and click the Create member button below to create a new family member"
				>
					<form
						//creates space between the action buttons
						className="space-y-4"
						// Added role for testing and accessibilty purposes
						role="form"
						{...form.getFormProps()}
						action={'/members/' + source}
						onSubmit={handleSubmit}
					>
						<FormInput
							fieldError={form.error('source')}
							type="text"
							name="source"
							label="Parent"
							value={source}
							readOnly
						/>
						<FormInput
							fieldError={form.error('target')}
							type="text"
							name="target"
							label="Child"
							value={target}
							readOnly
						/>
						<FormShell.Footer className="flex justify-between">
							<Button type="submit" size="lg">
								Create parent
							</Button>
							<Modal.Close asChild>
								<Button variant="outline" size="lg">
									Cancel
								</Button>
							</Modal.Close>
						</FormShell.Footer>
					</form>
				</FormShell>
			</Modal.Content>
		</Modal>
	);
}
