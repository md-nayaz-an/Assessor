function formattedSeconds (elapsed_seconds) {
// calculations
    const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
    const ms = elapsed_milliseconds % 1000;
    const min = Math.floor(elapsed_milliseconds / 60000);
    const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);

    const formattedCurrentTime =
    min.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0") +
    ":" +
    ms.toString().padStart(3, "0");

    return formattedCurrentTime;
}

export default formattedSeconds;