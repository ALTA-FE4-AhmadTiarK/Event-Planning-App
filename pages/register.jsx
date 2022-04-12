import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import MyLink from '../components/Link';
import axios from 'axios';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			username === '' ||
			email === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			alert('Please fill all the fields');
			return;
		} else if (confirmPassword !== password) {
			alert('Password does not match');
			return;
		}
		await axios
			.post('/api/users', {
				name: username,
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(res);
				if (res.data.status === 'success') {
					window.location.href = '/';
				} else {
					alert('Register failed');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Head>
				<title>Register</title>
				<meta name='register' content='Register Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<div className='container my-5' style={{ height: 100 + 'vh' }}>
					<form className='align-items-center overflow-auto'>
						<div className='form-group d-flex justify-content-between my-3'>
							<h6 className='my-auto'>
								Username <span className='text-danger'>*</span>
							</h6>
							<input
								type='text'
								className='form-control w-75'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder='Input your username'
							/>
						</div>
						<div className='form-group d-flex justify-content-between my-3'>
							<h6 className='my-auto'>
								Email Address{' '}
								<span className='text-danger'>*</span>
							</h6>
							<input
								type='email'
								className='form-control w-75'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Input your email'
							/>
						</div>
						<div className='form-group d-flex justify-content-between my-3'>
							<h6 className='my-auto'>
								Password <span className='text-danger'>*</span>
							</h6>
							<input
								type='password'
								className='form-control w-75'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Input your password'
							/>
						</div>
						<div className='form-group d-flex justify-content-between my-3'>
							<h6 className='my-auto'>
								Confirm Password{' '}
								<span className='text-danger'>*</span>
							</h6>
							<input
								type='password'
								className='form-control w-75'
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								placeholder='Confirm your password'
							/>
						</div>
					</form>
					<div className='w-100 text-center'>
						<button
							className='btn btn-danger px-5 mt-4 mb-2'
							onClick={handleSubmit}>
							Register
						</button>
						<p className='text-muted'>
							Already have an account?{' '}
							<MyLink href='/login' className='link-danger'>
								Login
							</MyLink>
						</p>
					</div>
				</div>
			</Layout>
		</>
	);
}

export async function getServerSideProps() {
	return {
		props: {
			data: null,
		},
	};
}