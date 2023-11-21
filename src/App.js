import React from "react";
import VideoPlayer from "./VideoPlayer";

const App = () => {
  const videoSource = "your_video_source_url";

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Player</h1>
      </header>
      <main className="container mx-auto mt-4">
        <VideoPlayer source={videoSource} />
      </main>
    </div>
  );
};

export default App;
