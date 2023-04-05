import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "../static/images/edit.png";
import DeleteIcon from "../static/images/delete.png";
import { editTodo, deleteTodo, toggleTodo } from "../reducers/todos";
import { isEmpty } from "lodash";
import {
  deleteConfirmationText,
  deleteQuestion,
  deleteText,
  cancelText,
  addTaskText,
  addSomeTaskText,
} from "../lang/index";

const EditTodo = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
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
          editTodo({
            ...todo,
            title,
          })
        );
      }
    }
  };

  return (
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
        {" "}
        Save
      </Button>
    </form>
  );
};

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTodo(todo.id));
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <li>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
        className="manageList"
      >
        <div className="displayContent">
          <FormControlLabel
            control={
              <Checkbox checked={todo.completed} onClick={handleToggle} />
            }
            label={
              <Typography
                variant="subtitle"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
            }
          />
          <div>
            <IconButton aria-label="edit" onClick={handleEdit}>
              <img src={EditIcon} alt="" width="16" />
            </IconButton>
            {!edit && (
              <IconButton aria-label="delete" onClick={handleDelete}>
                <img src={DeleteIcon} alt="" width="16" />
              </IconButton>
            )}
            <Dialog open={isDeleting} onClose={handleCancelDelete}>
              <DialogTitle>{deleteQuestion}</DialogTitle>
              <DialogContent>
                <Typography>{deleteConfirmationText}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete} color="primary">
                  {cancelText}
                </Button>
                <Button onClick={handleConfirmDelete} color="primary">
                  {deleteText}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        {edit && <EditTodo todo={todo} />}
      </motion.div>
    </li>
  );
};

export default Todo;
