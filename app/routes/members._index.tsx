import { Link } from '@remix-run/react';

export default function AppIndexPage() {
	return (
		<p>
			No note selected. Select a note on the left -
			<Link to="new" className="text-primary underline">
				Or Create a new member.
			</Link>
		</p>
	);
}
