import { ReactNode } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';

type FormShellInput = {
	children: ReactNode;
	title: string;
	description: string;
};

export default function FormShell({
	children,
	title,
	description,
}: FormShellInput) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}

FormShell.Footer = CardFooter;
