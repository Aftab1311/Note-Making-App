import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import db from "../firebase";
import {
  addDoc,
  serverTimestamp,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid rgba(0,0,0,0.2)",
  boxShadow: 12,
  p: 4,
};

export default function Home() {
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [titleLen, setTitleLen] = React.useState(0);
  const [descLen, setDescLen] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [notes, setNotes] = React.useState([]);
  const notesCollectionRef = collection(db, "notes");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, desc);
    addDoc(notesCollectionRef, {
      title: title,
      createdAt: serverTimestamp(),
      description: desc,
    });
    setTitle("");
    setDesc("");
    setOpen(false);
  };

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    deleteDoc(noteDoc, id);
    console.log("Deleted Successfully!");
  };

  React.useEffect(() => {
    const getNotes = async () => {
      const notesCollection = await getDocs(notesCollectionRef);
      setNotes(
        notesCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getNotes();
  }, [notesCollectionRef]);

  return (
    <div>
      <div
        className="appTitle"
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "700",
          margin: "1rem",
        }}
      >
        <h4 style={{ textTransform: "uppercase" }}>Make notes and save them</h4>

        <div>
          <Button onClick={handleOpen}>
            <AddCircleIcon /> &nbsp;&nbsp; Add Note
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={style}
              noValidate={false}
            >
              <div>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  name="title"
                  placeholder="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleLen(e.target.value.length);
                  }}
                  fullWidth
                  margin="normal"
                />
                <br />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  required={titleLen !== 0 && titleLen < 10 ? true : false}
                  disabled={titleLen === 0 ? true : false}
                  rows={4}
                  name="desc"
                  placeholder="Description"
                  onChange={(e) => {
                    setDesc(e.target.value);
                    setDescLen(e.target.value.length);
                  }}
                  fullWidth
                  margin="normal"
                />
              </div>
              <br />
              <Button
                type="submit"
                fullWidth
                margin="normal"
                variant="contained"
                onClick={handleSubmit}
                disabled={titleLen >= 10 ? false : descLen === 0 ? true : false}
              >
                Submit
              </Button>
            </Box>
          </Modal>
        </div>
        <Box
          component="Paper"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {notes.map((note, index) => (
            <Card
              sx={{
                minWidth: 300,
                width: 600,
                margin: "10px",
                textAlign: "left",
                paddingLeft: "20px",
              }}
              key={index}
            >
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Typography variant="h5" component="div">
                      {note.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      {note.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <RouterLink to={`/update/${note.id}`} style={{ textDecoration: "none" }}>
                      <IconButton
                        aria-label="edit"
                        color="secondary"
                      >
                        <EditIcon />
                      </IconButton>
                    </RouterLink>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => {
                        deleteNote(note.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      </div>
    </div>
  );
}
