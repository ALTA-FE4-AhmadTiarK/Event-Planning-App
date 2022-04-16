import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

import moment from 'moment';
import Swal from 'sweetalert2';

export default function EventDetail() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [host, setHost] = useState('');
	const [eventName, setEventName] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [quota, setQuota] = useState(8);
	const [eventImage, setEventImage] = useState('');
	const [participants, setParticipants] = useState(0);
	const [eventId, setEventId] = useState(0);
	const [comment, setComment] = useState('');

	useEffect(() => {
		if (!router.isReady) return;
		fetchEvent();
		fetchUser();
	}, [router.isReady]);

	const fetchEvent = async () => {
		const { eventID } = router.query;
		await axios
			.get(`https://haudhi.site/event/${eventID}`)
			.then((res) => {
				console.log(res.data.data);
				const event = res.data.data;
				setEventName(event.name);
				setHost(event.host);
				setEventLocation(event.location);
				setEventDate(event.date);
				setEventDescription(event.description);
				// setEventImage(event.image);
				setQuota(event.quota);
				setEventId(event.id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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

	// untuk GET comment secara async
	// const getComment = async () => {
	// 	await axios
	// 		.get(`https://haudhi.site/event/${eventId}/comment`)
	// 		.then((res) => {
	// 			console.log(res.data.data);
	// 			setParticipants(res.data.data.length);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }

	const joinButton = (e) => {
		e.preventDefault();
		axios
			.post(
				`https://haudhi.site/event/participations`,
				{
					event_id: eventId,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer ' + localStorage.getItem('token'),
					},
				}
			)
			.then((res) => {
				console.log(res);
				if (res.data.status === 'success') {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.data.message,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteButton = (e) => {
		e.preventDefault();
		if (username === host) {
			axios
				.delete(`https://haudhi.site/event/${eventId}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer ' + localStorage.getItem('token'),
					},
				})
				.then((res) => {
					console.log(res);
					if (res.data.status === 'success') {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: res.data.message,
							showConfirmButton: false,
							timer: 1500,
						});
						router.push('/');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'You are not the host of this event',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const commentButton = (e) => {
		if (localStorage.getItem('token') === null) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'You must be logged in to comment',
				showConfirmButton: false,
				timer: 1500,
			});
		} else if (comment === '') {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'You must enter a comment',
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			e.preventDefault();
			axios
				.post(
					`https://haudhi.site/event/comments`,
					{
						event_id: eventId,
						comment: comment,
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization:
								'Bearer ' + localStorage.getItem('token'),
						},
					}
				)
				.then((res) => {
					console.log(res);
					if (res.data.status === 'success') {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: res.data.message,
							showConfirmButton: false,
							timer: 1500,
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
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
								<h2 className='fw-bold'>{eventName}</h2>
								<h6 className='text-muted text-secondary'>
									Hosted by {host}
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
										{moment(eventDate).format('dddd')},{' '}
										{moment(eventDate).format('LL')}
									</h4>
									<h5 className='text-muted'>
										@ {moment(eventDate).format('LT')}
									</h5>
									<h4 className='text-capitalize'>
										Location : {eventLocation}
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
										{eventDescription
											? eventDescription
											: `Lorem ipsum, dolor sit amet consectetur
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
										maxime? Odio, expedita!`}
									</h6>
								</div>
							</div>
						</div>

						{/* Fourth row */}
						<div className='row border-bottom border-dark border-3'>
							<h5 className='my-2'>Attendees ( 4 / {quota} )</h5>
						</div>
						<div className='row justify-content-between'>
							<div className='col-lg-2 col-auto'>
								<UserAttend username='User A' wide={200} />
							</div>
							<div className='col-lg-2 col-auto'>
								<UserAttend username='User B' wide={200} />
							</div>
							<div className='col-lg-2 col-auto'>
								<UserAttend username='User C' wide={200} />
							</div>
							<div className='col-lg-2 col-auto'>
								<UserAttend username='User D' wide={200} />
							</div>
						</div>

						{/* Fifth row */}
						<div className='row border-bottom border-dark border-3'>
							<h5 className='my-2'>Comments</h5>
						</div>
						<div className='row'>
							<div className='col-lg-1 col-2 my-auto'>
								<UserAttend wide={100} />
							</div>
							<div className='col-lg-11 col-10 my-3'>
								<textarea
									className='form-control'
									placeholder='Write a comment...'
									onChange={(e) => setComment(e.target.value)}
								/>
								<button
									type='submit'
									className='btn btn-dark'
									onClick={commentButton}>
									Comment
								</button>
							</div>
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}

const UserAttend = ({ username, wide }) => {
	const userProfile = {
		1: '/blue.png',
		2: '/green.png',
		3: '/orange.png',
		4: '/pink.png',
		5: '/cyan.png',
		6: '/red.png',
		7: '/yellow.png',
		8: '/green-old.png',
		9: '/die.png',
		10: '/white.png',
	};
	const random = Math.floor(Math.random() * 10);
	return (
		<>
			<Image
				src={
					userProfile[random]
						? userProfile[random]
						: '/user-circle.svg'
				}
				alt='User thumbnail'
				className='rounded-circle'
				width={wide}
				height={wide}
			/>
			<h6 className='text-center'>{username}</h6>
		</>
	);
};


