function EditModal({
	title,
	setTitle,
	date,
	setDate,
	location,
	setLocation,
	details,
	setDetails,
	quota,
	setQuota,
	onSubmit,
}) {
	return (
		<div
			className='modal fade'
			id='staticBackdrop'
			data-bs-backdrop='static'
			data-bs-keyboard='false'
			tabIndex={-1}
			aria-labelledby='staticBackdropLabel'
			aria-hidden='true'>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5
							className='modal-title mx-auto'
							id='staticBackdropLabel'>
							Edit Event
						</h5>
						<button
							type='button'
							className='btn-close mx-0'
							data-bs-dismiss='modal'
							aria-label='Close'></button>
					</div>
					<div className='modal-body'>
						<form>
							<div className='container-fluid text-danger'>
								<div className='form-group'>
									<label className='h6 my-0' htmlFor='title'>
										Title :
									</label>
									<input
										type='text'
										className='form-control mb-3'
										id='event-name'
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
										placeholder='Event Name'
									/>
									<label className='h6 my-0' htmlFor='title'>
										Date :
									</label>
									<input
										type='datetime-local'
										className='form-control mb-3'
										id='event-date'
										value={date}
										onChange={(e) =>
											setDate(e.target.value)
										}
										placeholder='Event Date'
									/>
									<label className='h6 my-0' htmlFor='title'>
										Location :
									</label>
									<input
										type='text'
										className='form-control mb-3'
										id='event-location'
										value={location}
										onChange={(e) =>
											setLocation(e.target.value)
										}
										placeholder='Event Location'
									/>
									<label className='h6 my-0' htmlFor='title'>
										Details :
									</label>
									<textarea
										className='form-control mb-3'
										id='event-details'
										value={details}
										onChange={(e) =>
											setDetails(e.target.value)
										}
										placeholder='Event Details'
									/>
									<label className='h6 my-0' htmlFor='title'>
										Quota :
									</label>
									<input
										type='number'
										className='form-control mb-3'
										id='event-quota'
										value={quota}
										onChange={(e) =>
											setQuota(e.target.value)
										}
										placeholder='Event Quota'
									/>
								</div>
							</div>
						</form>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-outline-danger'
							data-bs-dismiss='modal'>
							Cancel
						</button>
						<button
							type='button'
							onClick={onSubmit}
							className='btn btn-outline-success'
							data-bs-dismiss='modal'>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export { EditModal };
