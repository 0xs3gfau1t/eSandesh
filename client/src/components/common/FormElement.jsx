const FormText = ({
    type,
    name,
    value,
    handleChange,
    labelText,
    encType,
    className,
    checked,
    children,
    ...rest
}) => {
    return (
        <div className={'mb-4 ' + className}>
            <label htmlFor={name} className="mb-1 capitalize tracking-wide">
                {labelText || name}
            </label>

            <input
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
                className="form-input w-full py-1 px-2 rounded-md border-[1px] border-[#FFBD03]"
                formEncType={encType}
                checked={checked}
                {...rest}
            />
            {children}
        </div>
    )
}

const FormTextArea = ({ name, value, handleChange, labelText, rows, cols }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="float-left mb-1 capitalize tracking-wide"
            >
                {labelText || name}
            </label>

            <textarea
                value={value}
                name={name}
                rows={rows}
                cols={cols}
                onChange={handleChange}
                className="form-input w-full py-1 px-2 rounded-md border-[1px] border-[#FFBD03]"
            />
        </div>
    )
}

const FormSelect = ({
    name,
    options = [],
    defaultV,
    hint,
    labelText,
    handleChange,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="float-left mb-1 capitalize tracking-wide"
            >
                {labelText || name}
            </label>
            <select
                name={name}
                onChange={handleChange}
                className="form-input w-full py-1 px-2 rounded-md border-[1px] border-[#FFBD03]"
            >
                <option value="" hidden={!defaultV} className="bg-blue-500">
                    {defaultV ? defaultV : hint || 'Select one'}
                </option>
                {options.map((opt, index) => (
                    <option key={index} value={opt} className="capitalize">
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}
export { FormText, FormSelect, FormTextArea }
