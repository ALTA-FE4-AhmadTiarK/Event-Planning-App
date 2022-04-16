import { EditModal } from './Modal';

function EditButton({
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
		<>
			<button
				style={{
					backgroundColor: '#354066',
					color: '#FFF',
				}}
				type='button'
				id='edit-button'
				className='btn col-lg-4 text-uppercase mb-2'
				data-bs-toggle='modal'
				data-bs-target='#staticBackdrop'>
				Edit
			</button>

			<EditModal
				title={title}
				setTitle={setTitle}
				date={date}
				setDate={setDate}
				location={location}
				setLocation={setLocation}
				details={details}
				setDetails={setDetails}
				quota={quota}
				setQuota={setQuota}
				onSubmit={onSubmit}
			/>
		</>
	);
}

export { EditButton };
