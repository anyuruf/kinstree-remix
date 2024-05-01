import { Link } from '@remix-run/react';

export default function AppIndexPage() {
	return (
		<p>
			No note selected. Select a note on the left, or{' '}
			<Link to="new" className="text-primary-foreground underline">
				create a new note.
			</Link>
		</p>
	);
}
