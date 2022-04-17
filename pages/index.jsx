import react, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Card from "../components/Card";

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [dataEvent, setDataEvent] = useState([]);
  const [dispalyData, setDisplayData] = useState([]);
  const [sliceData, setSliceData] = useState(10);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    await axios
      .get(`https://haudhi.site/event`)
      .then((response) => {
        setDataEvent(response.data.data);
        setDisplayData(response.data.data.slice(0, 4));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsReady(true));
  };
  
  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
  
  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredData = dataEvent.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] ? row[field] : null);
      });
    });
    setDisplayData(filteredData);
    console.log(filteredData);
  }

  let result;
  if (isReady) {
    let sliced = dataEvent.slice(0, sliceData);
    result = (
      <>
        {dispalyData.map((item, index) => {
          return (
            <Card
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              host={item.host}
              date={item.date}
              location={item.location}
            />
          );
        })}
        <div className={styles.viewMore}>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={async () => {
              await setSliceData(sliceData + 4);
              setDisplayData(dataEvent.slice(1, sliceData));
            }}
          >
            View More
          </button>
        </div>
      </>
    );
  } else {
    result = "no data";
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="login" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        onChange={(e) => requestSearch(e.target.value)}
      >
        <main>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mx-auto">
                {/* <div className={styles.box}></div> */}
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
            <div className="row border-bottom border-3 border-dark mt-5 mb-3">
              <div className="col-lg-12">
                <p className="text-muted ms-1 mb-1">Today</p>
              </div>
            </div>
            {result}
          </div>
        </main>
      </Layout>
    </>
  );
}
