import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { UserAttend } from '../components/Picture';
import { fetchUser } from '../func/fetch';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UserProfile() {
	const [token, setToken] = useState('');
	const [username, setUsername] = useState('');
	const [status, setStatus] = useState('');
	const [location, setLocation] = useState('');
	const [interests, setInterests] = useState([]);
	const [userId, setUserId] = useState('');
	const router = useRouter();

	useEffect(() => {
		setToken(localStorage.getItem('token'));
		fetchUser({ setUsername });
		userSettings();
	}, []);

	useEffect(() => {
		setToken(localStorage.getItem('token'));
		fetchUser({ setUsername });
		userSettings();
	}, []);

	const deleteUser = async () => {
		await axios
			.delete(`https://haudhi.site/users/${userId}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then((res) => {
				console.log(res.data.data);
				Swal.fire({
					title: 'Account successfully delete',
					icon: 'success',
					showConfirmButton: false,
					timer: 1500,
				});
				localStorage.removeItem('token');
				router.push('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const userSettings = async () => {
		const settings = JSON.parse(localStorage.getItem('user-settings'));
		if (settings === null) {
			setStatus('Not set');
			setLocation('Not set');
			setInterests([]);
		} else {
			setStatus(settings[0].status);
			setLocation(settings[0].location);
			setInterests(settings[0].interests);
		}
	};
	const handleUpdate = async (e) => {
		e.preventDefault();
		const myProfile = {
			status: status,
			location: location,
			interests: interests,
		};
		let getLocal = JSON.parse(localStorage.getItem('user-settings'));
		if (getLocal === null) {
			let localProfile = [];
			localProfile.push(myProfile);
			localStorage.setItem('user-settings', JSON.stringify(localProfile));
		} else {
			getLocal.unshift(myProfile);
			localStorage.setItem('user-settings', JSON.stringify(getLocal));
		}
		Swal.fire({
			title: 'Profile updated successfully',
			icon: 'success',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	const logOut = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, logout!',
		}).then((result) => {
			if (result.value) {
				localStorage.splice(0, 9);
				router.push('/');
			}
		});
	};

	return (
		<>
			<Head>
				<title>Create New Event</title>
				<meta name='new-event' content='User Profile' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<main>
					<div className='container'>
						<div className='row mt-4 justify-content-between'>
							<div className='col-lg-4 mx-auto'>
								<UserAttend wide={400} username={username} />
							</div>
							<div className='col-lg-6 mx-auto my-5'>
								<div className='justify-content-lg-between row'>
									<button
										className='btn btn-danger text-uppercase col-6'
										onClick={() => {
											router.push('/myevent');
										}}
										type='submit'>
										my event
									</button>
									<button
										className='btn btn-danger text-uppercase col-6'
										type='submit'
										onClick={() => {
											router.push('/new-event');
										}}>
										create new
									</button>
								</div>
								{/* <div className={styles.user}> */}
								<div className='col-12 mx-auto'>
									<div className='my-lg-3'>
										<label className='form-label mx-0'>
											Username
										</label>
										<input
											type='text'
											value={username}
											disabled
											onChange={(e) => {
												setUsername(e.target.value);
											}}
											className='form-control'
										/>
									</div>
									<div className='my-3'>
										<label className='form-label'>
											About Me
										</label>
										<textarea
											className='form-control'
											value={status}
											onChange={(e) => {
												setStatus(e.target.value);
											}}
											rows='3'></textarea>
									</div>
									<div className='my-3'>
										<label className='form-label text-capitalize'>
											location
										</label>
										<input
											type='text'
											value={location}
											onChange={(e) => {
												setLocation(e.target.value);
											}}
											className='form-control'
										/>
									</div>
								</div>
								{/* </div> */}
							</div>
						</div>
						<div className='row'>
							<div className='col-lg-12 mx-auto'>
								<p className='ms-1 mb-2 text-capitalize'>
									Interest
								</p>
								<div className={styles.interestContainer}>
									<div className={styles.interestBox}>
										<p>GAMES</p>
									</div>
									<div className={styles.interestBox}>
										<p>MOVIE</p>
									</div>
									<div className={styles.interestBox}>
										<p>SPORT</p>
									</div>
									<div className={styles.interestBox}>
										<p>FOOD</p>
									</div>
									<div className={styles.interestBox}>
										<p>PARTY</p>
									</div>
									<div className={styles.interestBox}>
										<p>ART</p>
									</div>
									<div className={styles.interestBox}>
										<p>EDUCATION</p>
									</div>
									<div className={styles.interestBox}>
										<p>MUSIC</p>
									</div>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-lg-12 mx-auto d-flex justify-content-center mb-5'>
								<button
									className='btn btn-lg btn-danger text-uppercase my-3 mx-3 float-start'
									type='submit'
									onClick={() => {
										deleteUser();
									}}>
									delete
								</button>
								<button
									className='btn btn-lg btn-primary text-uppercase my-3 mx-3 float-start'
									onClick={handleUpdate}
									type='submit'>
									update
								</button>
								<button
									className='btn btn-lg btn-danger text-uppercase my-3 mx-3 float-start'
									type='submit'
									onClick={() => {
										logOut();
									}}>
									logout
								</button>
							</div>
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}
