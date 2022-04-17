import React from 'react';
import Image from 'next/image';
import MyLink from './Link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function Navbar(props) {
	const router = useRouter();
	const isLogin = () => {
		if (localStorage.getItem('token')) {
			router.push('/userprofile');
		} else {
			Swal.fire({
				title: 'Please login first',
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Login',
			}).then((result) => {
				if (result.value) {
					router.push('/login');
				}
			});
		}
	};

	const myEvent = () => {
		if (localStorage.getItem('token')) {
			router.push('/myevent');
		} else {
			Swal.fire({
				title: 'Please login first',
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Login',
			}).then((result) => {
				if (result.value) {
					router.push('/login');
				}
			});
		}
	};

	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{ backgroundColor: '#212840' }}>
			<div className='container justify-content-lg-between justify-content-center d-flex'>
				<MyLink href='/'>
					<h3 className='text-white navbar-brand fw-bold m-0'>
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