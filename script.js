// Typing Animation Script
const phrases = [
    "Bachelors of Science",
    "in Computer Science",
    "(BSCS) Undergraduate"
];

let phraseIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const typingElement = document.getElementById("typing");

function type() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        currentText = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentText = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    typingElement.innerHTML = currentText + '<span class="typing-cursor">|</span>';

    let typeSpeed = 100;

    if (isDeleting) {
        typeSpeed /= 1.5;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        if (phraseIndex === phrases.length) {
            phraseIndex = 0;
        }
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', function() {
    // Start Typing Animation
    if (typingElement) {
        setTimeout(type, 250);
    }

    // Navigation Link Active State Logic
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');

    function changeNavActiveState() {
        let currentSectionId = 'hero';
        const navbarHeight = navbar ? navbar.offsetHeight : 56;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - (navbarHeight + 20);
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    changeNavActiveState();
    window.addEventListener('scroll', changeNavActiveState);

    // Project Card GitHub Button Logic
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const repoUrl = card.dataset.repo;
        const githubButton = document.createElement('a');
        githubButton.classList.add('btn', 'btn-dark', 'github-button');
        githubButton.textContent = 'View on GitHub';
        githubButton.style.display = 'none';
        githubButton.href = '#';

        if (repoUrl && repoUrl.trim() !== "") {
            card.appendChild(githubButton);
        }

        card.addEventListener('click', function (event) {
            if (event.target.classList.contains('github-button')) return;

            // Hide other buttons
            document.querySelectorAll('.project-card .github-button').forEach(btn => {
                if (btn !== githubButton) {
                    btn.style.display = 'none';
                    btn.classList.remove('visible');
                }
            });

            // Toggle this button
            if (repoUrl && repoUrl.trim() !== "") {
                if (githubButton.style.display === 'none' || !githubButton.classList.contains('visible')) {
                    githubButton.href = repoUrl;
                    githubButton.style.display = 'inline-block';
                    githubButton.classList.add('visible');
                } else {
                    githubButton.style.display = 'none';
                    githubButton.classList.remove('visible');
                }
            }
        });

        // Button click handler
        if (repoUrl && repoUrl.trim() !== "" && card.contains(githubButton)) {
            githubButton.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                const finalRepoUrl = this.href;
                if (finalRepoUrl && finalRepoUrl !== '#') {
                    window.open(finalRepoUrl, '_blank');
                }
            });
        }
    });

    // Close button if clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.project-card')) {
            document.querySelectorAll('.project-card .github-button.visible').forEach(btn => {
                btn.style.display = 'none';
                btn.classList.remove('visible');
            });
        }
    });
});