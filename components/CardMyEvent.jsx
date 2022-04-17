import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";


export default function CardMyEvent(props) {
  return (
    <>
      <div className={styles.cardComponent}>
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
              <Link href={`event/}`} passHref>
              <h3>{props.name}</h3>
              </Link>
              
              <p>
                {props.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}