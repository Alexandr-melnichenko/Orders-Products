import React from "react";
import styles from "./CubeLoader.module.css";

const CubeLoader = ({ size = 40, color = "#3470ff", speed = 2 }) => {
  const cubeStyle = {
    "--cube-size": `${size}px`,
    "--cube-half-size": `${size / 2}px`,
    "--cube-color": color,
    "--animation-speed": `${speed}s`,
  };

  return (
    <div className={styles.cubeLoader} style={cubeStyle}>
      {[...Array(6)].map((_, index) => (
        <div key={index} className={styles.cubeFace} />
      ))}
    </div>
  );
};

export const CenteredCubeLoader = () => (
  <div className={styles.centerContainer}>
    <CubeLoader size={48} color="#0B44CD" speed={1.5} />
  </div>
);
