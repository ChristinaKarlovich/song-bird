import "./styles/style.scss";
import logoHeader from "./../../assets/img/logo-transparent.png";
import githublogo from "./../../assets/img/github.png";
import rsslogo from "./../../assets/icon/rs_school_js.svg";

import showSelfCheck from "../../check";

showSelfCheck();

const linkDiv = document.querySelector(".header-grid");

if (linkDiv) {
  const logoA = document.createElement("a");
  logoA.href = "index.html";
  linkDiv.append(logoA);
  const logoImg = document.createElement("img");
  logoImg.src = logoHeader;
  logoA.append(logoImg);

  const aboutA = document.createElement("a");
  aboutA.href = "index.html";
  aboutA.innerHTML = "Главная";
  linkDiv.append(aboutA);

  const quizA = document.createElement("a");
  quizA.href = "quiz.html";
  quizA.innerHTML = "Викторина";
  linkDiv.append(quizA);
}

const authorLogoDiv = document.querySelector(".author");
const authorLogo = document.createElement("img");
authorLogo.src = githublogo;
authorLogoDiv.prepend(authorLogo);

const rssLogoDiv = document.querySelector(".school-logo");
const rssLogoImg = document.createElement("img");
rssLogoImg.src = rsslogo;
rssLogoDiv.append(rssLogoImg);
