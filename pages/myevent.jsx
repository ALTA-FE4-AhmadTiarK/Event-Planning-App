import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CardMyEvent from "../components/CardMyEvent";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function MyEvent() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await axios
      .get("https://haudhi.site/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUsername(res.data.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Head>
        <title>Home Page</title>
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
              <CardMyEvent />
          </div>
        </main>
      </Layout>
    </>
  );
}
