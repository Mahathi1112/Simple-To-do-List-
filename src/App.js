/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import {
  ListIcon,
  DeleteIcon,
  Checkedcircle,
  UndoIcon,
  RadioIcon,
  AddIcon
} from "./Icons";
import "./index.css";

function App() {
  const [task, setTask] = useState("");
  const [clicked, setClicked] = useState(false);
  const [finalList, setTodoList] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    let todos = [
      ...finalList,
      {
        task: event.target.task.value,
        completed: false
      }
    ];
    setTodoList(todos);
    setTask("");
  }

  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleCheckboxChange(event) {
    event.completed = !event.completed;
    setClicked(!clicked);
  }

  function handleDelete(item) {
    let index = finalList.indexOf(item);
    finalList.splice(index, 1);
  }

  return (
    <React.Fragment>
      <Header />
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(229, 229, 229, 0.57)",
          borderRadius: "37px",
          height: "3.2em",
          marginLeft: "10%",
          marginRight: "10%",
          marginTop: "1.5em"
        }}
      >
        <form
          onSubmit={handleSubmit}
          css={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "5px",
            width: "100%"
          }}
        >
          <span
            css={{
              fontSize: "24px",
              color: "#7B20C4"
            }}
          >
            Create New Task
          </span>
          <input
            type="input"
            name="task"
            onChange={handleChange}
            value={task}
            css={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "37px",
              width: "60%",
              padding: "3px 20px",
              boxSizing: "border-box",
              fontSize: "18px",
              color: "#7B20C4",
              borderStyle: "none"
            }}
            placeholder="Enter your new task here..."
          />
          <AddIcon />
        </form>
      </div>
      <ProgressBar finalList={finalList} />
      <div
        css={{
          background: "rgba(229, 229, 229, 0.57)",
          borderRadius: "37px",
          width: "90%",
          minHeight: "30em",
          marginLeft: "5%",
          marginRight: "5%",
          marginTop: "1.5em",
          paddingTop: "1em",
          paddingbottom: "1em"
        }}
      >
        {finalList.length > 0 &&
          finalList.map((item, i) => (
            <div
              key={i}
              onClick={() => handleCheckboxChange(item)}
              css={{
                background: "#ffffff",
                minHeight: "3em",
                width: "90%",
                borderRadius: "10px",
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "1em",
                display: "grid",
                gridTemplateColumns: "5% 80% 5% 5%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {item.completed ? <Checkedcircle /> : <RadioIcon />}
              <span
                css={{
                  color: "#7B20C4",
                  fontSize: "24px",
                  textDecoration: item.completed ? "line-through" : ""
                }}
              >
                {item.task}
              </span>
              {item.completed ? <UndoIcon /> : <Checkedcircle />}
              <span onClick={() => handleDelete(item)}>
                <DeleteIcon />
              </span>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}

const Header = () => {
  return (
    <div
      css={{
        background:
          "linear-gradient(180deg, rgba(123, 32, 196, 0.33) 0%, rgba(255, 255, 255, 0.33) 100%)",
        fontWeight: "bold",
        fontSize: "35px",
        lineHeight: "53px",
        display: "flex",
        justifyContent: "center",
        color: "#ffffff",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}
    >
      To Do list
      <ListIcon />
    </div>
  );
};

const ProgressBar = finalList => {
  let completedListLength = finalList.finalList.filter(
    item => item.completed === true
  ).length;
  let innerWidth = (completedListLength / finalList.finalList.length) * 100;
  return (
    <div
      css={{
        background: "rgba(229, 229, 229, 0.57)",
        borderRadius: "37px",
        display: "flex",
        height: "3em",
        justifyContent: "center",
        alignItems: "center",
        margin: "2em",
        width: "80%",
        marginLeft: "10%",
        fontSize: "18px",
        color: "#7B20C4"
      }}
    >
      <span>Progress Tracker </span>
      <div css={{ width: "80%", height: "50%", padding: "0.5em" }}>
        <div
          css={{
            background: "#ffffff",
            width: "100%",
            height: "100%",
            borderRadius: "37px"
          }}
        >
          <div
            css={{
              background: "rgba(123, 32, 196, 0.33)",
              width: innerWidth ? `${innerWidth}%` : "0%",
              height: "100%",
              borderRadius: "37px"
            }}
          ></div>
        </div>
      </div>
      <span>
        {completedListLength}/{finalList.finalList.length}
      </span>
    </div>
  );
};

export default App;
