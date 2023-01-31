const videosContainer = document.getElementById("videosContainer");
const notFound = document.getElementById("not-found");
const inputErrorMsg = document.getElementById("input-error-msg");
const videoCount = document.getElementById("video-count");
const videoIdInput = document.getElementById("videoId");
const modal = document.getElementById("modal");
const videoElement = document.querySelector("#modal > iframe");
let youtubeVideoIds = [];
const VID_IDS_KEY = "youtubeVideoIds";

const loadVideos = () => {
  youtubeVideoIds = JSON.parse(localStorage.getItem(VID_IDS_KEY)) || [];
};

const displayVideos = () => {
  if(!youtubeVideoIds.length) {
    notFound.innerHTML = "No videos"
  };
  const videoHtmlString = youtubeVideoIds
    .map(
      (id) => `
        <li onclick="clickVideo(event, '${id}')" class="videos__item">
            <img src="https://i3.ytimg.com/vi/${id}/maxresdefault.jpg" alt="Thumbnail image for Youtube video with id ${id}" class="thumbnail">
            <button class="delete-btn">&times;</button>
        </li>
    `
    )
    .join("");
  videosContainer.innerHTML = videoHtmlString;
  videoCount.innerHTML = youtubeVideoIds.length;
};

const clickVideo = (event, id) => {
  if (event.target.classList.contains("delete-btn")) {
    youtubeVideoIds = youtubeVideoIds.filter((i) => i != id);
    localStorage.setItem(VID_IDS_KEY, JSON.stringify(youtubeVideoIds));
    displayVideos();
  } else {
    videoElement.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    modal.classList.add("open");
    modal.classList.remove("closed");
  }
};

const handleModalClick = () => {
  modal.classList.add("closed");
  videoElement.src = ""
  modal.classList.remove("open");
};

const saveVideo = (event) => {
  event.preventDefault();
  if(videoIdInput.value == "") {
    videoIdInput.classList.add('form__input--error')
    setTimeout(function() {
      videoIdInput.classList.remove('form__input--error')
    }, 500)
    return false
  }
  const videoId = videoIdInput.value.split("v=")[1].substring(0, 11);
  if(youtubeVideoIds.includes(videoId)) {
    videoIdInput.classList.add('form__input--error')
    inputErrorMsg.innerHTML = "Video is already added"
  } else {
    inputErrorMsg.innerHTML = ""
    youtubeVideoIds.unshift(videoId);
    videoIdInput.value = "";
    notFound.innerHTML = ""
    localStorage.setItem(VID_IDS_KEY, JSON.stringify(youtubeVideoIds));
    displayVideos();
  }
};

loadVideos();
displayVideos();