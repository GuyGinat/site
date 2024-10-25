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
                <div class="music" id="music-section">
            <h2>Music</h2>
            <div>
                <p>What ties everything together for me has always been music, playing guitar from a young age,
                <br>and picking up more instruments as I grow.<br>For the games I make and just for pure fun and creative outlet, 
                <br>I play and produce some music, here are some tunes I've made, hope you enjoy!
                </p>
            </div>
            <div>
                <iframe width="100%" height="90" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1345030798&color=%23d4447c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/guy-ginat-548264090" title="Guy Ginat" target="_blank" style="color: #cccccc; text-decoration: none;">Guy Ginat</a> · <a href="https://soundcloud.com/guy-ginat-548264090/french-bot-tragedy" title="French Bot Tragedy" target="_blank" style="color: #cccccc; text-decoration: none;">French Bot Tragedy</a></div>
                <iframe width="100%" height="90" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1345030810&color=%23d4447c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/guy-ginat-548264090" title="Guy Ginat" target="_blank" style="color: #cccccc; text-decoration: none;">Guy Ginat</a> · <a href="https://soundcloud.com/guy-ginat-548264090/finally" title="Finally" target="_blank" style="color: #cccccc; text-decoration: none;">Finally</a></div>
                <iframe width="100%" height="90" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1345030789&color=%23d4447c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/guy-ginat-548264090" title="Guy Ginat" target="_blank" style="color: #cccccc; text-decoration: none;">Guy Ginat</a> · <a href="https://soundcloud.com/guy-ginat-548264090/miami-vice" title="Miami Vice" target="_blank" style="color: #cccccc; text-decoration: none;">Miami Vice</a></div>
                <iframe width="100%" height="90" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1345030822&color=%23d4447c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/guy-ginat-548264090" title="Guy Ginat" target="_blank" style="color: #cccccc; text-decoration: none;">Guy Ginat</a> · <a href="https://soundcloud.com/guy-ginat-548264090/dusk-drive" title="Dusk Drive" target="_blank" style="color: #cccccc; text-decoration: none;">Dusk Drive</a></div>
                <iframe width="100%" height="90" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1345030858&color=%23d4447c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/guy-ginat-548264090" title="Guy Ginat" target="_blank" style="color: #cccccc; text-decoration: none;">Guy Ginat</a> · <a href="https://soundcloud.com/guy-ginat-548264090/desert-flow" title="Desert Flow" target="_blank" style="color: #cccccc; text-decoration: none;">Desert Flow</a></div>
                <iframe width="100%" height="90" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1345030834&color=%23d4447c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/guy-ginat-548264090" title="Guy Ginat" target="_blank" style="color: #cccccc; text-decoration: none;">Guy Ginat</a> · <a href="https://soundcloud.com/guy-ginat-548264090/dream" title="Dream" target="_blank" style="color: #cccccc; text-decoration: none;">Dream</a></div>
                </div>
            </div>
            </section>
        `,
        contact: `
            <section class="hidden">
                <div class="contact">
                    <h2>Contact</h2>
                <p>Get in touch with me!</p>
                <ul class="contact-list">
                    <li><span>Email:</span> <a href="mailto:guyginat4@gmail.com">guyginat4@gmail.com</a></li>
                    <li><span>LinkedIn:</span> <a href="https://www.linkedin.com/in/guy-ginat/" target="_blank">https://www.linkedin.com/in/guy-ginat/</a></li>
                    <li><span>Itch.io:</span> <a href="https://guyginat.itch.io/" target="_blank">https://guyginat.itch.io/</a></li>
                </ul>
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
