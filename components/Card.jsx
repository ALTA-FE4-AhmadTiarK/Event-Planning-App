import React from "react";
import Image from "next/image";
import styles from '../styles/Home.module.css';
import moment from 'moment';

export default function Card({ image, onClick, name, date, host, location }) {
	return (
		<>
			<div className={styles.cardComponent} onClick={onClick}>
				<div className='row justify-content-center container'>
					<div className='col-lg-4 mx-auto'>
						<Image
							src={image ? image : '/BigThumbnail.svg'}
							className='border border-1'
							style={{ borderRadius: 1 + 'em' }}
							alt={name}
							width={300}
							height={200}
						/>
					</div>

					<div className='col-lg-8 my-auto'>
						<h5 className=''>
							{moment(date).format('dddd')},{' '}
							{moment(date).format('MMMM Do')} @{' '}
							{moment(date).format('LT')} WIB
						</h5>
						<h3>{name}</h3>
						<p className='text-muted'>
							Hosted by {host} - {location}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
