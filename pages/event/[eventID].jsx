import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { EditButton } from '../../components/Button';
import { UserAttend } from '../../components/Picture';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { fetchUser, participate } from '../../func/fetch';
import Image from 'next/image';

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
	const [participants, setParticipants] = useState([]);
	const [eventId, setEventId] = useState(0);
	const [comment, setComment] = useState('');
	const [getComments, setGetComments] = useState([]);

	useEffect(() => {
		if (!router.isReady) return;
		fetchEvent();
		fetchUser({ setUsername });
	}, [router.isReady]);

	const fetchEvent = async () => {
		const { eventID } = router.query;
		await axios
			.get(`https://haudhi.site/event/${eventID}`)
			.then((res) => {
				const event = res.data.data;
				setEventName(event.name);
				setHost(event.host);
				setEventLocation(event.location);
				setEventDate(event.date);
				setEventDescription(event.details);
				setEventImage(event.image);
				setQuota(event.quota);
				setEventId(event.ID);
				setParticipants(event.attendees);
				setGetComments(event.comment);
				console.log(event);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const joinButton = (e) => {
		e.preventDefault();
		if (participants.length <= quota) {
			participate({ event_id: eventId, eventId, router });
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Quota is full',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const editButton = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', eventName);
		formData.append('date', eventDate);
		formData.append('location', eventLocation);
		formData.append('details', eventDescription);
		formData.append('quota', quota);
		const { eventID } = router.query;
		axios
			.put(`https://haudhi.site/event/${eventID}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
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
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: err.response.data.message,
						showConfirmButton: false,
						timer: 1500,
					});
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
				title: 'You must be logged in to make a comment',
				showConfirmButton: false,
				timer: 1500,
			});
		} else if (comment === '') {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Comment cannot be empty',
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			e.preventDefault();
			axios
				.post(
					`https://haudhi.site/event/comments`,
					{ event_id: eventId, comment: comment },
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
					router.reload();
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: err.response.data.message,
						showConfirmButton: false,
						timer: 1500,
					});
				});
			setComment('');
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
						<div className='row mt-4 justify-content-around'>
							<div className='col-lg-5 text-center'>
								<Image
									src={
										eventImage
											? eventImage
											: '/BigThumbnail.svg'
									}
									alt='Event Image'
									width={450}
									height={300}
								/>
							</div>
							<div className='col-lg-6 my-auto'>
								<div className='justify-content-between row'>
									<button
										className='btn btn-dark col-lg-4 text-uppercase mb-2'
										onClick={joinButton}>
										Join Event
									</button>
									{/* show edit button only if username === host */}
									{username === host ? (
										<EditButton
											title={eventName}
											setTitle={setEventName}
											date={eventDate}
											setDate={setEventDate}
											location={eventLocation}
											setLocation={setEventLocation}
											details={eventDescription}
											setDetails={setEventDescription}
											quota={quota}
											setQuota={setQuota}
											onSubmit={editButton}
										/>
									) : (
										''
									)}

									<button
										className='btn btn-danger col-lg-4 text-uppercase mb-2'
										onClick={deleteButton}>
										Delete Event
									</button>
								</div>
								<div
									className='border border-3 p-lg-5 p-3'
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
										{eventDescription}
									</h6>
								</div>
							</div>
						</div>

						{/* Fourth row */}
						<div className='row border-bottom border-dark border-3'>
							<h5 className='my-2'>
								Attendees ( {participants.length} / {quota} )
							</h5>
						</div>
						<div className='row'>
							{participants.map((member, index) => {
								return (
									<div
										key={index}
										className='col-lg-2 col-auto mx-auto'>
										<UserAttend
											username={member.user_id}
											wide={200}
										/>
									</div>
								);
							})}
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
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
								<button
									type='submit'
									className='btn btn-dark my-1'
									onClick={commentButton}>
									Comment
								</button>
							</div>
						</div>
						{getComments.map((item, index) => {
							return (
								<div
									key={index}
									className='row my-auto justify-content-end me-1'>
									<div className='col-lg-1 col-3'>
										<UserAttend
											username={item.user_id}
											wide={100}
										/>
									</div>
									<div
										className='col-lg-10 col-9 border border-2 bg-white py-3 px-4 mb-lg-5 my-auto'
										style={{ borderRadius: 1 + 'em' }}>
										<p style={{ color: '#212840' }}>
											{item.comment}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</main>
			</Layout>
		</>
	);
}
