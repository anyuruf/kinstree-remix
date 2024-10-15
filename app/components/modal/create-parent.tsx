import Modal from './modal';
import { Button } from '../ui/button';
import { Dispatch } from 'react';
import FormInput from '../ui/form-input';
import { ValidatedForm } from 'remix-validated-form';
import { createParentValidator } from '@/lib/validators';
import { Card, CardFooter } from '../ui/card';
import FormShell from '../members/form-shell';

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

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<Modal.Content open={open}>
				<FormShell
					title="Create Parent"
					description="The form fields below and click the Create member button below to create a new family member"
				>
					<ValidatedForm
						validator={createParentValidator}
						method="post"
						action="parent"
						//creates space between the action buttons
						className="space-y-4"
						id="create-parent-form"
						// Added role for testing and accessibilty purposes
						role="form"
					>
						<FormInput
							type="text"
							name="source"
							label="Parent"
							value={source}
							readOnly
						/>
						<FormInput
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
					</ValidatedForm>
				</FormShell>
			</Modal.Content>
		</Modal>
	);
}
