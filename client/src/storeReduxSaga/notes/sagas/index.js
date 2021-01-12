import sagaWatchAddNote from "./sagaAddNote.js";
import sagaWatchDeleteNote from "./sagaDeleteNote.js";
import sagaWatchFetchNotes from "./sagaFetchNotes.js";
import sagaWatchEditNote from "./sagaEditNote.js";

const sagas = [
  sagaWatchAddNote(),
  sagaWatchDeleteNote(),
  sagaWatchFetchNotes(),
  sagaWatchEditNote(),
];

export default sagas;
