const Popup = ({ title, children, setShow }) => {
	return (
		<div className="fixed inset-0 z-10">
			<div
				className="fixed inset-0 w-full h-full bg-black opacity-40"
				onClick={() => setShow(false)}
			></div>
			<div className="flex items-center min-h-screen px-4 py-8">
				<div className="flex px-4 py-8 mx-auto">
					<div className="relative p-4 mx-auto bg-white rounded-md drop-shadow-3xl">
						<div className="mt-2 text-center sm:ml-4 sm:text-left">
							<h4 className="text-2xl text-center mb-4">
								{title}
							</h4>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Popup
