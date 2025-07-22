//Audio Mp3 Begin
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playIcon.src = 'https://files.catbox.moe/mhzicg.svg';
  } else {
    audio.pause();
    playIcon.src = 'https://files.catbox.moe/qxi0yr.svg';
  }
});

audio.addEventListener('ended', () => {
  playIcon.src = 'https://files.catbox.moe/zce1g9.svg';
});
// End

// begin Fetching .md file
async function fetchMarkdownFile() {
  try {
    const response = await fetch('https://files.catbox.moe/vkw82b.md');
    if (!response.ok) throw new Error('Dosya bulunamadı.');
    return await response.text();
  } catch (error) {
    console.error(error);
    return 'Dosya yüklenirken bir hata oluştu.';
  }
}
// End

// Text To Hyperlink, Anchor
function convertMarkdownToHTML(markdown) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let html = markdown.replace(linkRegex, '<a href="$2" target="_blank">$1</a>');

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  return html;
}
// End

// begin Typing effect
async function typeEffect(content, elementId, delay = 15) {
  const element = document.getElementById(elementId);
  let insideTag = false;
  let typedText = '';

  for (let i = 0; i < content.length; i++) {
    if (content[i] === '<') {
      insideTag = true;
    }

    typedText += content[i];

    if (content[i] === '>') {
      insideTag = false;
    }

    element.innerHTML = typedText;

    await new Promise(resolve => setTimeout(resolve, delay));
  }
}
// End

// begin Scroll stuffs
async function adjustNotepadHeight() {
  const viewportHeight = window.innerHeight;
  const notepadContainerHeight = document.querySelector('.notepad-container').offsetHeight;
  const notepad = document.querySelector('.notepad');

  if (notepad.scrollHeight > viewportHeight) {
    notepad.style.height = `${viewportHeight}px`;
  } else {
    notepad.style.height = `${notepadContainerHeight}px`;
  }
}
// End

// begin Markdown display without Spotify
(async () => {
  let markdownHTML = await fetchMarkdownFile();
  await typeEffect(convertMarkdownToHTML(markdownHTML), 'content', 15);
})();
// End

// begin more stuffs for scroll
const notepad = document.querySelector('.notepad');
const guideLines = document.querySelector('.guide-lines');
const redLine = document.querySelector('.red-line');

notepad.addEventListener('scroll', () => {
  const scrollTop = notepad.scrollTop;
  guideLines.style.transform = `translateY(${scrollTop}px)`;
  redLine.style.transform = `translateY(${scrollTop}px)`;
});

window.addEventListener('resize', adjustNotepadHeight);
adjustNotepadHeight();
// End

// Heart Rain
function createHeart() {
  const heart = document.createElement('div');
  const randomImageUrl = 'https://media.tenor.com/QC3oCl9WdzoAAAAj/heart-crystal-heart.gif';
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.style.backgroundImage = `url(${randomImageUrl})`;
  heart.style.backgroundSize = 'cover';
  heart.style.width = '50px';
  heart.style.height = '50px';
  document.body.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300); // <-- Speed
// End
