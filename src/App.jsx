import { useState, useEffect, useRef } from "react";
import profilePic from "./assets/profilepic.png";
import marmal8 from "./assets/marmal8.mp4";
import marmal8Static from "./assets/marmal8-static.png";
import safeGait from "./assets/safegait.mp4";
import safeGaitStatic from "./assets/safegait-static.png";
import tutorSwipe from "./assets/tutorswipe.mp4";
import tutorSwipeStatic from "./assets/tutorswipe-static.png";
import figmaLogo from "./assets/figma.png";
import flutterLogo from "./assets/flutter.png";
import awsLogo from "./assets/aws.png";
import song1 from "./assets/song-1.png";
import song2 from "./assets/song-2.png";
import song3 from "./assets/song-3.png";
import song4 from "./assets/song-4.png";
import pastime1 from "./assets/pastime-1.png";
import pastime2 from "./assets/pastime-2.png";
import pastime3 from "./assets/pastime-3.png";
import pastime4 from "./assets/pastime-4.png";
import email from "./assets/email.png";
import linkedin from "./assets/linkedin.png";
import instagram from "./assets/instagram.png";
import resumePDF from "./assets/Ivorine_Resume.pdf";
import "./App.css";

function App() {
  /* Assets */
  const songs = [song1, song2, song3, song4];
  const songLinks = [
    "https://open.spotify.com/track/5dcQj27je0qwIHShygEOuv?si=d6275e552e5046f3",
    "https://open.spotify.com/track/2HFUSp8XB2ovtTXeUwWJUA?si=e9686809af2f4d91",
    "https://open.spotify.com/track/6MmN7FsbgqDLZH4H68hPpZ?si=525b6a802ff14656",
    "https://open.spotify.com/track/7m5hhOOpucvYDV0XbvNqu7?si=179b81e5593c46c8",
  ];
  const pastimes = [pastime1, pastime2, pastime3, pastime4];

  /* Resume Download Modal */
  const [hoveredResume, setHoveredResume] = useState(false);
  const [resumeModalVisible, setResumeModalVisible] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const resumePassword = import.meta.env.VITE_RESUME_PASSWORD;
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resumePDF;
    link.download = "Ivorine_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const passwordChecker = () => {
    if (inputPassword === resumePassword) {
      downloadResume();
      setResumeModalVisible(false);
    } else {
      setIncorrectPassword(true);
    }
  };

  /* Transition Effects */
  const bioRef = useRef();
  const landingRef = useRef();
  const projectRefs = useRef([]);
  const randomDumpRefs = useRef([]);
  const contactRef = useRef();
  const [isBioVisible, setIsBioVisible] = useState(false);
  const [isLandingVisible, setIsLandingVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(Array(5).fill(false));
  const [onHoverMarmal8, setOnHoverMarmal8] = useState(false);
  const [onHoverSafeGait, setOnHoverSafeGait] = useState(false);
  const [onHoverTutorSwipe, setOnHoverTutorSwipe] = useState(false);
  const [visibleRandomDumps, setVisibleRandomDumps] = useState(
    Array(3).fill(false)
  );
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const createObserver = (element, callback) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );

      if (element) observer.observe(element);
    };

    createObserver(bioRef.current, () => setIsBioVisible(true));
    createObserver(landingRef.current, () => setIsLandingVisible(true));
    createObserver(contactRef.current, () => setContactVisible(true));

    projectRefs.current.forEach((el, index) => {
      createObserver(el, () => {
        setVisibleProjects((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      });
    });

    randomDumpRefs.current.forEach((el, index) => {
      createObserver(el, () => {
        setVisibleRandomDumps((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      });
    });

    if (resumeModalVisible) {
      setIncorrectPassword(false);
      setInputPassword("");

      const scrollY = window.scrollY;
      document.body.setAttribute("data-scroll-y", scrollY);
      document.body.classList.add("modal-open");
      document.body.style.top = `-${scrollY}px`;
    } else {
      document.body.classList.remove("modal-open");
      const scrollY = document.body.getAttribute("data-scroll-y");
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }
    }
  }, [resumeModalVisible]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-align">
          <h2 className="navbar-logo">Ivorine.</h2>
          <div className="navbar-links">
            <div className="navbar-button-container">
              <button className="navbar-button home-button"> Home </button>
              <div
                className={`navbar-button-hover ${
                  !hoveredResume ? "opacity" : ""
                }`}
              />
            </div>
            <div className="navbar-button-container">
              <button
                onClick={() => {
                  setHoveredResume(true);
                  setResumeModalVisible(true);
                }}
                className="navbar-button"
                onMouseEnter={() => {
                  setHoveredResume(true);
                }}
                onMouseLeave={() => {
                  setHoveredResume(false);
                }}
              >
                Resume
              </button>
              <div
                className={`navbar-button-hover ${
                  hoveredResume ? "opacity" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`resume-container ${
          resumeModalVisible ? "disabled-pointer" : ""
        }`}
      >
        <div className={`resume-modal ${resumeModalVisible ? "opacity" : ""}`}>
          <div className="resume-button-container">
            <button
              className="resume-close-button"
              onClick={() => setResumeModalVisible(false)}
            >
              &times;
            </button>
          </div>
          <div className="password-container">
            <div className="password-input-container">
              <p className="password-title">Enter password :</p>
              <input
                type="password"
                className="password-input"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    passwordChecker();
                  }
                }}
              />
              {incorrectPassword && (
                <p className="password-incorrect-placeholder">
                  Incorrect password
                </p>
              )}
            </div>
            <button
              className="resume-submit-button"
              onClick={() => {
                passwordChecker();
              }}
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div
          className={`heading-card slide-in ${isLandingVisible ? "show" : ""}`}
          ref={landingRef}
        >
          <div className="heading-text">
            <h1 className="heading-title">
              Hiii! <br />
              I’m <span className="name-shadow">Ivorine </span> 👋
            </h1>
            <p className="heading-subtitle">
              I design smooth UIs and code them too.
            </p>
          </div>
          <div className="profile-image">
            <img src={profilePic} alt="Profile" />
          </div>
        </div>

        <div
          className={`bio-card slide-in left ${isBioVisible ? "show" : ""}`}
          ref={bioRef}
        >
          <div className="bio-vertical-line" />
          <div className="bio-text">
            <p>
              I'm a developer and UI designer who loves turning clean designs
              into working apps. I build smooth user experiences and beautiful
              interfaces—sometimes with Flutter, sometimes with React, always
              with care. <br />
              <br /> I studied Computer Science and Design at Singapore
              University of Technology and Design, and as a recent grad, I'm
              looking forward to my next chapter!
            </p>
          </div>
        </div>

        <div className="projects-card">
          <div className="title-container">
            <h1
              className={`title slide-in left ${
                visibleProjects[0] ? "show" : ""
              }`}
              ref={(el) => (projectRefs.current[0] = el)}
            >
              Projects.
            </h1>
            <p
              className={`project-subtitle slide-in left ${
                visibleProjects[0] ? "show" : ""
              }`}
            >
              hover (or tap on mobile) a project to see its GIF preview in
              action
            </p>
          </div>
          <div className="projects-list">
            <div
              className={`project-item step-in left ${
                visibleProjects[1] ? "show" : ""
              }`}
              ref={(el) => (projectRefs.current[1] = el)}
            >
              {onHoverMarmal8 ? (
                <video
                  className="project-gif"
                  src={marmal8}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onMouseLeave={() => setOnHoverMarmal8(false)}
                  onClick={() => setOnHoverMarmal8(false)}
                />
              ) : (
                <img
                  className="project-gif"
                  src={marmal8Static}
                  alt="Marmal8"
                  onMouseEnter={() => setOnHoverMarmal8(true)}
                  onClick={() => setOnHoverMarmal8(true)}
                />
              )}
              <div className="project-description">
                <h2 className="italic">Marmal8</h2>
                <p className="project-text">
                  Mobile app that brings heritage, culture, and history to life
                  by combining activity listings with engaging historical
                  content.
                </p>
                <div className="project-apps">
                  <img
                    className="project-app-logo"
                    src={figmaLogo}
                    alt="figmaLogo"
                  />
                </div>
              </div>
            </div>
            <div
              className={`project-item step-in right ${
                visibleProjects[2] ? "show" : ""
              }`}
              ref={(el) => (projectRefs.current[2] = el)}
            >
              {onHoverSafeGait ? (
                <video
                  className="project-gif"
                  src={safeGait}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onMouseLeave={() => setOnHoverSafeGait(false)}
                  onClick={() => setOnHoverSafeGait(false)}
                />
              ) : (
                <img
                  className="project-gif"
                  src={safeGaitStatic}
                  alt="SafeGait"
                  onMouseEnter={() => setOnHoverSafeGait(true)}
                  onClick={() => setOnHoverSafeGait(true)}
                />
              )}
              <div className="project-description">
                <h2 className="italic">SafeGait</h2>
                <p className="project-text">
                  Mobile app that collects IMU data and converts them to gait
                  (walking pattern) parameters to assess fatigue.
                </p>
                <div className="project-apps">
                  <img
                    className="project-app-logo"
                    src={figmaLogo}
                    alt="figmaLogo"
                  />
                  <img
                    className="project-app-logo"
                    src={flutterLogo}
                    alt="flutterLogo"
                  />
                  <img
                    className="project-app-logo"
                    src={awsLogo}
                    alt="awsLogo"
                  />
                </div>
              </div>
            </div>
            <div
              className={`project-item step-in left ${
                visibleProjects[3] ? "show" : ""
              }`}
              ref={(el) => (projectRefs.current[3] = el)}
            >
              {onHoverTutorSwipe ? (
                <video
                  className="project-gif"
                  src={tutorSwipe}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onMouseLeave={() => setOnHoverTutorSwipe(false)}
                  onClick={() => setOnHoverTutorSwipe(false)}
                />
              ) : (
                <img
                  className="project-gif"
                  src={tutorSwipeStatic}
                  alt="TutorSwipe"
                  onMouseEnter={() => setOnHoverTutorSwipe(true)}
                  onClick={() => setOnHoverTutorSwipe(true)}
                />
              )}
              <div className="project-description">
                <h2 className="italic">TutorSwipe</h2>
                <p className="project-text">
                  Swipe-based mobile app to connect tutors and students based on
                  filtered requirements.
                </p>
                <div className="project-apps">
                  <img
                    className="project-app-logo"
                    src={figmaLogo}
                    alt="figmaLogo"
                  />
                </div>
              </div>
            </div>
            <div
              className={`other-projects step-in right ${
                visibleProjects[4] ? "show" : ""
              }`}
              ref={(el) => (projectRefs.current[4] = el)}
            >
              <a
                href="https://github.com/ivorinee"
                className="button-other-projects"
                target="_blank"
                rel="noopener noreferrer"
              >
                Other GitHub projects...
              </a>
            </div>
          </div>
        </div>

        <div className="random-dump-card">
          <div className="title-container">
            <h1
              className={`title slide-in left ${
                visibleRandomDumps[0] ? "show" : ""
              }`}
              ref={(el) => (randomDumpRefs.current[0] = el)}
            >
              Random Dump.
            </h1>
          </div>
          <div className="random-dump-list">
            <div
              className={`random-dump-item step-in right ${
                visibleRandomDumps[1] ? "show" : ""
              }`}
              ref={(el) => (randomDumpRefs.current[1] = el)}
            >
              <div className="random-dump-description">
                <p className="random-dump-title">My type of songs</p>
                <p className="random-dump-subtitle italic">
                  click me to check it out on spotify
                </p>
              </div>
              <div className="random-dump-images">
                {songs.map((song, index) => (
                  <a
                    key={index}
                    href={songLinks[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={song}
                      alt={`song-${index + 1}`}
                      className="random-dump-image"
                    />
                  </a>
                ))}
              </div>
            </div>
            <div
              className={`random-dump-item step-in right ${
                visibleRandomDumps[2] ? "show" : ""
              }`}
              ref={(el) => (randomDumpRefs.current[2] = el)}
            >
              <div className="random-dump-description">
                <p className="random-dump-title">Favourite pastimes</p>
                <p className="random-dump-subtitle">
                  baking cakes, gaming with friends, watching historical
                  cdramas, anything artsy & crafty
                </p>
              </div>
              <div className="random-dump-images">
                {pastimes.map((pastime, index) => (
                  <img
                    src={pastime}
                    alt={`pastime-${index + 1}`}
                    className="random-dump-image"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`contact-card step-in ${contactVisible ? "show" : ""}`}
          ref={contactRef}
        >
          <div className="contact-text-container">
            <h2>Let's Get in Touch</h2>
            <p className="contact-text">
              Say hi, send memes, or tell me what song you’ve been into lately.
            </p>
          </div>
          <div className="contact-button-container">
            <a
              href="mailto:ivorine228@outlook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="contact-button" src={email} alt="email" />
            </a>
            <a
              href="https://www.linkedin.com/in/ivorine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="contact-button" src={linkedin} alt="email" />
            </a>
            <a
              href="https://www.instagram.com/ivorine_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="contact-button" src={instagram} alt="email" />
            </a>
          </div>
          <div className="contact-text-container">
            <p className="contact-text">
              Designed and coded by Ivorine ❤️
              <br />© 2024 Ivorine. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
