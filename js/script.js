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

const initializeCvDownload = () => {
  const downloadButton = document.getElementById('downloadCV');
  if (!downloadButton) {
    return;
  }

  downloadButton.addEventListener('click', () => {
    const JsPDF = window.jspdf?.jsPDF;
    if (!JsPDF) {
      window.alert('The CV could not be generated. Please try again when you are online.');
      return;
    }

    const documentPdf = new JsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = documentPdf.internal.pageSize.getWidth();
    const margin = 48;
    const contentWidth = pageWidth - margin * 2;
    let cursorY = 166;

    documentPdf.setProperties({
      title: 'Hastings Kholola - CV',
      author: 'Hastings Kholola'
    });
    documentPdf.setFillColor(5, 15, 36);
    documentPdf.rect(0, 0, pageWidth, 142, 'F');
    documentPdf.setTextColor(245, 249, 255);
    documentPdf.setFont('helvetica', 'bold');
    documentPdf.setFontSize(25);
    documentPdf.text('HASTINGS KHOLOLA', margin, 48);
    documentPdf.setTextColor(64, 183, 255);
    documentPdf.setFontSize(11);
    documentPdf.text('COMPUTER SCIENCE STUDENT  |  WEB & GRAPHIC DESIGN', margin, 70);
    documentPdf.setTextColor(220, 232, 247);
    documentPdf.setFont('helvetica', 'normal');
    documentPdf.setFontSize(9);
    documentPdf.text('Malawi  |  0983152657  |  0888373383', margin, 98);
    documentPdf.text('hastingskholola7@gmail.com  |  github.com/Chiko265', margin, 114);

    const addSection = (title, paragraphs) => {
      documentPdf.setFont('helvetica', 'bold');
      documentPdf.setFontSize(11);
      documentPdf.setTextColor(8, 118, 185);
      documentPdf.text(title.toUpperCase(), margin, cursorY);
      cursorY += 17;

      documentPdf.setFont('helvetica', 'normal');
      documentPdf.setFontSize(9.5);
      documentPdf.setTextColor(37, 49, 66);
      paragraphs.forEach((paragraph) => {
        const lines = documentPdf.splitTextToSize(paragraph, contentWidth);
        documentPdf.text(lines, margin, cursorY, { lineHeightFactor: 1.35 });
        cursorY += lines.length * 13 + 4;
      });

      cursorY += 8;
      documentPdf.setDrawColor(215, 226, 238);
      documentPdf.setLineWidth(0.7);
      documentPdf.line(margin, cursorY - 2, pageWidth - margin, cursorY - 2);
    };

    addSection('Profile', [
      'Computer Science student interested in building practical digital solutions through website development, WordPress, graphic design, and networking.'
    ]);
    addSection('Education', [
      'Bachelor of Science in Computer Science, DMI - St. John the Baptist University (In Progress).'
    ]);
    addSection('Technical Skills', [
      'Programming: Python, Java, C, and C++',
      'Web: HTML, CSS, JavaScript, Bootstrap, and WordPress',
      'Graphic design: CorelDRAW, brand visuals, and creative layouts',
      'Databases and tools: SQLite, VS Code, and GitHub',
      'Networking: connectivity, troubleshooting, and system communication'
    ]);
    addSection('Project Areas', [
      'Website development | WordPress development | Graphic design | Networking'
    ]);

    documentPdf.setFont('helvetica', 'normal');
    documentPdf.setFontSize(8);
    documentPdf.setTextColor(95, 108, 126);
    documentPdf.text('Portfolio: github.com/Chiko265', margin, 790);
    documentPdf.save('Hastings-Kholola-CV.pdf');
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
    initializeCvDownload();
    initializeContactForm();
  }, { once: true });
} else {
  initializeTheme();
  setActiveNav();
  initializeBackToTop();
  initializeCvDownload();
  initializeContactForm();
}
