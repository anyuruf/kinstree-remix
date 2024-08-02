import { Form, useLoaderData } from '@remix-run/react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { loader } from '@/routes/members.$memberId';
import { DeleteModal } from '../modal/delete-modal';
import { format } from 'date-fns';

export function Member() {
	const { member } = useLoaderData<typeof loader>();

	const fullName = `${member.firstName} ${member.lastName}`;

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{fullName}</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-16 w-16 sm:flex">
						<AvatarImage src="/avatars/01.png" alt="Avatar" />
						<AvatarFallback delayMs={600}>OM</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
							{member.description}
						</p>
						<p className="text-sm text-muted-foreground">
							{member.kingdomClan}
						</p>
					</div>
				</div>
				<table className="table-auto">
					<tbody>
						<tr className="w-min">
							<td className="text-muted-foreground">Kingdom-Clan</td>
							<td>{member.kingdomClan}</td>
						</tr>
						<tr>
							<td className="text-muted-foreground">Birth Sex</td>
							<td className="capitalize">{member.gender}</td>
						</tr>
						<tr>
							<td className="text-muted-foreground">Nationality</td>
							<td>{member.nationality}</td>
						</tr>
						<tr>
							<td className="text-muted-foreground">D.O.B</td>
							<td>
								{member.birthDate
									? format(new Date(member.birthDate), 'MMM dd, yyyy')
									: ''}
							</td>
						</tr>
						<tr>
							<td className="text-muted-foreground">D.O.D</td>
							<td>
								{member.deathDate
									? format(new Date(member.deathDate), 'MMM dd, yyyy')
									: ''}
							</td>
						</tr>
					</tbody>
				</table>
			</CardContent>
			<CardFooter className="flex justify-around">
				<Form action="edit">
					<Button size="lg">Edit</Button>
				</Form>
				<DeleteModal />
			</CardFooter>
		</Card>
	);
}
