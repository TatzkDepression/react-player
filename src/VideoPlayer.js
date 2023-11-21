import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedSource, setSelectedSource] = useState("");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = selectedSource;
      videoRef.current.load();
    }
  }, [selectedSource]);

  const playPauseToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullScreenToggle = () => {
    const player = videoRef.current;

    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      if (player.requestFullscreen) {
        player.requestFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const percent = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
      videoRef.current.currentTime = percent * duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const newVolume = isMuted ? 1 : 0;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(!isMuted);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedSource(fileURL);
    }
  };

  const handleUrlChange = (e) => {
    setSelectedSource(e.target.value);
  };

  return (
    <div className="video-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          controls
          className="w-full h-full absolute top-0 left-0"
          onClick={playPauseToggle}
          onTimeUpdate={handleTimeUpdate}
        >
          Your browser does not support the video tag.
        </video>
        <div className="video-controls">
          <button onClick={playPauseToggle}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={() => videoRef.current.load()}>Refresh</button>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <button onClick={handleFullScreenToggle}>
            {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
          <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
          <label>
            Choose File:
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </label>
          <label>
            Enter URL:
            <input
              type="url"
              value={selectedSource}
              onChange={handleUrlChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
