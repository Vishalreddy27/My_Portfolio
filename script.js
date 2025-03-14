// DOM Elements
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');
const loader = document.querySelector('.loader');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(45, 52, 54, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'var(--primary)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update scroll progress
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
    
    // Update active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href')?.slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
burger?.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav && burger && !nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Handle touch events
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) return;

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Left swipe
            nav.classList.remove('active');
        } else {
            // Right swipe
            nav.classList.add('active');
        }
    }

    xDown = null;
    yDown = null;
}

// Optimize animations for mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Enhanced scroll animations with intersection observer
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add specific animations based on element type
            if (entry.target.classList.contains('hero-content')) {
                const elements = entry.target.children;
                Array.from(elements).forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.3}s`;
                    el.style.opacity = '1';
                });
            }
            
            // Animate skill categories with stagger effect
            if (entry.target.classList.contains('skill-category')) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                
                const skillItems = entry.target.querySelectorAll('.skill-logo');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(0)';
                        item.style.opacity = '1';
                    }, index * 100);
                });
            }
            
            // Animate project cards with stagger effect
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.transform = 'translateY(0) rotate(0)';
                entry.target.style.opacity = '1';
            }
            
            // Animate section headings
            if (entry.target.classList.contains('section')) {
                const heading = entry.target.querySelector('h2');
                if (heading) {
                    heading.style.transform = 'translateY(0)';
                    heading.style.opacity = '1';
                }
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-50px'
});

// Section Heading Animations with Icons
function initSectionAnimations() {
    const sectionIcons = {
        'about': '👨‍💻',
        'education': '🎓',
        'skills': '⚡',
        'projects': '🚀',
        'interests': '🎯'
    };

    document.querySelectorAll('.section').forEach(section => {
        const heading = section.querySelector('h2');
        if (!heading) return;

        // Add icon and animation wrapper
        const sectionId = section.id;
        const icon = sectionIcons[sectionId] || '💫';
        
        // Preserve the original text content
        const headingText = heading.textContent;
        
        heading.innerHTML = `
            <span class="section-icon">${icon}</span>
            <span class="section-text">${headingText}</span>
        `;
        
        // Make sure the heading is visible immediately
        heading.style.opacity = '1';
        heading.style.visibility = 'visible';
        heading.style.display = 'flex';
    });
}

// Create Modern Skill Logos
function createSkillLogos() {
    // Define skill configurations
    const skillConfigs = {
        // Core Computer Science
        'Operating Systems': { icon: 'fas fa-laptop-code', color: '#3498db' },
        'DBMS': { icon: 'fas fa-database', color: '#2ecc71' },
        'OOP': { icon: 'fas fa-cubes', color: '#9b59b6' },
        'DSA': { icon: 'fas fa-project-diagram', color: '#f1c40f' },
        
        // Programming Languages
        'Python': { icon: 'fab fa-python', color: '#4B8BBE' },
        'Java': { icon: 'fab fa-java', color: '#f89820' },
        'C++': { icon: 'fas fa-code', color: '#00599C' },
        'R': { icon: 'fas fa-chart-line', color: '#276DC3' },
        
        // Web Development
        'HTML': { icon: 'fab fa-html5', color: '#E34F26' },
        'CSS': { icon: 'fab fa-css3-alt', color: '#1572B6' },
        'JavaScript': { icon: 'fab fa-js', color: '#F7DF1E' },
        'Flask': { icon: 'fas fa-flask', color: '#000000' },
        'Django': { icon: 'fab fa-python', color: '#092E20' },
        
        // Data Science & Analytics
        'Scikit-learn': { icon: 'fas fa-brain', color: '#F89939', wide: true },
        'TensorFlow': { icon: 'fas fa-brain', color: '#FF6F00', wide: true },
        'Power BI': { icon: 'fas fa-chart-bar', color: '#F2C811' },
        'Seaborn': { icon: 'fas fa-chart-area', color: '#4CB5AE' },
        'Plotly': { icon: 'fas fa-chart-line', color: '#3F4F75' },
        
        // Soft Skills
        'Problem Solving': { icon: 'fas fa-puzzle-piece', color: '#3498db', wide: true },
        'Team Leadership': { icon: 'fas fa-users', color: '#2ecc71', wide: true },
        'Communication': { icon: 'fas fa-comments', color: '#e74c3c', wide: true },
        'Adaptability': { icon: 'fas fa-sync-alt', color: '#9b59b6', wide: true },
        
        // DevOps & Tools
        'Git': { icon: 'fab fa-git-alt', color: '#F05032' },
        'Docker': { icon: 'fab fa-docker', color: '#2496ED' },
        'AWS': { icon: 'fab fa-aws', color: '#FF9900' },
        'Jenkins': { icon: 'fas fa-cogs', color: '#D33833' }
    };

    // Define category skills mapping
    const categorySkillsMap = {
        'programming': ['Python', 'Java', 'C++', 'R'],
        'computer': ['Operating Systems', 'DBMS', 'OOP', 'DSA'],
        'web': ['HTML', 'CSS', 'JavaScript', 'Flask', 'Django'],
        'data': ['Scikit-learn', 'TensorFlow', 'Power BI', 'Seaborn', 'Plotly'],
        'soft': ['Problem Solving', 'Team Leadership', 'Communication', 'Adaptability'],
        'devops': ['Git', 'Docker', 'AWS', 'Jenkins']
    };

    // Get all skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // If no categories exist, return
    if (skillCategories.length === 0) {
        console.warn('No skill categories found.');
        return;
    }
    
    // Process existing categories
    skillCategories.forEach(category => {
        let skillsList = category.querySelector('.skill-items');
        
        // If no skill-items container exists, create one
        if (!skillsList) {
            skillsList = document.createElement('div');
            skillsList.className = 'skill-items';
            category.appendChild(skillsList);
        }
        
        // Get category title
        const categoryTitle = category.querySelector('h3')?.textContent.trim().toLowerCase() || '';
        
        // Find matching skills for this category
        let categorySkills = [];
        for (const [key, skills] of Object.entries(categorySkillsMap)) {
            if (categoryTitle.includes(key)) {
                categorySkills = skills;
                break;
            }
        }
        
        // If no skills found, use a default set
        if (categorySkills.length === 0) {
            for (const key in categorySkillsMap) {
                if (categoryTitle.includes(key)) {
                    categorySkills = categorySkillsMap[key];
                    break;
                }
            }
        }
        
        // Clear existing skills
        skillsList.innerHTML = '';
        
        // Adjust grid layout for categories with long skill names
        if (categoryTitle.includes('soft') || categoryTitle.includes('data')) {
            skillsList.style.gridTemplateColumns = 'repeat(2, 1fr)';
            skillsList.style.gap = '1.2rem';
        }
        
        // Create skill logos
        categorySkills.forEach((skillName, index) => {
            const config = skillConfigs[skillName] || { 
                icon: 'fas fa-code', 
                color: '#3498db' 
            };
            
            const skillLogo = document.createElement('div');
            skillLogo.className = 'skill-logo';
            
            // Adjust width for longer skill names
            if (config.wide) {
                skillLogo.style.maxWidth = '130px';
            }
            
            // Add title attribute for hover tooltip
            skillLogo.setAttribute('title', skillName);
            
            skillLogo.innerHTML = `
                <div class="skill-logo-icon" style="background-color: ${config.color}">
                    <i class="${config.icon}"></i>
                </div>
                <div class="skill-logo-name">${skillName}</div>
            `;
            
            // Add hover effect
            skillLogo.addEventListener('mouseenter', () => {
                skillLogo.style.transform = 'translateY(-5px)';
                skillLogo.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
                skillLogo.style.zIndex = '10';
                
                // Show full text on hover for long skill names
                const nameElement = skillLogo.querySelector('.skill-logo-name');
                nameElement.style.fontWeight = '600';
            });
            
            skillLogo.addEventListener('mouseleave', () => {
                skillLogo.style.transform = 'translateY(0)';
                skillLogo.style.boxShadow = 'none';
                skillLogo.style.zIndex = '1';
                
                // Reset text display
                const nameElement = skillLogo.querySelector('.skill-logo-name');
                nameElement.style.fontWeight = '500';
            });
            
            skillsList.appendChild(skillLogo);
        });
    });
    
    // Ensure equal heights for all skill categories
    setTimeout(equalizeSkillCategoryHeights, 300);
}

// Function to equalize skill category heights
function equalizeSkillCategoryHeights() {
    const categories = document.querySelectorAll('.skill-category');
    let maxHeight = 0;
    
    // Reset heights first
    categories.forEach(category => {
        category.style.height = 'auto';
    });
    
    // Find the tallest category
    categories.forEach(category => {
        const height = category.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    
    // Set all categories to the same height
    categories.forEach(category => {
        category.style.height = `${maxHeight}px`;
    });
    
    // Also equalize skill items within each category
    categories.forEach(category => {
        const skillItems = category.querySelectorAll('.skill-logo');
        let maxItemHeight = 0;
        
        // Reset heights first
        skillItems.forEach(item => {
            item.style.height = 'auto';
        });
        
        // Find the tallest item
        skillItems.forEach(item => {
            const height = item.offsetHeight;
            if (height > maxItemHeight) {
                maxItemHeight = height;
            }
        });
        
        // Set all items to the same height
        skillItems.forEach(item => {
            item.style.height = `${maxItemHeight}px`;
        });
    });
}

// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
});

function updateThemeIcon(isDarkMode) {
    themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Create floating shapes for hero section
function createFloatingShapes() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const shapes = [
        { class: 'shape-1', delay: 0 },
        { class: 'shape-2', delay: 1 },
        { class: 'shape-3', delay: 2 }
    ];

    shapes.forEach(shape => {
        const element = document.createElement('div');
        element.className = `shape ${shape.class}`;
        element.style.animationDelay = `${shape.delay}s`;
        hero.appendChild(element);
    });
}

// Create animated background particles
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        hero.appendChild(particle);
    }
}

// Initialize everything on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove loader with fade out effect
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Create particles and floating shapes
    createParticles();
    createFloatingShapes();

    // Add scroll reveal class to elements
    document.querySelectorAll('.skill-category, .project-card, .edu-card, .interest-item').forEach(el => {
        el.classList.add('scroll-reveal');
        scrollObserver.observe(el);
    });

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('scroll-reveal');
        scrollObserver.observe(section);
    });

    // Initialize other animations
    initSectionAnimations();
    createSkillLogos();
    setupThemeToggle();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });
}); 