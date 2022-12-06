const FormText = ({ type, name, value, handleChange, labelText }) => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className="float-left mb-1 capitalize tracking-wide"
			>
				{labelText || name}
			</label>

			<input
				type={type}
				value={value}
				name={name}
				onChange={handleChange}
				className="form-input w-full py-1 px-2 rounded-md border-2 border-[#FFBD03]"
			/>
		</div>
	)
}

export default FormText
