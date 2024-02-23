import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "Notes",
  initialState: {
    note: [],
    editingNote: [],
  },
  reducers: {
    initialNote: (state, actions) => {
      const newArr = [
        {
          id: actions.payload.id,
          title: actions.payload.title,
          body: actions.payload.body,
        },
      ];

      state.note = newArr;
    },

    addNote: (state, actions) => {
      state.note = [actions.payload, ...state.note];
    },

    deleteNote: (state, actions) => {
      state.note = state.note.filter(
        (noteD) => noteD.title != actions.payload.title
      );
    },

    copyNote: (state, actions) => {
      const textCopy = actions.payload.title + "\n" + actions.payload.body;
      navigator.clipboard.writeText(textCopy);
    },

    downloadNote: (state, actions) => {
      const textDownload = actions.payload.title + "\n" + actions.payload.body;
      const blob = new Blob([textDownload], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "file.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    },

    editNote: (state, actions) => {
      state.editingNote = [actions.payload];
      state.note = state.note.filter((noteD) => noteD.id != actions.payload.id);
    },
  },
});

export const noteAction = noteSlice.actions;
export default noteSlice;
