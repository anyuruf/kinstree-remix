export const formatDate = (value?: string) => {
	if (value && value.indexOf('T') >= 0) {
		return value.split('T')[0];
	}
};
