import React from "react";
import Image from "next/image";
import styles from '../styles/Home.module.css';
import moment from 'moment';

export default function Card(props) {
	return (
		<>
			<div className={styles.cardComponent} onClick={props.onClick}>

				<div className='row justify-content-center'>
					<div className='col-lg-4 mx-auto'>
						<Image
							src={
								props.image ? props.image : '/BigThumbnail.svg'
							}
							className='border border-1'
							style={{ borderRadius: 1 + 'em' }}
							alt='Picture of the author'
							width={300}
							height={200}
						/>
					</div>

					<div className='col-lg-8 my-auto'>
						<h5 className=''>
							{moment(props.date).format('dddd')},{' '}
							{moment(props.date).format('MMMM Do')} @{' '}
							{moment(props.date).format('LT')} WIB
						</h5>
						<h3>{props.name}</h3>
						<p className='text-muted'>
							Hosted by {props.host} - {props.location}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
