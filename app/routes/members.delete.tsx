import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { initializeDb } from '@/db.server/config.server';
import { members } from '@/db.server/schema';
import { eq } from 'drizzle-orm/sql';
import invariant from 'tiny-invariant';

export async function action({ context, params }: ActionFunctionArgs) {
	invariant(params.memberId, 'Missing expected memberId param');
	const memberId = params.memberId;
	const db = initializeDb(process.env.DATABASE_URL!);

	await db.delete(members).where(eq(members.id, memberId));

	return redirect('/members');
}

export default async function DeleteMember() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Share</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Sure want to delete the member?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. Are you sure you want to permanently
						delete this member from our servers?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button type="submit">Confirm</Button>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
