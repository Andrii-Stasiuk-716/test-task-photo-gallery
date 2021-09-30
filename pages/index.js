import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import HomeImg from "../assets/home-line.svg";
import EyeIcon from "../assets/eye-line.svg";
import LeftArrow from "../assets/arrow-left-line.svg";
import RightArrow from "../assets/arrow-right-line.svg";
import ReactPaginate from "react-paginate";

const Index = ({ photos }) => {
  console.log(photos);
  const [currentPhotos, setCurrentPhotos] = useState(photos.slice(0, 45));
  const [pageNumber, setPageNumber] = useState(0);
  const photosPerPage = 9;
  const pagesVisited = pageNumber * photosPerPage;
  const pageCount = Math.ceil(currentPhotos.length / photosPerPage);

  const [drag, setDrag] = useState(false);
  const [title, setTitle] = useState("Photo Gallery");
  const [description, setDescription] = useState(
    "A selection of the latest photos from our restaurant and some of our favorite dishes"
  );

  const displayPhotos = currentPhotos
    .slice(pagesVisited, pagesVisited + photosPerPage)
    .map((photo, id) => {
      return (
        <div className="photo" key={id}>
          <img
            width="125px"
            height="125px"
            className="image"
            src={photo.thumburl}
          />
          <div className="overlay">
            <Image className="hover_icon" src={EyeIcon} alt="Eye" />
          </div>
        </div>
      );
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const onDescriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    console.log(files);
    // const formData = new FormData();
    // formData.append("file", files[0]);
    // axios.post('url', formData, options)
    setDrag(false);
  };

  const leftArrow = () => {
    return <Image src={LeftArrow} alt="LeftArrow" />;
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="main_page">
        <form className="settings">
          <input
            onChange={onTitleChangeHandler}
            className="title_input"
            type="text"
            value={title}
          />

          <textarea
            onChange={onDescriptionChangeHandler}
            className="description_input"
            value={description}
          ></textarea>
          {drag ? (
            <div
              className="drag_input"
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            >
              Drop your photos here
            </div>
          ) : (
            <div
              className="drag_input"
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
            >
              Drag photos here
            </div>
          )}
          <button className="delete_button">Delete all photos</button>
        </form>
        <div className="gallery">
          <header>
            <h1 className="gallery_title">Photo Gallery</h1>
            <h5 className="gallery_subtitle">
              A selection of the latest photos from our restaurant and some of
              our favorite dishes
            </h5>
          </header>
          <div className="photos">
            {displayPhotos}
            <ReactPaginate
              previousLabel={<Image src={LeftArrow} alt="LeftArrow" />}
              nextLabel={<Image src={RightArrow} alt="RightArrow" />}
              breakLabel={<Image src={HomeImg} alt="HomeImg" />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBtts"}
              previousClassName={"previousBttn"}
              nextClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const response = await fetch(`https://ihsavru.me/Demo/uploads.json`);
  const data = await response.json();
  return {
    props: { photos: data.course.uploads },
  };
}
