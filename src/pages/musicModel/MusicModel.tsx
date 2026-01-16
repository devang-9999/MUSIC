import { useEffect, useState } from "react";
import useSound from "use-sound";
import Sahiba from "../../assets/Sahiba.mp3"
import "./MusicModel.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MusicModel() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(Sahiba);
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });

  const [seconds, setSeconds] = useState();
  useEffect(() => {
    if (duration !== null && duration !== undefined) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      const time = {
        min: min.toString(),
        sec: secRemain.toString(),
      }
    }
  })
  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min: min.toString(),
          sec: sec.toString()
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);
  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="component" >
      <h2 style={{ color: "white", background: "none", margin:"30px"}}>Playing Now</h2>
      <img
        className="musicCover"
        src="https://a10.gaanacdn.com/gn_img/albums/w4MKPObojg/MKPDBlBrKo/size_m.jpg" alt="Image"
      />
      <div>
        <button className="playButton">

          <SkipPreviousIcon  sx={{ color: 'primary.contrastText' }} />

        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>

            <PauseIcon  sx={{ color: 'primary.contrastText' }} />

          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>

            <PlayArrowIcon sx={{ color: 'primary.contrastText' }} />

          </button>
        )}
        <button className="playButton">

          <SkipNextIcon sx={{ color: 'primary.contrastText' }} />

        </button>
        <div>
          <div className="time">
            <p>
              {currTime.min}:{currTime.sec}
            </p>
            <p>
              {/* {time.min}:{time.sec} */}
            </p>
          </div>
          <input
            type="range"
            min="0"
            max={duration ?? 0 / 1000}
            defaultValue="0"
            value={seconds}
            className="timeline"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
        </div>
      </div>
    </div>
  );
}