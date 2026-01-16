import React, { useState } from "react";
import data from "../../tracks.json";
import "./MusicDashboard.css";

function MusicDashboard() {
  const [selectedSong, setSelectedSong] = useState<any>(null);

  return (
    <>
      <div className="Navbar" style={{ height: "100px", background: "green" }} />

      {selectedSong && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <img
            src={encodeURI(selectedSong.localArt)}
            alt={selectedSong.title}
            width={250}
            height={250}
          />
          <h2>{selectedSong.title}</h2>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedSong(item)}
            style={{
              display: "flex",
              gap: "10px",
              border: "2px solid green",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            <img
              src={encodeURI(item.localArt)}
              alt={item.title}
              width={70}
              height={70}
            />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default MusicDashboard;
