const section = document.querySelector("section");
const videos = [
  { name: "crystal" },
  { name: "elf" },
  { name: "frog" },
  { name: "monster" },
  { name: "pig" },
  { name: "rabbit" },
];

let db;

function init() {
  for (const video of videos) {
    const objectStore = db.transaction("videos_os").objectStore("videos_os");
    const request = objectStore.get(video.name);
    request.addEventListener("success", () => {
      if (request.result) {
        console.log("taking videos from IDB");
        displayVideo(
          request.result.mp4,
          request.result.webm,
          request.result.name
        );
      } else {
        fetchVideoFromNetwork(video);
      }
    });
  }
}
function fetchVideoFromNetwork(video) {
  console.log("fetching videos from network");
  const mp4Blob = fetch(`videos/${video.name}.mp4`).then((response) =>
    response.blob()
  );
  const webmBlob = fetch(`videos/${video.name}.webm`).then((response) =>
    response.blob()
  );

  Promise.all([mp4Blob, webmBlob]).then((values) => {
    displayVideo(values[0], values[1], video.name);
    storeVideo(values[0], values[1], video.name);
  });
}

function storeVideo(mp4Blob, webmBlob, name) {
  const objectStore = db
    .transaction([videos_os], "readwrite")
    .objectStore("viseos_os");
  const record = {
    mp4: mp4Blob,
    webm: webmBlob,
    name: name,
  };

  const request = objectStore.add(record);

  request.addEventListener("success", () =>
    console.log("Record addition attempt finished")
  );
  request.addEventListener("error", () => console.error(request.error));
}

function displayVideo(mp4Blob, webmBlob, title) {
  const mp4URL = URL.createObjectURL(mp4Blob);
  const webmURL = URL.createObjectURL(webmBlob);

  const article = document.createElement("article");
  const h2 = document.createElement("h2");
  h2.textContent = title;
  const video = document.createElement("video");
  video.controls = true;
  const source1 = document.createElement("source");
  source1.src = mp4URL;
  source1.type = "video/mp4";
  const source2 = document.createElement("source");
  source2.src = webmURL;
  source2.type = "video/webm";

  section.appendChild(article);
  article.appendChild(h2);
  article.appendChild(video);
  video.appendChild(source1);
  video.appendChild(source2);
}

const request = window.indexedDB.open("videos_db", 1);
request.addEventListener("error", () =>
  console.error("Database failed to open")
);
request.addEventListener("success", () => {
  console.log("Database opened succesfully");
  db = request.result;
  init();
});
request.addEventListener("upgradeneeded", (e) => {
  const db = e.target.result;

  const objectStore = db.createObjectStore("videos_os", { keyPath: "name" });

  objectStore.createIndex("mp4", "mp4", { unique: false });
  objectStore.createIndex("webm", "webm", { unique: false });
  console.log("Database setup complete");
});
