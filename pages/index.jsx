import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="login" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mx-auto">
                <div className={styles.box}></div>
                <div className={styles.category}>
                  <ul>
                    <li href="">GAMES</li>
                    <li href="">MOVIE</li>
                    <li href="">SPORT</li>
                    <li href="">ART</li>
                    <li href="">FOOD</li>
                    <li href="">EDUCATION</li>
                    <li href="">PARTY</li>
                    <li href="">MUSIC</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row border-bottom border-3 border-dark mt-5">
              <div className="col-lg-12">
                <p className="text-muted ms-1 mb-1">Today</p>
              </div>
            </div>
            <div className="row mt-2 justify-content-between">
              <div className="col-3 mx-auto">
				<Image
                  src="/BigThumbnail.svg"
                  alt="Picture of the author"
                  width={250}
                  height={250}
                />
              </div>
			  <div className="col-9 mx-auto">
			 	<div className={styles.textEventList}>
				<p>Monday, November 15 @5AM WIB</p>
				<p>Webinar: Your Product Manager Career by Playstation Sr PM</p>
				<p className="text-muted ms-1 mb-1">Hosted by Product School - Jakarta</p>
				</div>
			  </div>
            </div>
			<div className="row mt-2 justify-content-between">
              <div className="col-3 mx-auto">
				<Image
                  src="/BigThumbnail.svg"
                  alt="Picture of the author"
                  width={250}
                  height={250}
                />
              </div>
			  <div className="col-9 mx-auto">
			 	<div className={styles.textEventList}>
				<p>Monday, November 15 @5AM WIB</p>
				<p>Webinar: Your Product Manager Career by Playstation Sr PM</p>
				<p className="text-muted ms-1 mb-1">Hosted by Product School - Jakarta</p>
				</div>
			  </div>
            </div>
			<div className="row border-bottom border-3 border-dark mt-5">
              <div className="col-lg-12">
                <p className="text-muted ms-1 mb-1">Tomprrow</p>
              </div>
            </div>
			<div className="row mt-2 justify-content-between">
              <div className="col-3 mx-auto">
				<Image
                  src="/BigThumbnail.svg"
                  alt="Picture of the author"
                  width={250}
                  height={250}
                />
              </div>
			  <div className="col-9 mx-auto">
			 	<div className={styles.textEventList}>
				<p>Monday, November 15 @5AM WIB</p>
				<p>Webinar: Your Product Manager Career by Playstation Sr PM</p>
				<p className="text-muted ms-1 mb-1">Hosted by Product School - Jakarta</p>
				</div>
			  </div>
            </div>
			<div className="row mt-2 justify-content-between">
              <div className="col-3 mx-auto">
				<Image
                  src="/BigThumbnail.svg"
                  alt="Picture of the author"
                  width={250}
                  height={250}
                />
              </div>
			  <div className="col-9 mx-auto">
			 	<div className={styles.textEventList}>
				<p>Monday, November 15 @5AM WIB</p>
				<p>Webinar: Your Product Manager Career by Playstation Sr PM</p>
				<p className="text-muted ms-1 mb-1">Hosted by Product School - Jakarta</p>
				</div>
			  </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
