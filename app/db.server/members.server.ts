import {
	SelectMember,
	SelectParent,
	members,
	parents,
} from '@/db.server/schema';
import { eq } from 'drizzle-orm/sql';
import { initializeDb } from './config.server';

export async function createMember({
	lastName,
	firstName,
	description,
	gender,
	kingdomClan,
	birthDate,
	deathDate,
	nationality,
	avatarUrl,
}: any) {
	const db = initializeDb(process.env.DATABASE_URL!);

	return await db
		.insert(members)
		.values({
			firstName,
			lastName,
			description,
			gender,
			kingdomClan,
			birthDate,
			deathDate,
			nationality,
			avatarUrl,
		})
		.returning({ insertedId: members.id });
}

export async function getMembers(): Promise<SelectMember[] | null | undefined> {
	const db = initializeDb(process.env.DATABASE_URL!);
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
	return await db
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
		.returning({ insertedId: members.id });
}

export async function getMember(
	id: SelectMember['id'],
): Promise<SelectMember | null | undefined> {
	const db = initializeDb(process.env.DATABASE_URL!);
	return await db.query.members.findFirst({
		where: eq(members.id, id),
	});
}

export async function deleteMember(
	memberId: SelectMember['id'],
): Promise<void> {
	const db = initializeDb(process.env.DATABASE_URL!);
	await db.delete(members).where(eq(members.id, memberId));
}

// Parents
export async function getParents(): Promise<SelectParent[] | null | undefined> {
	const db = initializeDb(process.env.DATABASE_URL!);
	return await db.select().from(parents);
}

export async function createParent({ source, target }: any) {
	const db = initializeDb(process.env.DATABASE_URL!);

	return await db
		.insert(parents)
		.values({
			source,
			target,
		})
		.returning({ insertedId: parents.source });
}
