document.addEventListener("DOMContentLoaded", function() {
    const contentDiv = document.getElementById("content");
    let currentPage = null;  // To track the currently visible section

    const pages = {
        about: `
            <section id="grad-start" class="hidden">
                <div class="about">
                    <h2>About Me</h2>
                    <p>
                        Hi! My name is Guy, and I am a game developer / web tinkerer / aspiring musician.
                    </p>
                </div>
            </section>
        `,
        games: `
            <section id="grad-second" class="hidden">
                <div class="games">
                    <h2>Games</h2>
                    <p>These days I am a game developer working for a mobile games company...</p>
                </div>
            </section>
        `,
        web: `
            <section class="hidden">
                <div class="web">
                    <h2>Web</h2>
                    <p>I used to build web applications before transitioning to game development...</p>
                </div>
            </section>
        `,
        music: `
            <section class="hidden">
                <div class="music">
                    <h2>Music</h2>
                    <p>Music ties everything together for me, from playing guitar to producing...</p>
                </div>
            </section>
        `,
        contact: `
            <section class="hidden">
                <div class="contact">
                    <h2>Contact</h2>
                    <p>Get in touch with me via email at example@example.com.</p>
                </div>
            </section>
        `
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
                }, 1000);  // Add a slight delay (100ms) to ensure transition registers
    
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
