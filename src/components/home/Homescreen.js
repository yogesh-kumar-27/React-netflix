import React from "react";
import Banner from "../banner/Banner";
import Navbar from "../navbar/Navbar";
import Row from "../row/Row";
import requests from "../../requests";

const Homescreen = () => {
  return (
    <>
      <div className="">
        {/* Navbar */}
        <Navbar />
        {/* Banner */}
        <Banner />
        
        <Row 
        title = "NETFLIX ORIGINALS" 
        fetchUrl = {requests.fetchNetFlixOriginals}
        isLargeRow = {true}
        />
        <Row title = "Trending Now" fetchUrl = {requests.fetchTreding}/>
        <Row title = "Top Rated" fetchUrl = {requests.fetchTopRated}/>
        <Row title = "Action Movies" fetchUrl = {requests.fetchActionMovies}/>
        <Row title = "Horror Movies" fetchUrl = {requests.fetchHorroMovies}/>
        <Row title = "Romance Movies" fetchUrl = {requests.fetchRomanticMovies}/>
        <Row title = "Comedy Movies" fetchUrl = {requests.fetchComedyMovies}/>
        <Row title = "Documentaries" fetchUrl = {requests.fetchDocumentaries}/>
      </div>
    </>
  );
};

export default Homescreen;
