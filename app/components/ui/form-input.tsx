import { HTMLInputTypeAttribute } from 'react';
import { Input } from './input';
import { Label } from './label';

export interface FormInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
}

const FormInput = ({ name, label, ...props }: FormInputProps) => {
	return (
		<>
			<Label name={name} label={label} />
			<Input name={name} {...props} />
		</>
	);
};

export default FormInput;
