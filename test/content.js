// content.js
const images = [
  chrome.runtime.getURL("images/chill.jpeg"),
  chrome.runtime.getURL("images/chill.jpeg"),
  chrome.runtime.getURL("images/chill.jpeg"),
  chrome.runtime.getURL("images/chill.jpeg"),
];

function replaceImages() {
  const imgs = document.getElementsByTagName("img");

  for (let image of imgs) {
    const index = Math.floor(Math.random() * images.length);
    image.src = images[index];
  }
}

// Initial replacement
replaceImages();

// Handle dynamically loaded images
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      replaceImages();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
