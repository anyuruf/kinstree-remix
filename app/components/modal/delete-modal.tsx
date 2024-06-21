import Modal from './modal';
import { Button } from '../ui/button';
import { Form } from '@remix-run/react';

export function DeleteModal() {
	return (
		<Modal>
			<Modal.Button asChild>
				<Button variant="destructive" size="lg">
					Delete
				</Button>
			</Modal.Button>
			<Modal.Content title="Sure want to delete the member?">
				<p className="mt-4">
					This action cannot be undone. Are you sure want to permanently delete
					this member from the servers?
				</p>
				<div className="flex items-center justify-around pt-6">
					<Modal.Close asChild>
						<Button variant="outline" size="lg">
							Cancel
						</Button>
					</Modal.Close>
					<Form method="post">
						<Button variant="destructive" size="lg">
							Confirm Delete
						</Button>
					</Form>
				</div>
			</Modal.Content>
		</Modal>
	);
}
