import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Upload } from '../components/Button';
import { fetchUser } from '../func/fetch';
import { errorMessage, fillAll, successConfirm } from '../func/alert';

export default function CreateEvent() {
	const [eventName, setEventName] = useState('');
	const [category, setCategory] = useState(2);
	const [eventImage, setEventImage] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [quota, setQuota] = useState(80);
	const [username, setUsername] = useState('');
	const router = useRouter();
	const [participants, setParticipants] = useState(0);
	const [imagePreview, setImagePreview] = useState(null);

	useEffect(() => {
		fetchUser({ setUsername });
	}, []);

	const onImageUpload = (e) => {
		const file = e.target.files[0];
		setEventImage(file);
		setImagePreview(URL.createObjectURL(file));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			category &&
			eventName &&
			eventDate &&
			eventLocation &&
			eventDescription &&
			quota &&
			eventImage
		) {
			const formData = new FormData();
			formData.append('category_id', category);
			formData.append('name', eventName);
			formData.append('host', username);
			formData.append('date', eventDate);
			formData.append('location', eventLocation);
			formData.append('details', eventDescription);
			formData.append('quota', quota);
			formData.append('participants', participants);
			formData.append('image', eventImage);

			axios
				.post('https://haudhi.site/event', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization:
							'Bearer ' + localStorage.getItem('token'),
					},
				})
				.then((res) => {
					successConfirm({ res, router });
				})
				.then(() => {
					setCategory([]);
					setEventName('');
					setEventDate('');
					setEventLocation('');
					setEventDescription('');
					setQuota(80);
					setEventImage('');
				})
				.catch((err) => {
					errorMessage(err);
				});
		} else {
			fillAll();
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
									<option defaultValue={0}>
										Choose a category
									</option>
									<option value={1}>Games</option>
									<option value={2}>Art</option>
									<option value={3}>Sport</option>
									<option value={4}>Technology</option>
									<option value={5}>Music</option>
									<option value={6}>Education</option>
								</select>
							</div>
						</div>

						{/* second row */}
						<div className='row mt-4 justify-content-between'>
							<div className='col-lg-5 mx-auto my-2'>
								<Upload
									img={imagePreview}
									onChange={(e) => onImageUpload(e)}
								/>
							</div>
							<div className='col-lg-5 mx-auto my-auto'>
								<div className='justify-content-between d-flex'>
									<button
										className='btn btn-dark px-5 text-uppercase mb-2'
										type='submit'
										onClick={onSubmit}>
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
									<input
										type='datetime-local'
										id='event-date'
										className='form-control'
										value={eventDate}
										onChange={(e) =>
											setEventDate(e.target.value)
										}
									/>
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
										value={quota}
										onChange={(e) =>
											setQuota(e.target.value)
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}