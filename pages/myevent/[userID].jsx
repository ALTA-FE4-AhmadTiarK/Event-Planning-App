import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Layout from '../../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import CardMyEvent from '../../components/CardMyEvent';

export default function MyEvent() {
	const [displayedData, setDisplayedData] = useState([]);
	const router = useRouter();

	useEffect(() => {
		fetchEvent();
	}, []);

	const fetchEvent = async () => {
		await axios
			.get(`https://haudhi.site/event/user/`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then((response) => {
				setDisplayedData(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Head>
				<title>My Event</title>
				<meta name='login' content='My Event' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout>
				<main>
					<div className='container'>
						<div className='row border-bottom border-3 border-dark mt-5'>
							<div className='col-lg-12'>
								<h2>My Event</h2>
							</div>
						</div>
						{displayedData.map((item, index) => {
							return (
								<CardMyEvent
									key={index}
									id={item.id}
									image={item.image}
									name={item.name}
									host={item.host}
									date={item.date}
									location={item.location}
									onClick={() => {
										router.push(`/event/${item.ID}`);
									}}
								/>
							);
						})}
					</div>
				</main>
			</Layout>
		</>
	);
}
