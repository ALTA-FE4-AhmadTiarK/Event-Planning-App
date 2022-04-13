import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function CreateEvent() {
	const [eventName, setEventName] = useState('');
	const [category, setCategory] = useState([]);
	const [eventImage, setEventImage] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [eventTime, setEventTime] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [limitAttendee, setLimitAttendee] = useState(8);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			eventName &&
			category &&
			eventImage &&
			eventDate &&
			eventTime &&
			eventLocation &&
			eventDescription &&
			limitAttendee
		) {
			console.log('Form Submitted');
		} else {
			alert('Please fill all the fields');
		}
		console.log(
			eventName,
			category,
			eventImage,
			eventDate,
			eventTime,
			eventLocation,
			eventDescription,
			limitAttendee
		);
		setEventName('');
		setCategory([]);
		setEventDate('');
		setEventTime('');
		setEventLocation('');
		setEventDescription('');
		setLimitAttendee(8);
	};

	return (
		<>
			<Head>
				<title>Create New Event</title>
				<meta name='new-event' content='Create New Event' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout>
				<main>
					<div className='container'>
						{/* first row */}
						<div className='row border-bottom border-3 border-dark mt-5'>
							<div className='col-lg-8'>
								<div className='input-group'>
									<input
										className='form-control'
										type='text'
										name=''
										id='event-name'
										value={eventName}
										onChange={(e) =>
											setEventName(e.target.value)
										}
										placeholder='Give your event a name'
									/>
								</div>
								<p className='text-muted ms-3 mb-1'>
									Hosted by: (username)
								</p>
							</div>
							<div className='col-4'>
								<select
									name=''
									id='category'
									onClick={(e) => setCategory(e.target.value)}
									className='form-select'>
									<option value='games'>Games</option>
									<option value='movie'>Movie</option>
									<option value='sport'>Sport</option>
									<option value='food'>Food</option>
									<option value='party'>Party</option>
									<option value='art'>Art</option>
									<option value='education'>Education</option>
									<option value='music'>Music</option>
								</select>
							</div>
						</div>

						{/* second row */}
						<div className='row mt-4 justify-content-between'>
							<div className='col-5 mx-auto'>
								<div className='input-group'>
									<input
										type='image'
										src={
											eventImage.length !== 0
												? URL.createObjectURL(
														eventImage
												  )
												: '/BigThumbnail.svg'
										}
										alt='event-image'
										width={450}
										height={300}
									/>
								</div>
								<div className='input-group'>
									<input
										type='file'
										className='form-control justify-content-center'
										accept='image/*'
										onChange={(e) =>
											setEventImage(e.target.files[0])
										}
									/>
								</div>
							</div>
							<div className='col-5 mx-auto'>
								<button
									className='btn btn-danger text-uppercase my-3 w-100'
									type='submit'
									onClick={handleSubmit}>
									create event
								</button>
								<h5 className='mt-3'>Information :</h5>
								<div className='border p-3'>
									<p>Pick a date and time for your event.</p>
									<div className='input-group my-2'>
										<input
											className='form-control'
											type='date'
											name=''
											id='event-date'
											value={eventDate}
											onChange={(e) =>
												setEventDate(e.target.value)
											}
											placeholder='Event Date'
										/>
									</div>
									<div className='input-group my-2'>
										<input
											className='form-control'
											type='time'
											name=''
											id='event-time'
											value={eventTime}
											onChange={(e) =>
												setEventTime(e.target.value)
											}
											placeholder='Event Time'
										/>
									</div>
									<input
										type='text'
										className='form-control'
										id='event-location'
										value={eventLocation}
										onChange={(e) =>
											setEventLocation(e.target.value)
										}
										placeholder='Event Location'
									/>
								</div>
							</div>
						</div>

						{/* third row */}
						<div className='row my-5'>
							<h5 className='mt-5 pb-2 border-bottom border-dark border-3'>
								Detail Event :
							</h5>
							<div className='col-12'>
								<div className='py-3'>
									<textarea
										className='form-control'
										id='event-description'
										value={eventDescription}
										onChange={(e) =>
											setEventDescription(e.target.value)
										}
										placeholder='Event Description'
									/>
								</div>
							</div>
						</div>

						{/* fourth row */}
						<div className='my-5'>
							<div className='row border-bottom border-dark border-3'>
								<div className='col-3'>
									<h5 className='my-2'>
										Limit the Attendees :
									</h5>
								</div>
								<div className='col-3'>
									<input
										type='number'
										className='form-control'
										id=''
										value={limitAttendee}
										onChange={(e) =>
											setLimitAttendee(e.target.value)
										}
									/>
								</div>
							</div>
							<div className='col-12'>
								{/* Mapping the attendees */}
							</div>
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}
