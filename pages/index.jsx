import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import Card from '../components/Card';
import Category from '../components/Category';

export default function Home() {
	const [isReady, setIsReady] = useState(false);
	const [dataEvent, setDataEvent] = useState([]);
	const [displayData, setDisplayData] = useState([]);
	const [category, setCategory] = useState([]);
	const [activeCategory, setActiveCategory] = useState(0);
	const [sliceData, setSliceData] = useState(10);
	const [searchVal, setSearchVal] = useState('');
	const router = useRouter();

	useEffect(() => {
		fetchEvent();
	}, []);

	const fetchEvent = async () => {
		await axios
			.get(`https://haudhi.site/event`)
			.then((response) => {
				setDataEvent(response.data.data);
				setDisplayData(response.data.data.slice(0, 4));
				setCategory(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setIsReady(true));
	};

	const escapeRegExp = (value) => {
		return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	};

	const requestSearch = (searchValue) => {
		const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
		const filteredData = dataEvent.filter((row) => {
			return Object.keys(row).some((field) => {
				return searchRegex.test(row[field] ? row[field] : null);
			});
		});
		setDisplayData(filteredData);
	};

	let result;
	if (isReady) {
		let sliced = dataEvent.slice(0, sliceData);
		result = (
			<>
				{category.map((item, index) => {
					return (
						<Card
							key={index}
							id={item.id}
							image={item.image}
							name={item.name}
							host={item.host}
							date={item.date}
							category={item.category_id}
							location={item.location}
							onClick={() => {
								router.push(`/event/${item.id}`);
							}}
						/>
					);
				})}
				<div className={styles.viewMore}>
					<button
						type='button'
						className='btn btn-outline-success'
						onClick={async () => {
							await setSliceData(sliceData + 4);
							setDisplayData(dataEvent.slice(1, sliceData));
						}}>
						View More
					</button>
				</div>
			</>
		);
	} else {
		result = 'no data';
	}

	return (
		<>
			<Head>
				<title>Home Page</title>
				<meta name='login' content='Home' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout onChange={(e) => requestSearch(e.target.value)}>
				<main>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-12 mx-auto my-5'>
								<Category
									displayData={displayData}
									setCategory={setCategory}
									activeCategory={activeCategory}
									setActiveCategory={setActiveCategory}
								/>
							</div>
						</div>
						<div className='row border-bottom border-3 border-dark mt-5 mb-3'>
							{result}
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}
