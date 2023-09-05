import { useContext, useEffect, useState } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from "./Song";
import { Row } from "react-bootstrap";
const AllSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        if (sessionStorage.getItem("songs")) {
            setSongs(JSON.parse(sessionStorage.getItem("songs")));
        }
        else {
            fetch("https://cs571.org/s23/hw5/api/songs", {
                headers: {
                    "X-CS571-ID": "bid_2b48c7a36a98db55355d"
                }
            }).then(res => res.json()).then(data => {
                data = data.map(song => { return { ...song, isFav: false } });
                sessionStorage.setItem("songs", JSON.stringify(data));
                // console.log(data);
                setSongs(data);
            })
        }
        if (sessionStorage.getItem("favorites")) {
            setFavorites(JSON.parse(sessionStorage.getItem("favorites")));
        }
    }, [])

    //save songs to session storage
    useEffect(() => {
        sessionStorage.setItem("songs", JSON.stringify(songs));
    }, [songs])

    //save favorites to session storage
    useEffect(() => {
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites])

    function addFavSong(song) {
        setFavorites([...favorites, { ...song, isFav: true }]);

    }

    function delFavSong(song) {
        setFavorites(favorites.filter(fav => fav.id !== song.id));
    }

    function altFavState(id) {
        setSongs(songs.map(song => {
            if (song.id === id) {
                return { ...song, isFav: !song.isFav };
            }
            return song;
        }));
    }

    return <div>
        <h1>Songs</h1>
        <p>We have {songs.length} songs in {songs.reduce((genres, cur) => {
            if (!genres.includes(cur.genre)) {
                genres.push(cur.genre);
            }
            return genres;
        }, []).length} genres for a total of {songs.reduce((seconds, cur) => {
            let time = cur.length.split(":");
            return seconds + parseInt(time[0]) * 60 + parseInt(time[1]);
        }, 0)} seconds of music </p>
        <p>There are {favorites.length} favorite songs</p>
        <Row>{songs.map(song => <Song key={song.id} song={song} altFavState={altFavState} delFavSong={delFavSong} addFavSong={addFavSong} />)}</Row>
        {/* <Row>{songs.map(song => <Song key={song.id} song={song} altFavState={altFavState} />)}</Row> */}

    </div>
}

export default AllSongs;