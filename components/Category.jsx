import React, { useEffect, useState } from "react";

function Category({
  activeCategory,
  setActiveCategory,
  displayData,
  setCategory,
}) {
  useEffect(() => {
    if (activeCategory === 0) {
      setCategory(displayData);
      return;
    }
    const filtered = displayData.filter((item) =>
      item.category_id_includes(activeCategory)
    );
    setCategory(filtered);
  }, [activeCategory, displayData, setCategory]);

  return (
    <>
    <div className="d-flex flex-wrap justify-content-evenly">
    <button type="button" className="btn btn-outline-success" onClick={() => setActiveCategory(0)}>All</button>
      <button type="button" className="btn btn-outline-success" onClick={() => setActiveCategory(1)}>Games</button>
      <button type="button" className="btn btn-outline-success" onClick={() => setActiveCategory(2)}>Art</button>
      <button type="button" className="btn btn-outline-success" onClick={() => setActiveCategory(3)}>Sport</button>
      <button type="button" className="btn btn-outline-success" onClick={() => setActiveCategory(4)}>Technology</button>
      <button type="button" className="btn btn-outline-success" onClick={() => setActiveCategory(5)}>Music</button>
      <button type="button" className="btn btn-outline-success" onClick={() => setActiveCategory(6)}>Education</button>
    </div>
      
    </>
  );
}
export default Category;
