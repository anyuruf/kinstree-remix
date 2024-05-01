
import { nanoid } from 'nanoid'
import { pgTable, text, varchar, pgEnum, date } from 'drizzle-orm/pg-core';
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { InferInsertModel, type InferSelectModel } from 'drizzle-orm'



export const genderEnum = pgEnum('gender', ['male', 'female']);

export const members = pgTable('members', {

  id: varchar('id',{ length: 21 }).default(nanoid()).primaryKey(),
  firstName: varchar('firstName' ,{ length: 48 }).notNull(),
  lastName: varchar('lastName' ,{ length: 48 }).notNull(),
  kingdomClan: varchar('kingdomClan', { length: 96 }),
  gender: genderEnum('gender'),
  nationality: varchar('nationatility' ,{ length:48 }),
  birthDate: date('birthDate'),
  deathDate: date('deathDate'),
  description: text('description'),
  avatarUrl: varchar('avatarUrl', {length: 21})

});

export const parents = pgTable('parents', {
		id:varchar('id', {length: 21 }).default(nanoid()).primaryKey(),
		source: varchar('source', {length: 21 }).notNull(),
		target: varchar('target', {length: 21 }).notNull()
});


const schema = {
  members,
  parents
}

export default schema

export type PgDB = PostgresJsDatabase<typeof schema>

export type SelectMember = InferSelectModel<typeof members>;
export type InsertMember = InferInsertModel<typeof members>;
export type InsertParent = InferInsertModel<typeof parents>;
export type SelectParent = InferSelectModel<typeof parents>;

