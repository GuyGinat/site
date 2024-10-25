import { about } from "./pages/about.js";
import { games } from "./pages/games.js";
import { web } from "./pages/web.js";
import { music } from "./pages/music.js";
import { contact } from "./pages/contact.js";
import { spinningRoles } from "./pages/games/spinning-roles.js";
import { berto } from "./pages/games/berto.js";
import { jjj } from "./pages/games/jjj.js";

document.addEventListener("DOMContentLoaded", function() {
    const contentDiv = document.getElementById("content");
    let currentPage = null;  // To track the currently visible section

    const individualGames = {
        "spinningRoles": spinningRoles,
    };

    const pages = {
        about,
        games,
        web,
        music,
        contact,
        spinningRoles,
        berto,
        jjj
    };

    

    function loadPage(page) {
        console.log("Loading page:", page);
        if (currentPage) {
            // Slide out the current section
            currentPage.classList.add('slide-out');
            currentPage.addEventListener('transitionend', function () {
                // Clear old content
                contentDiv.innerHTML = pages[page];
    
                // Load the new section
                const newSection = contentDiv.querySelector("section");
                newSection.classList.add('hidden'); // Start hidden for slide-in effect
    
                // Trigger slide-in animation
                setTimeout(() => {
                    newSection.classList.add('show');
                    newSection.classList.remove('hidden');
                }, 100);
    
                // Update the current page reference
                currentPage = newSection;
    
                // If loading the games page, attach card event listeners
                if (page === "games") {
                    addGameCardListeners();
                }
    
                // Reapply IntersectionObserver
                applyIntersectionObserver();
            }, { once: true });
        } else {
            // First-time load
            contentDiv.innerHTML = pages[page];
            const newSection = contentDiv.querySelector("section");
            newSection.classList.add('hidden'); // Start hidden
            setTimeout(() => {
                newSection.classList.add('show');
                newSection.classList.remove('hidden');
            }, 100);
            currentPage = newSection;
            applyIntersectionObserver();
        }
    }
    
    
    
    

    function applyIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }
            });
        });

        const hiddenElements = document.querySelectorAll(".hidden");
        hiddenElements.forEach((el) => observer.observe(el));
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
        });
    });



    // Function to load a game page based on the `data-game` attribute
    function loadGamePage(gameId) {
        const gameContent = individualGames[gameId];
        if (gameContent) {
            document.getElementById("content").innerHTML = gameContent;
        } else {
            console.error("Game page not found for:", gameId);
        }
    }


    function addGameCardListeners() {
        document.querySelectorAll(".game-card").forEach(card => {
            card.addEventListener("click", () => {
                const gameId = card.getAttribute("data-game");
                loadPage(gameId);
            });
        });
    }
    
    // Simplified header link click handling
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
        });
    });

    // Load the default content on page load (e.g., About page)
    loadPage("about");
});



