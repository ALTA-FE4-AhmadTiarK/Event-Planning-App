import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";


export default function CardMyEvent({myevent}) {
  return (
    <>
      <div className={styles.cardComponent} onClick={myevent.onClick}>
        <div className={styles.rowComponent}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
            {/* <Image
                  src={myevent.image}
                  alt={myevent.id}
                  width={300}
                  height={200}
                /> */}
            </div>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.contentComponent}>
              <p>{myevent.date}</p>
               <h3>{myevent.name}</h3>
              <p className="text-muted ms-1 mb-1">Hosted by {myevent.host} - {myevent.location}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}