import React from 'react';
import Image from 'next/image';

export default function Navbar() {
	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{ backgroundColor: '#212840' }}>
			<div className='container justify-content-between d-flex'>
				<h3 className='text-white navbar-brand fw-bold m-0'>
					Event Planner
				</h3>
				<form className='d-flex flex-wrap input-group mx-md-3 mx-lg-5'>
					<input
						type='text'
						className='form-control'
						placeholder='Input Event Name, Category, or Location'
					/>
				</form>
				<div className='navbar-brand'>
					<Image
						src='/calendar.svg'
						alt='event'
						width={40}
						height={40}
						className='pe-2'
					/>
					<Image
						src='/user.svg'
						alt='user'
						width={40}
						height={40}
						className='ps-2'
					/>
				</div>
			</div>
		</nav>
	);
}
