import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTodo } from "../reducers/todos";
import { isEmpty } from "lodash";
import { addButtonText, addTaskText, addSomeTaskText } from "../lang/index";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [isError, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(title)) {
      setError(true);
    } else {
      setError(false);
      if (title.trim()) {
        dispatch(
          addTodo({
            title,
            completed: false,
          })
        );
        setTitle("");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-error"
          label={isError ? addSomeTaskText : addTaskText}
          error={isError}
          className="inputText"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" className="submitButton" type="submit">
          {addButtonText}
        </Button>
      </form>
    </>
  );
};

export default AddTodo;
