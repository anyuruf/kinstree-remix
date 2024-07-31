import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Link } from '@remix-run/react';

export default function AppIndexPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Steps below</CardTitle>
				<CardDescription className="flex flex-col gap-2">
					<section>
						No member selected yet. Please select or hover over a member on the
						left if you would like more information <br /> Or <br />
					</section>
					<Link to="create">
						<Button>Create a new member</Button>
					</Link>
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
