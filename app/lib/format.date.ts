export function formatDate(input: string | number | null): string {
	if (input == null) return '';

	const date = new Date(input);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}
