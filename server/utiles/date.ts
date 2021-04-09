import moment from 'moment';

const formatArrayDate = (data, format) => {
	switch (format) {
		case 'YYYY-MM-DD':
			return data.map(el => {
				return { ...el._doc, created_at: moment(el.created_at).format('YYYY-MM-DD') };
			})
		default:
			return data;
	}
};

const formatObjectDate = (data, format) => {
	switch (format) {
		case 'YYYY-MM-DD':
			return { ...data._doc, created_at: moment(data.created_at).format('YYYY-MM-DD') };
		default:
			return data;
	}
};

export const formatDate = (data, format) => {
	if (Array.isArray(data)) return formatArrayDate(data, format);
	if (typeof data === 'object') return formatObjectDate(data, format);
	return data;
};
