<template>
  <v-container fluid>
    <v-card>
      <v-toolbar dense flat>
        <v-toolbar-title>일기장</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="editMode = !editMode">
          <v-icon>{{ editMode ? "mdi-eye" : "mdi-pencil" }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field label="제목" v-model="form.title"></v-text-field>
        <editor v-if="editMode" v-model="form.content"></editor>
        <viewer v-else :value="form.content"></viewer>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="fileImport">fileImport</v-btn>
        <v-btn @click="fileExport">fileExport</v-btn>
        <v-btn @click="dbRead">dbRead</v-btn>
        <v-btn @click="dbWrite">dbWrite</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
const { dialog } = require("electron").remote;
const fs = require("fs");
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import { Editor, Viewer } from "@toast-ui/vue-editor";
const Datastore = require("nedb-promises");
let db = Datastore.create("/path/to/db.db");

export default {
  components: {
    Editor,
    Viewer
  },
  data() {
    return {
      form: {
        title: "",
        content: ""
      },
      editMode: true,
      options: {
        filters: [
          {
            name: "text and markdown",
            extensions: ["txt", "md"]
          }
        ]
      }
    };
  },
  methods: {
    fileImport() {
      const r = dialog.showOpenDialogSync(this.options);
      if (!r) return false;
      this.form.content = fs.readFileSync(r[0]).toString();
    },
    fileExport() {
      const r = dialog.showSaveDialogSync(this.options);
      if (!r) return false;
      fs.writeFileSync(r, this.form.content);
    },
    async dbRead() {
      const rs = await db.find();
      console.log(rs);
    },
    async dbWrite() {
      const r = await db.insert(this.form);
      console.log(r);
    }
  }
};
</script>

<style></style>
