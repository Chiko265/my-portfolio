const typedWords = [
  'Website Developer',
  'WordPress Developer',
  'Graphic Designer',
  'Networking Enthusiast',
  'Computer Science Student',
  'Problem Solver',
  'Tech Enthusiast'
];

const typingText = document.getElementById('typing-text');
if (typingText) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentWord = typedWords[wordIndex];

    if (!isDeleting) {
      charIndex++;
    } else {
      charIndex--;
    }

    typingText.textContent = currentWord.slice(0, charIndex);

    let typeSpeed = isDeleting ? 70 : 110;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typedWords.length;
      typeSpeed = 200;
    }

    setTimeout(typeLoop, typeSpeed);
  };

  typeLoop();
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const themeToggle = document.getElementById('themeToggle');

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-theme', isLight);

  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = isLight ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
  }
};

const initializeTheme = () => {
  try {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
    applyTheme(initialTheme);
  } catch (error) {
    applyTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      const nextTheme = isLight ? 'dark' : 'light';

      try {
        localStorage.setItem('theme', nextTheme);
      } catch (error) {
        // Ignore storage issues in restrictive browser contexts.
      }

      applyTheme(nextTheme);
    });
  }
};

const setActiveNav = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === currentPage || (currentPage === '' && href === 'index.html');
    link.classList.toggle('active', isActive);
  });
};

const initializeBackToTop = () => {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) {
    return;
  }

  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 250);
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

const initializeContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (!contactForm || !formStatus) {
    return;
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please complete all fields before sending your message.';
      formStatus.classList.add('visible');
      return;
    }

    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:hastingskholola7@gmail.com?subject=${subject}&body=${body}`;
    formStatus.textContent = 'Your email app is opening. Thanks for reaching out!';
    formStatus.classList.add('visible');
    contactForm.reset();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setActiveNav();
    initializeBackToTop();
    initializeContactForm();
  }, { once: true });
} else {
  initializeTheme();
  setActiveNav();
  initializeBackToTop();
  initializeContactForm();
}
