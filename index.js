/*if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.getElementById("theme").innerHTML =
    '<link id="theme" rel="stylesheet" href="sakura-vader.css" type="text/css">';
}*/
const PREFIX = "Status: ";
const ARTIST_LENGTH = 20;
const SONG_LENGTH = 20;
let lany = "https://api.lanyard.rest/v1/users/629518456126963716";
$(function stat() {
  $.getJSON(lany, (data) => {
    data = data.data;
    console.log(data);
    track = "https://open.spotify.com/track/" + data.spotify?.track_id;
    if (data.listening_to_spotify == true) {
      artist = String(data.spotify.artist)
        .split("; ")[0]
        .substring(0, ARTIST_LENGTH);
      if (
        artist.length == ARTIST_LENGTH &&
        data.spotify.artist.length != ARTIST_LENGTH
      ) {
        artist += "...";
      }
      song = String(data.spotify.song)
        .split(" (f")[0]
        .substring(0, SONG_LENGTH);
      if (
        song.length == SONG_LENGTH &&
        data.spotify.song.length != SONG_LENGTH
      ) {
        song += "...";
      }

      str = String(
        `${PREFIX}Listening to <b><a href="${track}" target="_blank">${song}</a></b> by <strong>${artist}</strong>`
      );
      $("#status").html(`${str}`);

      return;
    }
    if (data.discord_status == "online") {
      $("#status").html(`${PREFIX}Online`);
    } else if (data.discord_status == "idle" || data.discord_status == "dnd") {
      $("#status").html(`${PREFIX}Idle`);
    } else (data.discord_status == "Offline") {
      $("#status").html(`${PREFIX}Offline`);
    }
  });
});
