import { ExitIcon } from '@radix-ui/react-icons';
import { Form, Link } from '@remix-run/react';

import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle/mode-toggle';

export function Header({
	isAuthenticated,
}: {
	isAuthenticated: boolean | undefined;
}) {
	return (
		<>
			<Form id="logout-form" method="POST" action="/logout" />
			<header className="flex items-center justify-between px-4 py-2 md:py-4">
				<div className="flex items-center space-x-4">
					<Link className="flex items-center space-x-2" to="/">
						{/* <HomeIcon className="h-6 w-6" /> */}
						<span className="text-lg font-bold">Kinstree</span>
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					<ModeToggle />
					{isAuthenticated && (
						<Button
							form="logout-form"
							type="submit"
							className="w-10 h-10 rounded-full border"
							size="icon"
							variant="ghost"
							title="Logout"
						>
							<span className="sr-only">Logout</span>
							<ExitIcon />
						</Button>
					)}
				</div>
			</header>
		</>
	);
}
