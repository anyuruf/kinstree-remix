import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';

const genderEnum = ['male', 'female'] as const;

export const createValidator = withZod(
	z.object({
		firstName: z
			.string()
			.min(1, { message: 'First name is required' })
			.max(48, { message: 'First name characters may not exceed 48' }),
		lastName: z
			.string()
			.min(1, { message: 'Last name is required' })
			.max(48, { message: 'Last name characters may not exceed 48' }),
		kingdomClan: z
			.string()
			.max(96, { message: 'Kingdom-Clan characters may not exceed 96' }),
		gender: z.enum(genderEnum),
		nationality: z
			.string()
			.max(96, { message: 'Nationality characters may not exceed 48' }),
		birthDate: z.string(), // No need for date validation as parseDate below
		deathDate: z.string(), // will throw with an invalid string
		description: z
			.string()
			.max(512, { message: 'Description characters may not exceed 512' }),
	}),
);

export const editValidator = withZod(
	z.object({
		id: z.string().length(21, { message: 'Nanoid for id field' }),
		firstName: z
			.string()
			.min(1, { message: 'First name is required' })
			.max(48, { message: 'First name characters may not exceed 48' }),
		lastName: z
			.string()
			.min(1, { message: 'Last name is required' })
			.max(48, { message: 'Last name characters may not exceed 48' }),
		kingdomClan: z
			.string()
			.max(96, { message: 'Kingdom-Clan characters may not exceed 96' }),
		gender: z.enum(genderEnum),
		nationality: z
			.string()
			.max(96, { message: 'Nationality characters may not exceed 48' }),
		birthDate: z.string(),
		deathDate: z.string(),
		description: z
			.string()
			.max(512, { message: 'Description characters may not exceed 512' }),
		avatarUrl: z.string(),
	}),
);

export const createParentValidator = withZod(
	z.object({
		firstName: z.string().length(21),
		lastName: z.string().length(21),
	}),
);
