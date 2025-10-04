// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
   mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
mobileNavLinks.forEach((link) => {
   link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
   });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
navLinks.forEach((link) => {
   link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
         const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
         window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
         });
      }
   });
});

// Active navigation link highlighting
function updateActiveNavLink() {
   const sections = document.querySelectorAll("section[id]");
   const scrollPos = window.scrollY + 100;

   sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
         // Remove active class from all nav links
         navLinks.forEach((link) =>
            link.classList.remove("text-primary", "font-semibold")
         );
         navLinks.forEach((link) => link.classList.add("text-gray-700"));

         // Add active class to current nav link
         if (navLink) {
            navLink.classList.remove("text-gray-700");
            navLink.classList.add("text-primary", "font-semibold");
         }
      }
   });
}

// Fade in animation on scroll
function handleScrollAnimations() {
   const fadeElements = document.querySelectorAll(".fade-in");

   fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
         element.classList.add("visible");
      }
   });
}

// Animate skill bars when they come into view
function animateSkillBars() {
   const skillBars = document.querySelectorAll(".skill-bar");

   skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !bar.classList.contains("animated")) {
         const width = bar.getAttribute("data-width");
         bar.style.width = width + "%";
         bar.classList.add("animated");
      }
   });
}

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
   let i = 0;
   element.innerHTML = "";

   function type() {
      if (i < text.length) {
         element.innerHTML += text.charAt(i);
         i++;
         setTimeout(type, speed);
      }
   }

   type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
   const heroTitle = document.querySelector("#home h1");
   if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, 150);
   }
});

// Contact form handling
const contactForm = document.querySelector("form");
if (contactForm) {
   contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.firstName || !data.email || !data.message) {
         alert("Please fill in all required fields.");
         return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
         alert("Thank you for your message! I will get back to you soon.");
         contactForm.reset();
         submitBtn.textContent = originalText;
         submitBtn.disabled = false;
      }, 2000);
   });
}

// Parallax effect for hero section
function handleParallax() {
   const heroSection = document.querySelector("#home");
   const scrolled = window.pageYOffset;
   const rate = scrolled * -0.5;

   if (heroSection) {
      heroSection.style.transform = `translateY(${rate}px)`;
   }
}

// Navbar background change on scroll
function handleNavbarScroll() {
   const navbar = document.querySelector("nav");
   if (window.scrollY > 50) {
      navbar.classList.add("bg-white/95");
      navbar.classList.remove("bg-white/90");
   } else {
      navbar.classList.add("bg-white/90");
      navbar.classList.remove("bg-white/95");
   }
}

// Project filter functionality (if needed in future)
function filterProjects(category) {
   const projects = document.querySelectorAll("#projects .bg-white");

   projects.forEach((project) => {
      if (category === "all" || project.dataset.category === category) {
         project.style.display = "block";
         project.classList.add("fade-in");
      } else {
         project.style.display = "none";
         project.classList.remove("fade-in");
      }
   });
}

// Intersection Observer for better performance
const observerOptions = {
   threshold: 0.1,
   rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         entry.target.classList.add("visible");
      }
   });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener("DOMContentLoaded", () => {
   const fadeElements = document.querySelectorAll(".fade-in");
   fadeElements.forEach((element) => {
      observer.observe(element);
   });
});

// Scroll event listeners
window.addEventListener("scroll", () => {
   updateActiveNavLink();
   handleScrollAnimations();
   animateSkillBars();
   handleParallax();
   handleNavbarScroll();
});

// Resize event listener
window.addEventListener("resize", () => {
   // Close mobile menu on resize
   if (window.innerWidth >= 768) {
      mobileMenu.classList.add("hidden");
   }
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
   // Add loading animation
   document.body.style.opacity = "0";
   document.body.style.transition = "opacity 0.5s ease";

   setTimeout(() => {
      document.body.style.opacity = "1";
   }, 100);

   // Initialize skill bars
   const skillBars = document.querySelectorAll(".skill-bar");
   skillBars.forEach((bar) => {
      bar.style.width = "0%";
   });

   // Add click handlers for project cards
   const projectCards = document.querySelectorAll("#projects .card-hover");
   projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
         card.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
         card.style.transform = "translateY(0) scale(1)";
      });
   });
});

// Add some fun interactions
document.addEventListener("DOMContentLoaded", () => {
   // Add floating animation to hero elements
   const heroElements = document.querySelectorAll("#home .fade-in");
   heroElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`;
      element.classList.add("animate-pulse");
   });

   // Add hover effects to skill icons
   const skillIcons = document.querySelectorAll("#skills .bg-gray-50");
   skillIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
         icon.style.transform = "scale(1.1) rotate(5deg)";
         icon.style.transition = "transform 0.3s ease";
      });

      icon.addEventListener("mouseleave", () => {
         icon.style.transform = "scale(1) rotate(0deg)";
      });
   });
});

// Add smooth reveal animation for sections
function revealOnScroll() {
   const reveals = document.querySelectorAll("section");

   reveals.forEach((reveal) => {
      const windowHeight = window.innerHeight;
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
         reveal.classList.add("active");
      }
   });
}

window.addEventListener("scroll", revealOnScroll);

// Add CSS for reveal animation
const style = document.createElement("style");
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    section.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    #home {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
