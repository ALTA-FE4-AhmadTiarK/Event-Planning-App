import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CardMyEvent from "../components/CardMyEvent";
import axios from 'axios';
import { fetchUser } from '../func/fetch';
import { useRouter } from 'next/router';

export default function MyEvent() {
  const [username, setUsername] = useState('');
  const [dispalyData, setDisplayData] = useState([]);
  const router = useRouter();

  useEffect(() => {
		if (!router.isReady) return;
		fetchEvent();
		fetchUser({ setUsername });
	}, [router.isReady]);
  

  const fetchEvent = async () => {
    const { userID } = router.query;
    await axios
      .get(`https://haudhi.site/event/participations/user/${userID}`,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };
  
  return (
    <>
      <Head>
        <title>My Event</title>
        <meta name="login" content="My Event" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          <div className="container">
            <div className="row border-bottom border-3 border-dark mt-5">
              <div className="col-lg-12">
                <h2>My Event</h2>
                <p className="text-muted ms-1 mb-1 mt-5">Today</p>
              </div>
              </div>
             
            <CardMyEvent/>
          </div>
        </main>
      </Layout>
    </>
  );
}
