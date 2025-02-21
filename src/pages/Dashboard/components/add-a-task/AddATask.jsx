import { CirclePlus } from "lucide-react";
import AxiosPublic from "../../../../hooks/Axios/AxiosPublic";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const AddATask = () => {
  const { user } = useContext(AuthContext);
  const Axios = AxiosPublic();
  const formHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const info = {
      title,
      category,
      description,
      createdAt: new Date().toISOString(),
      user_email: user.email,
    };
    Axios.post("/tasks", info) // Save task to the database
      .then((res) => {
        if (res.data.acknowledged) {
          e.target.reset();
          document.getElementById("my_modal_5").close();
          toast.success("Task added successfully");
        }
      });
  };
  return (
    <>
      <div>
        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn rounded-lg text-base-content hover:opacity-80 flex items-center gap-2"
        >
          <CirclePlus className="w-5 h-5" /> Add a Task{" "}
        </button>
        {/* modal */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-base-content">Add a Task</h3>
            <p className="text-sm text-base-content-secondary">
              Add a task to your to-do list. You can add a description, due
              date, and priority level.
            </p>
            <form onSubmit={formHandler} className="mt-8">
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
                  <select
                    defaultValue="To-Do"
                    className="select w-full"
                    required
                    name="category"
                  >
                    <option selected>To-Do</option>
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
      </div>
    </>
  );
};

export default AddATask;
