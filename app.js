import { about } from "./pages/about.js";
import { games } from "./pages/games.js";
import { web } from "./pages/web.js";
import { music } from "./pages/music.js";
import { contact } from "./pages/contact.js";
import { spinningRoles } from "./pages/games/spinning-roles.js";
import { berto } from "./pages/games/berto.js";
import { jjj } from "./pages/games/jjj.js";
import { damnPusher } from "./pages/games/damn-pusher.js";
import { belgrad } from "./pages/games/belgrad.js";
import { superlative } from "./pages/projects/superlative.js";

document.addEventListener("DOMContentLoaded", function() {
    const contentDiv = document.getElementById("content");
    let currentPage = null;  // To track the currently visible section

    const pages = {
        about,
        games,
        web,
        music,
        contact,
        spinningRoles,
        berto,
        jjj,
        damnPusher,
        belgrad,
        superlative
    };

    

    function loadPage(page) {
        console.log(`Loading page: ${page}`);
        if (!pages[page]) {
            console.error(`Page ${page} not found`);
            return;
        }

        // Set the URL hash to match the current page
        window.location.hash = page;

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
    const hashPage = window.location.hash.substring(1);
    if (hashPage && pages[hashPage]) {
        loadPage(hashPage);
    } else {
        loadPage("about"); // Default page
    }
});



