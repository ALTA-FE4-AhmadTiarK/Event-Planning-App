import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

export default function EventDetail() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [eventName, setEventName] = useState('');
	const [category, setCategory] = useState(0);
	const [eventDate, setEventDate] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [quota, setQuota] = useState(8);
	const [eventImage, setEventImage] = useState('');
	const [participants, setParticipants] = useState(0);


	useEffect(() => {
		fetchEvent();
	}, []);

	const fetchEvent = async () => {
		const { eventID } = router.query;
		console.log(router);
		await axios
			.get(`https://haudhi.site/event/${eventID}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Head>
				<title>Event Details</title>
				<meta name='new-event' content='Create New Event' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<main>
					<div className='container'>
						{/* First row */}
						<div className='row border-bottom border-3 border-dark mt-5'>
							<div className='col-lg-12'>
								<h2 className='fw-bold'>
									(Event Name)
									{eventName}
								</h2>
								<h6 className='text-muted text-secondary'>
									Hosted by (username) {username}
								</h6>
							</div>
						</div>

						{/* Second row */}
						<div className='row mt-4'>
							<div className='col-lg-6'>
								<Image
									src={
										eventImage.length !== 0
											? URL.createObjectURL(eventImage)
											: '/BigThumbnail.svg'
									}
									// src={eventImage}
									alt='Event thumbnail'
									width={450}
									height={300}
								/>
							</div>
							<div className='col-lg-6 my-auto'>
								<div className='justify-content-between d-flex'>
									<button
										className='btn btn-dark px-5 text-uppercase mb-2'
										onClick={joinButton}>
										Join Event
									</button>
									<button
										className='btn btn-danger px-5 text-uppercase mb-2'
										onClick={deleteButton}>
										Delete Event
									</button>
								</div>
								<div
									className='border border-3 p-5'
									style={{ borderRadius: 1 + 'em' }}>
									<h4 className=''>
										Monday, November 15
										{eventDate}
									</h4>
									<br />
									<h4 className=''>
										Location : Jakarta
										{eventLocation}
									</h4>
								</div>
							</div>
						</div>

						{/* Third row */}
						<div className='row'>
							<h5 className='mt-5 pb-2 border-bottom border-dark border-3'>
								Detail Event
							</h5>
							<div className='col-lg-12'>
								<div className='py-3'>
									<h6 className='lh-base'>
										{eventDescription}
										Lorem ipsum, dolor sit amet consectetur
										adipisicing elit. Doloremque consectetur
										quo error nihil vitae nisi laboriosam!
										Suscipit facere nemo, ab asperiores in
										nisi magnam vitae assumenda perspiciatis
										cupiditate id veritatis? Lorem ipsum
										dolor sit, amet consectetur adipisicing
										elit. Explicabo sunt ex quasi! Nisi
										ipsum iusto inventore minus quod
										praesentium ad dolorum velit,
										consectetur nostrum ex officia ab aut.
										Iste, quam. Lorem ipsum dolor sit amet
										consectetur adipisicing elit.
										Dignissimos praesentium temporibus eius
										modi, quas deleniti repudiandae minus
										quos tempore repellendus odio? Veritatis
										quibusdam repellat aliquid, quia unde
										maxime? Odio, expedita!
									</h6>
								</div>
							</div>
						</div>

						{/* Fourth row */}
						<div className='row border-bottom border-dark border-3'>
							<h5 className='my-2'>Attendees ( 4 / {quota} )</h5>
						</div>
						<div className='row justify-content-between'>
							<UserAttend
								src='/user-circle.svg'
								username='User A'
							/>
							<UserAttend
								src='/user-circle.svg'
								username='User B'
							/>
							<UserAttend
								src='/user-circle.svg'
								username='User C'
							/>
							<UserAttend
								src='/user-circle.svg'
								username='User D'
							/>
						</div>

						{/* Fifth row */}
						<div className='row border-bottom border-dark border-3'>
							<h5 className='my-2'>Comments</h5>
						</div>
						<div className='row'>
							<div className='col-lg-1 col-2 my-auto'>
								<Image
									src='/user-circle.svg'
									alt='User thumbnail'
									width={100}
									height={100}
									className='rounded-circle mr-3'
								/>
							</div>
							<div className='col-lg-11 col-10 my-3'>
								<textarea
									className='form-control'
									placeholder='Write a comment...'
								/>
							</div>
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}


const UserAttend = ({ src, username }) => {
	return (
		<>
			<div className='col-lg-2 col-auto'>
				<Image
					src={src}
					alt='User thumbnail'
					className='rounded-circle'
					width={200}
					height={200}
				/>
				<h6 className='text-center'>{username}</h6>
			</div>
		</>
	);
};

const joinButton = (e) => {
	e.preventDefault();
	console.log('Join Button Clicked');
};

const deleteButton = (e) => {
	e.preventDefault();
	console.log('Delete Button Clicked');
};
