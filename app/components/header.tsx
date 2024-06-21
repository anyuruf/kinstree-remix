import { ExitIcon } from '@radix-ui/react-icons';
import { Form, Link } from '@remix-run/react';

import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle/mode-toggle';
import { KinstreeLogo } from './kinstree-logo';

export function Header({
	isAuthenticated,
}: {
	isAuthenticated: boolean | undefined;
}) {
	return (
		<>
			<Form id="logout-form" method="POST" action="/logout" />
			<header className="flex items-center justify-between px-4 md:px-8 py-2 md:py-4">
				<div className="flex items-center space-x-4">
					<Link className="flex items-center gap-1" to="/">
						<KinstreeLogo className="h-6 w-6" />
						<span className="text-lg font-bold">Kinstree</span>
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					<ModeToggle />
					{isAuthenticated && (
						<Button
							form="logout-form"
							type="submit"
							className="w-10 h-10 rounded-full"
							size="icon"
							variant="ghost"
							title="Logout"
						>
							<span className="sr-only">Logout</span>
							<ExitIcon className="h-[1.2rem] w-[1.2rem]" />
						</Button>
					)}
				</div>
			</header>
		</>
	);
}
