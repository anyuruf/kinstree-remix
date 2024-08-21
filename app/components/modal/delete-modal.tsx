import Modal from './modal';
import { Button } from '../ui/button';
import { Form } from '@remix-run/react';
import { useState } from 'react';

export function DeleteModal() {
	const [open, setOpen] = useState(false);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<Modal.Button asChild>
				<Button variant="destructive" size="lg">
					Delete
				</Button>
			</Modal.Button>
			<Modal.Content title="Delete member info!" open={open}>
				<p className="mt-4 text-sm text-muted-foreground">
					This action cannot be undone. Sure want to permanently delete member's
					information from the servers?
				</p>
				<div className="flex items-center gap-4 md:gap-0 sm:flex-row-reverse justify-around pt-6">
					<Form method="post">
						<Button variant="destructive" size="lg">
							Confirm Delete
						</Button>
					</Form>
					<Modal.Close asChild>
						<Button variant="outline" size="lg">
							Cancel
						</Button>
					</Modal.Close>
				</div>
			</Modal.Content>
		</Modal>
	);
}
