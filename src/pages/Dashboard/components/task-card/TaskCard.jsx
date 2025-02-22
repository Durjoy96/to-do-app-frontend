import { Edit, Trash } from "lucide-react";
import DropArea from "../drop-area/DropArea";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const TaskCard = ({
  task,
  setActiveTask,
  onDrop,
  title: category,
  updateTask,
  deleteTask,
}) => {
  const { updateTaskId, setUpdateTaskId } = useContext(AuthContext);

  const formHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const updatedInfo = {
      title,
      category,
      description,
    };
    console.log("form", updateTaskId);
    updateTask(updateTaskId, updatedInfo);
    e.target.reset();
    document.getElementById("my_modal_6").close();
  };

  return (
    <>
      <DropArea onDrop={() => onDrop(category, 0)} />
      {task.map((task, index) => (
        <div key={task._id}>
          <div
            className="p-4 bg-base-200 rounded-lg my-2 cursor-grab active:opacity-50 active:bg-base-300"
            draggable
            onDragStart={() => setActiveTask(index)}
            onDragEnd={() => setActiveTask(null)} // reset active task
          >
            <h4 className="font-semibold text-lg">{task.title}</h4>
            <p className="text-base-content-secondary">{task.description}</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setUpdateTaskId(() => task._id);
                  document.getElementById("my_modal_6").showModal();
                }}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
          <DropArea onDrop={() => onDrop(category, index + 1)} />
        </div>
      ))}

      {/* modal */}
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-base-content">Add a Task</h3>
          <p className="text-sm text-base-content-secondary">
            Add a task to your to-do list. You can add a description, due date,
            and priority level.
          </p>
          <form onSubmit={(e) => formHandler(e)} className="mt-8">
            <div>
              <label className="fieldset-label text-base-content">
                Title *
              </label>
              <input
                type="input"
                className="input validator w-full"
                name="title"
                required
                placeholder="Task Name"
                minlength="3"
                maxlength="50"
                title="Must be 3 to 50 characters"
              />
              <p className="validator-hint">Must be 3 to 50 characters</p>
            </div>
            <div>
              <label className="fieldset-label text-base-content">
                Category *
              </label>
              <fieldset className="fieldset">
                <select className="select w-full" required name="category">
                  <option>To-Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </fieldset>
            </div>
            <div className="mt-4">
              <label className="fieldset-label text-base-content">
                Description (Optional)
              </label>
              <textarea
                className="textarea validator w-full mt-1"
                placeholder="Description"
                minlength="3"
                maxlength="200"
                name="description"
              ></textarea>
              <p className="validator-hint">Must be 3 to 200 characters</p>
            </div>
            <button className="btn w-full bg-green text-primary-content hover:opacity-80">
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TaskCard;
