import React, { useState, useEffect } from "react";
import { Search, Plus, ArrowLeft, Gamepad } from "lucide-react";
import "./games.css";
import gamesData from "./games.json";

function GameContent({ htmlContent, handleBackClick }) {
  return (
    <div className="game-content">
      <div className="navbar-game">
        <ArrowLeft
          strokeWidth={1.5}
          className="back-button"
          onClick={handleBackClick}
        />
      </div>
      <div className="full-page-iframe-container">
        <iframe
          srcDoc={htmlContent}
          title="Game Content"
          className="full-page-iframe"
        />
      </div>
    </div>
  );
}
function StatusBar({ siteTitle, gameCount }) {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const formattedTime = currentDate.toLocaleTimeString();

  return (
    <div className="status-bar">
      <div className="left-side">
        <span className="status-title">{siteTitle}</span> ▨:{gameCount}
      </div>
      <div className="right-side">
        {formattedDate} {formattedTime}
      </div>
    </div>
  );
}
function Games() {
  const [htmlContent, setHtmlContent] = useState(null);

  const [gameTitle, setGameTitle] = useState("");

  const [emulatorContent, setEmulatorContent] = useState(null);


  const handleClick = async (title, link, type, core = "") => {
    setGameTitle(title);
    switch (type) {
      case "HTML":
        try {
          const response = await fetch(link);
          const html = await response.text();
          setHtmlContent(html);
        } catch (error) {
          console.error("Error loading html game:", error);
        }
        break;

      case "EMULATOR":
        try {          
          const emulatorHtml = `
          <html>
             full-page-iframe-containeryyy`;

          setEmulatorContent(link);
        } catch (error) {
          console.error("Error loading emulated game:", error);
        }
        break;
      
        // case "PROXY":
        //   try {
        //     const encodedUrl = window.__uv$config.encodeUrl(link);
        //     const proxyUrl = __uv$config.prefix + encodedUrl;
        //     setHtmlContent(proxyUrl);
        //   } catch (error) {
        //     console.error("Error loading proxied game:", error);
        //   }
        //   break;
case "FLASH":
  try {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const flashContent = `
      <object style="width: ${windowWidth}px; height: ${windowHeight}px;">
        <embed src="${link}" width="${windowWidth}" height="${windowHeight}" />
      </object>
      <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
    `;
    setHtmlContent(flashContent);

 
  } catch (error) {
    console.error("Error loading flash game:", error);
  }
  break;


      default:
        // Handle other types or provide a default action
        console.error(`Unsupported game type: ${type}`);
    }
  };

  const handleBackClick = () => {
    setHtmlContent(null);
    setEmulatorContent(null);
  };

  return (
    <>

    
    <div className="games-layout">
      
      

     
    <div className="games-container">
    

        <h4 className="title">:games</h4>
      <div className="games-carousel-3d">
        {gamesData.games
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((game, index) => (
            <div
              className="card"
              key={index}
              onClick={() =>
                handleClick(game.title, game.link, game.type, game.core)
              }
            >
              <Plus strokeWidth={1.5} className="corner-icon top-left" />
              <Plus strokeWidth={1.5} className="corner-icon top-right" />
              <Plus strokeWidth={1.5} className="corner-icon bottom-left" />
              <Plus strokeWidth={1.5} className="corner-icon bottom-right" />

              <img src={game.imageSrc} alt={game.title} />
              <h2 className="game-title"> {game.title}</h2>
              <div className="game-info">
                <p className="game-genre">{game.genre}</p>
                <p className="spacer">█</p>
                <p className="game-type"> {game.type} </p>
              </div>
            </div>
          ))}
      </div>

      {htmlContent && (
        <GameContent
          htmlContent={htmlContent}
          handleBackClick={handleBackClick}
        />
      )}

      {emulatorContent!==null && (
        <div className="game-content">
          <div className="navbar-game">
            <ArrowLeft
              strokeWidth={1.5}
              className="back-button"
              onClick={handleBackClick}
            /><p className="NavTitle">{gameTitle}</p>
          </div>
          <GameContent htmlContent={emulatorContent} handleBackClick={handleBackClick} />
        </div>
      )}
    </div>
    </div>
    </>
  );
}




export default Games;