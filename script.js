const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURl = "https://api.lyrics.ovh";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const songtxt = search.value.trim(); //.trim() ลบช่องว่างซ้าย-ขวา

  if (!songtxt) {
    alert("ป้อนข้อมูลไม่ถูกต้อง");
  } else {
    searchLyrics(songtxt); //ส่ง
  }
});

async function searchLyrics(song) {
  const res = await fetch(`${apiURl}/suggest/${song}`);
  const allSongs = await res.json();
  showData(allSongs);
}

function showData(songs) {
  result.innerHTML = `
    <ul class="songs">
            ${songs.data
              .map(
                (song) =>
                  `<li>
                <span>
                    <strong>${song.artist.name}</strong> - ${song.title}
                </span>
                <button class="btn"
                 data-artist="${song.artist.name}"
                 data-song="${song.title}"
                >เนื้อเพลง</button>
                </li>`
              )
              .join("")}
        </ul>
        `;
  if (songs.next || songs.prev) {
    more.innerHTML = `
          ${
            songs.prev
              ? `<button class="btn" onclick="getMoreSongs('${songs.prev}')" >ก่อนหน้า</button>`
              : ""
          }
          ${
            songs.next
              ? `<button class="btn" onclick="getMoreSongs('${songs.next}')" >ถัดไป</button>`
              : ""
          }
              `;
  } else {
    more.innerHTML = "";
  }
}

async function getMoreSongs(songsUrl) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${songsUrl}`);
  const allSongs = await res.json();
  showData(allSongs);
}

result.addEventListener("click", (e) => {
  const clickEl = e.target;

  if (clickEl.tagName == "BUTTON") {
    const artist = clickEl.getAttribute("data-artist");
    const songName =clickEl.getAttribute("data-song");
    
    getLyrics(artist,songName);
  }
});

async function getLyrics(artist,songName) {
  const res = await fetch(`${apiURl}/v1/${artist}/${songName}`);
  if (res.ok) {
  const data = await res.json();
  lo
  if(data.lyrics){
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,"<br>");
    result.innerHTML = `<h2><span>
      <strong>${artist}</strong> - ${songName}
      </span></h2>
      <span>${lyrics}</span>
      `;
  } else {
    result.innerHTML = `<h2><span>
      <strong>${artist}</strong> - ${songName}
      </span></h2>
      <span>ไม่มีข้อมูลเนื้อเพลงนี้</span>
      `;
  }
} else {
    result.innerHTML = `<h2><span>
      <strong>${artist}</strong> - ${songName}
      </span></h2>
      <span>ไม่มีข้อมูลเนื้อเพลงนี้</span>
      `;
}

} 