import React, { useEffect, useState } from "react";
import axios from "axios";
import "./form.css";
const url = "http://localhost:3000/Tasks";
export default function Form() {
  const [task, setTask] = useState("");
  const [taskError, setTaskError] = useState(false);
  const [showTask, setShowTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [id, setID] = useState();
  const updateTask = (e) => {
    setTask(e.target.value);
  };
  const data = {
    task: task,
    completed: false,
  };
  const postTask = (e) => {
    if (task.length < 5) {
      setTaskError(true);
    } else {
      e.preventDefault();
      axios.post(url, data).then((res) => console.log(res.data));
      setTaskError(false)
      // window.location.reload();
    }
  };

  //  const arrdrop = axios.get(`${url}/1`).then((response) => setShowTask(response.data.task))
  const handleTask = () => {
    axios.get(url).then((res) => {
      setAllTask(res.data);
    });
  };
  // const updateData = (e)=> {

  // }

  useEffect(() => {
    handleTask();
  }, [postTask]);

  return (
    <div >
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Enter Task
        </label>

        <input type="text" class="form-control" onChange={updateTask} />
      </div>
      {taskError ? (
        <p style={{ color: "purple" }}>*Task length Atleast 5</p>
      ) : null}{" "}
      <br></br>
      <button type="submit" class="btn btn-primary" onClick={postTask}>
        Add Task
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Task</th>
            <th scope="col">Completed</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allTask.map((items) => {
            return (
              <tr>
                <td>{items.id}</td>
                <td>{items.task}</td>
                <td>{items.completed ? "Completed" : "Pending"}</td>
                <td>
                  <button
                    type="submit"
                    class="btn btn-success"
                    onClick={() => {
                      axios
                        .patch(`${url}/${items.id}`, { completed: true })
                        .then((response) => console.log(response.data));
                      // window.location.reload();
                    }}
                  >
                    Done
                  </button>

                  <button
                    type="submit"
                    class="btn btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      axios
                        .patch(`${url}/${items.id}`, { completed: false })
                        .then((response) => console.log(response.data));
                    }}
                  >
                    Undone
                  </button>
                </td>
                <td>
                  <button
                    type="submit"
                    class="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      axios
                        .delete(`${url}/${items.id}`)
                        .then((response) => console.log("deleted"));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
