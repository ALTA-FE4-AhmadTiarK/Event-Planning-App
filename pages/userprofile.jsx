import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router';
import axios from "axios";


export default function UserProfile() {
  const [userId, setUserId] = useState('');
  const router = useRouter();

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
        setUserId(user.id)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const deleteUser = async () => {
    await axios
    .delete(`https://haudhi.site/users/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  } 

  const myEvent = () => {
		if (localStorage.getItem('token')) {
			router.push(`/myevent/`);
		} else {
			alert('Please login first');
			router.push('/login');
		}
	};
  
  const newEvent = () => {
		if (localStorage.getItem('token')) {
			router.push(`/new-event/`);
		} else {
			alert('Please login first');
			router.push('/login');
		}
	};

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Create New Event</title>
        <meta name="new-event" content="User Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <div className="container">
            <div className="row mt-4 justify-content-between">
              <div className="col-5 mx-auto">
                <Image
                  src="/BigThumbnail.svg"
                  alt="Picture of the author"
                  width={350}
                  height={350}
                />
              </div>
              <div className="col-7 mx-auto">
                <button
                  className="btn btn-lg btn-danger text-uppercase my-3 mx-3 float-start"
                  type="submit"
                  onClick={myEvent}
                >
                  my event
                </button>
                <button
                  className="btn btn-lg btn-danger text-uppercase my-3 mx-3 float-end"
                  type="submit"
                  onClick={newEvent}
                >
                  create new
                </button>
                <div className={styles.user}>
                  <div className="col-12 mx-auto">
                    <div className="mb-3 mt-5">
                      <label className="form-label mx-0">Username</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">About Me</label>
                      <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">location</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mx-auto">
                <p className="ms-1 mb-2">INTEREST</p>
                <div className={styles.interestContainer}>
                  <div className={styles.interestBox}>
                    <p>GAMES</p>
                  </div>
                  <div className={styles.interestBox}>
                    <p>MOVIE</p>
                  </div>
                  <div className={styles.interestBox}>
                    <p>SPORT</p>
                  </div>
                  <div className={styles.interestBox}>
                    <p>FOOD</p>
                  </div>
                  <div className={styles.interestBox}>
                    <p>PARTY</p>
                  </div>
                  <div className={styles.interestBox}>
                    <p>ART</p>
                  </div>
                  <div className={styles.interestBox}>
                    <p>EDUCATION</p>
                  </div>
                  <div className={styles.interestBox}>
                    <p>MUSIC</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mx-auto d-flex justify-content-center mb-5">
                <button
                  className="btn btn-lg btn-primary text-uppercase my-3 mx-3 float-start"
                  type="submit"
                >
                  update
                </button>
                <button
                  className="btn btn-lg btn-danger text-uppercase my-3 mx-3 float-start"
                  type="submit"
                  onClick={deleteUser}
                >
                  delete
                </button>
                <button
                  className="btn btn-lg btn-danger text-uppercase my-3 mx-3 float-start"
                  type="submit"
                  onClick={() => {
                    logOut();
                    alert("berhasil logout");
                  }}
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
