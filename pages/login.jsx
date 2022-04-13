import React, { useState } from 'react';
import Head from 'next/head';
import MyLink from '../components/Link';
import axios from 'axios';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			alert('Please fill all the fields');
			return;
		}

		await axios
			.post('https://haudhi.site/auth', {
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(res);
				if (res.data.status === 'success') {
					window.location.href = '/';
				} else {
					alert('Login failed');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Head>
				<title>Login Page</title>
				<meta name='login' content='Login Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				className='overflow-auto position-relative'
				style={{ backgroundColor: '#212840', height: 100 + 'vh' }}>
				<div className='container text-center position-absolute top-50 start-50 translate-middle w-50'>
					<form
						className='border p-5'
						style={{
							backgroundColor: '#F6F7FF',
							borderRadius: 15 + 'px',
						}}>
						<h1 className='text-uppercase pb-4 fw-bold'>Login</h1>
						<div className='form-group my-3'>
							<label className='h5 text-uppercase'>
								Email address
							</label>
							<input
								type='email'
								className='form-control'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Input your email'
							/>
						</div>
						<div className='form-group my-3'>
							<label className='h5 text-uppercase'>
								Password
							</label>
							<input
								type='password'
								className='form-control'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Input your password'
							/>
						</div>
						<button
							className='btn btn-danger px-5 mt-4 mb-2'
							onClick={handleSubmit}>
							Login
						</button>
						<p className='text-muted'>
							Does not have an account?{' '}
							<MyLink href='/register' className='link-danger'>
								Register
							</MyLink>
						</p>
					</form>
				</div>
			</div>
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
