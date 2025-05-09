import React, {useState} from "react";


export default function Home(props) {
    const [movies, setMovies] = useState([]);
    const [likes, setLikes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [activeTab, setActiveTab] = useState();
    const [catagory, setCatagory] = useState(); 
}