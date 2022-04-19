import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MyLink from './Link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { errorMessage, pleaseLogin } from '../func/alert';

export default function Navbar(props) {
	const router = useRouter();
	const [userId, setUserId] = useState([]);

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
				const user = res.data.data;
				setUserId(user.id);
			})
			.catch((err) => {
				errorMessage(err);
			});
	};

	const isLogin = () => {
		if (localStorage.getItem('token')) {
			router.push('/userprofile');
		} else {
			pleaseLogin(router);
		}
	};

	const myEvent = () => {
		if (localStorage.getItem('token')) {
			router.push(`/myevent/${userId}`);
		} else {
			pleaseLogin(router);
		}
	};

	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{ backgroundColor: '#212840' }}>
			<div className='container justify-content-lg-between justify-content-center d-flex'>
				<MyLink href='/'>
					<h3 className='text-white navbar-brand fw-bold m-0 py-2'>
						Event Planner
					</h3>
				</MyLink>
				<form className='d-flex flex-wrap input-group mx-md-3 mx-lg-5'>
					<input
						type='text'
						className='form-control'
						placeholder='Input Event Name, Keywords or Location'
						onChange={props.onChange}
					/>
				</form>
				<div className='navbar-brand'>
					<a href='#'>
						<Image
							src='/calendar.svg'
							alt='event'
							width={40}
							height={40}
							onClick={myEvent}
							className='pe-2'
						/>
					</a>
					<a href='#'>
						<Image
							src='/user.svg'
							alt='user'
							width={40}
							height={40}
							onClick={isLogin}
							className='ps-2'
						/>
					</a>
				</div>
			</div>
		</nav>
	);
}