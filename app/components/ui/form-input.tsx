import { Input } from './input';
import { Label } from './label';

export interface FormInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	type?: string;
}

const FormInput = ({ name, label, ...props }: FormInputProps) => {
	return (
		<div>
			<Label
				name={name}
				label={label}
				className="text-sm font-medium leading-6"
			/>
			<div className="mt-2">
				<Input name={name} {...props} />
			</div>
		</div>
	);
};

export default FormInput;
