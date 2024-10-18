import { FormScope, ValueOfInputType } from '@rvf/remix';
import { Input } from './input';
import { Label } from './label';

export interface FormInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	type?: string;
	fieldError?: string | null;
}

const FormInput = ({ name, label, fieldError, ...props }: FormInputProps) => {
	return (
		<div>
			<Label
				//name is used for HtmlForId
				name={name}
				label={label}
				className="text-sm font-medium leading-6"
			/>
			<div className="mt-2">
				<Input name={name} id={name} fieldError={fieldError} {...props} />
			</div>
		</div>
	);
};

export default FormInput;
