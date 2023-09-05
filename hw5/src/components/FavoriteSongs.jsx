import { useContext, useEffect } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import { Row } from "react-bootstrap";
import Song from "./Song";

const FavoriteSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    let songs = JSON.parse(sessionStorage.getItem("songs"));
    console.log(favorites);

    useEffect(() => {
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites])

    function delFavSong(song) {
        setFavorites(favorites.filter(fav => fav.id !== song.id));
    }

    function altFavState(id) {
        songs = songs.map(song => {
            if (song.id === id) {
                return { ...song, isFav: !song.isFav };
            }
            return song;
        });
        sessionStorage.setItem("songs", JSON.stringify(songs));
    }

    return <div>
        <h1>Favorite Songs</h1>
        <p>We have {favorites.length} songs </p>
        <Row>{favorites.map(song => <Song key={song.id} song={song} delFavSong={delFavSong} altFavState={altFavState} />)}</Row>
    </div>
}

export default FavoriteSongs;