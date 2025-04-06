// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navOverlay = document.getElementById('navOverlay');
    
    // Toggle navigation when menu button is clicked
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
    });
    
    // Close navigation when overlay is clicked
    navOverlay.addEventListener('click', () => {
        mainNav.classList.remove('active');
        navOverlay.classList.remove('active');
    });
    
    // Close navigation when a nav link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetchWeCodedStories();
});

function fetchWeCodedStories() {
    const storiesContainer = document.getElementById('stories-container');
    
    // Fetch posts tagged with 'wecoded'
    fetch('https://dev.to/api/articles?tag=wecoded&per_page=9')
        .then(response => response.json())
        .then(stories => {
            storiesContainer.innerHTML = ''; // Clear loading message
            
            if (stories.length === 0) {
                storiesContainer.innerHTML = '<p class="no-stories">No stories found. Check back later!</p>';
                return;
            }
            
            // Process each story and add to the container
            stories.forEach(story => {
                const storyCard = createStoryCard(story);
                storiesContainer.appendChild(storyCard);
            });
        })
        .catch(error => {
            console.error('Error fetching stories:', error);
            storiesContainer.innerHTML = '<p class="error">Failed to load stories. Please try again later.</p>';
        });
}

function createStoryCard(story) {
    const card = document.createElement('article');
    card.className = 'story-card';
    
    // Use cover image if available, or a placeholder
    const imageUrl = story.cover_image || 'assets/placeholder.png';
    
    // Format the publication date
    const publishedDate = new Date(story.published_at).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
    });
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${story.title}" class="story-image">
        <div class="story-content">
            <h3 class="story-title">${story.title}</h3>
            <div class="story-author">
                <img src="${story.user.profile_image}" alt="${story.user.name}" class="author-image">
                <span>${story.user.name}</span>
            </div>
            <p>${story.description}</p>
            <p class="story-date">Published: ${publishedDate}</p>
            <div class="story-button-container">
                <a href="${story.url}" target="_blank" class="btn primary">Read More</a>
            </div>
        </div>
    `;
    
    return card;
}