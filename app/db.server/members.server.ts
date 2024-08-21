import { PgDB, SelectMember, members, parents } from '@/db.server/schema';
import { eq } from 'drizzle-orm/sql';
import { initializeDb } from './config.server';

export async function createMember(
	db: PgDB,
	{
		lastName,
		firstName,
		description,
		gender,
		kingdomClan,
		birthDate,
		deathDate,
		avatarUrl,
	}: any,
): Promise<SelectMember> {
	return (
		(
			await db
				.insert(members)
				.values({
					firstName,
					lastName,
					description,
					gender,
					kingdomClan,
					birthDate,
					deathDate,
					avatarUrl,
				})
				.returning()
		)[0] ?? null
	);
}

export async function getMembers(
	db: PgDB,
): Promise<SelectMember[] | null | undefined> {
	return await db.select().from(members);
}

export async function editMember({
	id,
	lastName,
	firstName,
	description,
	gender,
	kingdomClan,
	nationality,
	birthDate,
	deathDate,
	avatarUrl,
}: any) {
	const db = initializeDb(process.env.DATABASE_URL!);
	return (
		(
			await db
				.update(members)
				.set({
					lastName,
					firstName,
					description,
					gender,
					kingdomClan,
					nationality,
					birthDate,
					deathDate,
					avatarUrl,
				})
				.where(eq(members.id, id))
				.returning()
		)[0] ?? null
	);
}

export async function getMember(
	id: SelectMember['id'],
): Promise<SelectMember | null | undefined> {
	const db = initializeDb(process.env.DATABASE_URL!);
	return await db.query.members.findFirst({
		where: eq(members.id, id),
	});
}

export async function getChildren(id: SelectMember['id']): Promise<any> {
	const db = initializeDb(process.env.DATABASE_URL!);
	return await db
		.select()
		.from(parents)
		.innerJoin(members, eq(parents.target, members.id))
		.where(eq(parents.source, id));
}

export async function deleteMember(
	memberId: SelectMember['id'],
): Promise<void> {
	const db = initializeDb(process.env.DATABASE_URL!);
	await db.delete(members).where(eq(members.id, memberId));
}
