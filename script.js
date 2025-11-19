function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function loadThumbnail() {
  const url = document.getElementById("videoUrl").value.trim();
  const videoId = extractVideoId(url);

  if (!videoId) {
    alert("Enter a valid YouTube video link.");
    return;
  }

  const imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const preview = document.getElementById("thumbnailImage");
  const container = document.getElementById("thumbnailContainer");

  preview.src = imgUrl;
  container.style.display = "block";
}

document.getElementById("fetchBtn").addEventListener("click", loadThumbnail);

document.querySelectorAll(".dl-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const format = btn.getAttribute("data-format");
    download(format);
  });
});

function download(format) {
  const imgSrc = document.getElementById("thumbnailImage").src;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imgSrc;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const link = document.createElement("a");
    link.download = `thumbnail.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };
}