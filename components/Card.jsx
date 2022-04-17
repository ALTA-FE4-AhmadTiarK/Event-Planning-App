import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";


export default function Card(props) {
  return (
    <>
      <div className={styles.cardComponent} onClick={props.onClick}>
        <div className={styles.rowComponent}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
            <Image
                  src={"/BigThumbnail.svg"}
                  alt="Picture of the author"
                  width={300}
                  height={200}
                />
            </div>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.contentComponent}>
              <p>{props.date}</p>
               <h3>{props.name}</h3>
              <p className="text-muted ms-1 mb-1">Hosted by {props.host} - {props.location}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
