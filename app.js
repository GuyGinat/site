import { about } from "./pages/about.js";
import { games } from "./pages/games.js";
import { web } from "./pages/web.js";
import { music } from "./pages/music.js";
import { contact } from "./pages/contact.js";

document.addEventListener("DOMContentLoaded", function() {
    const contentDiv = document.getElementById("content");
    let currentPage = null;  // To track the currently visible section

    const pages = {
        about,
        games,
        game1: `
            <section id="grad-second" class="hidden">
                <div class="games">
                    <h2>Game 1</h2>
                    <p>Details about Game 1...</p>
                </div>
            </section>
        `,
        game2: `
            <section id="grad-second" class="hidden">
                <div class="games">
                    <h2>Game 2</h2>
                    <p>Details about Game 2...</p>
                </div>
            </section>
        `,
        game3: `
            <section id="grad-second" class="hidden">
                <div class="games">
                    <h2>Game 3</h2>
                    <p>Details about Game 3...</p>
                </div>
            </section>
        `,
        web,
        music,
        contact
    };

    function loadPage(page) {
        if (currentPage) {
            // Step 1: Slide the current section out
            currentPage.classList.add('slide-out');
    
            // Step 2: Wait for the slide-out animation to finish
            currentPage.addEventListener('transitionend', function() {
                // Remove the old content after sliding out
                contentDiv.innerHTML = pages[page];
    
                // Step 3: Apply the new section (start hidden)
                const newSection = contentDiv.querySelector("section");
    
                // Ensure the new section starts hidden (off-screen to the left)
                newSection.classList.add('hidden');
    
                // Step 4: Trigger the slide-in with a delay
                setTimeout(() => {
                    newSection.classList.add('show');
                    newSection.classList.remove('hidden');
                }, 501);  // Add a slight delay (100ms) to ensure transition registers
    
                // Update the current page reference
                currentPage = newSection;
    
                // Reapply IntersectionObserver to the new elements
                applyIntersectionObserver();
            }, { once: true });
        } else {
            // First load (no current page)
            contentDiv.innerHTML = pages[page];
            const newSection = contentDiv.querySelector("section");
    
            // Ensure the new section starts hidden (off-screen to the left)
            newSection.classList.add('hidden');
    
            // Trigger the slide-in with a delay
            setTimeout(() => {
                newSection.classList.add('show');
                newSection.classList.remove('hidden');
            }, 100);  // Add a slight delay (100ms)
    
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

    // Load the default content on page load (e.g., About page)
    loadPage("about");
});
