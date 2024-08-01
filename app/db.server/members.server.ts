import { PgDB, SelectMember, members, parents } from '@/db.server/schema';
import { eq } from 'drizzle-orm/sql';

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

export async function editMember(
	db: PgDB,
	{
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
	}: any,
) {
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
	db: PgDB,
	id: SelectMember['id'],
): Promise<SelectMember | null | undefined> {
	return await db.query.members.findFirst({
		where: eq(members.id, id),
	});
}

export async function getChildren(
	db: PgDB,
	id: SelectMember['id'],
): Promise<any> {
	return await db
		.select()
		.from(parents)
		.innerJoin(members, eq(parents.target, members.id))
		.where(eq(parents.source, id));
}
