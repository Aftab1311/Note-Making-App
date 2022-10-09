import React from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import db from "../firebase";
import {
  addDoc,
  serverTimestamp,
  collection,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Grid } from "@mui/material";

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

export default function Update() {
  var { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [titleLen, setTitleLen] = React.useState(0);
  const [descLen, setDescLen] = React.useState(0);

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
  };

  const updateNotes = async (id) => {
    const newNote = doc(db, "notes", id);
    const newFields = { title: title, description: desc };
    updateDoc(newNote, newFields);
    console.log("Updated Successfully!");
    navigate("/");
  };

  React.useEffect(() => {
    const docRef = doc(db, "notes", id);
    getDoc(docRef)
      .then((doc) => {
        setTitle(doc.data().title);
        setDesc(doc.data().description);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);

  return (
    <div>
      <Box
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
            value={title}
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
            value={desc}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              margin="normal"
              variant="contained"
              onClick={() => {
                updateNotes(id);
              }}
              disabled={titleLen >= 10 ? false : descLen === 0 ? true : false}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={6}>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Button
                type="submit"
                fullWidth
                color="error"
                margin="normal"
                variant="contained"
              >
                Cancel
              </Button>
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
