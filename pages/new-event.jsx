import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CreateEvent() {
	const [eventName, setEventName] = useState('');
	const [category, setCategory] = useState([]);
	const [eventImage, setEventImage] = useState([]);
	const [eventDate, setEventDate] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [limitAttendee, setLimitAttendee] = useState(8);
	const [username, setUsername] = useState('');
	const router = useRouter();

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		await axios
			.get('https://haudhi.site/users', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then((res) => {
				setUsername(res.data.data.name);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			eventName &&
			category &&
			eventImage &&
			eventDate &&
			eventLocation &&
			eventDescription &&
			limitAttendee
		) {
			console.log('Form Submitted');
			setEventName('');
			setCategory([]);
			setEventDate('');
			setEventImage([]);
			setEventLocation('');
			setEventDescription('');
			setLimitAttendee(8);
			const event = {
				eventName: eventName,
				category: category,
				eventImage: eventImage,
				eventDate: eventDate,
				eventLocation: eventLocation,
				eventDescription: eventDescription,
				limitAttendee: limitAttendee,
			};
			let getLocal = JSON.parse(localStorage.getItem('event-list'));
			if (getLocal === null) {
				let localEvent = [];
				localEvent.push(event);
				localStorage.setItem('event-list', JSON.stringify(localEvent));
			} else {
				getLocal.push(event);
				localStorage.setItem('event-list', JSON.stringify(getLocal));
			}
			alert('Event created successfully');
			router.push('/new-event');
		} else {
			alert('Please fill all the fields');
		}
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
						<div className='row border-bottom border-3 border-dark mt-5 my-1'>
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
									Hosted by : {username}
								</p>
							</div>
							<div className='col-lg-4'>
								<select
									name=''
									id='category'
									onClick={(e) => setCategory(e.target.value)}
									className='form-select'>
									<option defaultValue='Choose Category'>
										Choose a category
									</option>
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
							<div className='col-lg-5 mx-auto my-2'>
								<div className='input-group justify-content-center'>
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
							<div className='col-lg-5 mx-auto my-auto'>
								<div className='justify-content-between d-flex'>
									<button
										className='btn btn-dark px-5 text-uppercase mb-2'
										type='submit'
										onClick={handleSubmit}>
										Create Event
									</button>
									<button
										className='btn btn-danger px-5 text-uppercase mb-2'
										onClick={() => router.push('/')}>
										Cancel Event
									</button>
								</div>
								<h5 className='mt-3'>Information :</h5>
								<div className='border p-3'>
									<p>Pick a date and time for your event.</p>
									<div className='input-group my-2'>
										<input
											type='datetime-local'
											id='event-date'
											className='form-control'
											value={eventDate}
											onChange={(e) =>
												setEventDate(e.target.value)
											}
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
							<div className='col-lg-12'>
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
							<div className='row border-bottom border-dark border-3 py-lg-1'>
								<div className='col-lg-3 align-self-end'>
									<h5 className=''>Limit the Attendees :</h5>
								</div>
								<div className='col-lg-3 mb-2'>
									<input
										type='number'
										className='form-control'
										value={limitAttendee}
										onChange={(e) =>
											setLimitAttendee(e.target.value)
										}
									/>
								</div>
							</div>
							<div className='col-lg-12'>
								{/* Mapping the attendees */}
							</div>
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}
