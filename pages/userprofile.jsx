import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { UserAttend } from '../components/Picture';
import axios from 'axios';
import { fetchUser } from '../func/fetch';
import {
	deleteAccount,
	errorMessage,
	logout,
	profileUpdated,
} from '../func/alert';

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
		fetchUser({ setUsername, setUserId });
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
				deleteAccount(res);
				localStorage.removeItem('token');
				router.push('/');
			})
			.catch((err) => {
				errorMessage(err);
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
		profileUpdated();
	};

	return (
		<>
			<Head>
				<title>User Profile</title>
				<meta name='user-profile-page' content='User Profile' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<main>
					<div className='container'>
						<div className='row mt-4 justify-content-between'>
							<div className='col-lg-4 col-6 mx-auto'>
								<UserAttend wide={400} username={username} />
							</div>
							<div className='col-lg-6 mx-auto my-5'>
								<div className='justify-content-lg-between row my-2'>
									<button
										className='btn btn-danger text-uppercase col-6'
										onClick={() => {
											router.push(`/myevent/${userId}`);
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
							</div>
						</div>

						<div className='row'>
							<div className='col-lg-12 mx-auto d-flex justify-content-center mb-5'>
								<button
									className='btn btn-lg btn-danger text-uppercase col-3 m-2'
									type='submit'
									onClick={() => {
										deleteUser();
									}}>
									delete
								</button>
								<button
									className='btn btn-lg btn-primary text-uppercase col-3 m-2'
									onClick={handleUpdate}
									type='submit'>
									update
								</button>
								<button
									className='btn btn-lg btn-danger text-uppercase col-3 m-2'
									type='submit'
									onClick={() => {
										logout(router);
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
