import DropArea from "../drop-area/DropArea";

const TaskCard = ({ task, setActiveTask, onDrop, title: category }) => {
  return (
    <>
      <DropArea onDrop={() => onDrop(category, 0)} />
      {task.map((task, index) => (
        <>
          <div
            key={task._id}
            className="p-4 bg-base-200 rounded-lg my-2 cursor-grab active:opacity-50 active:bg-base-300"
            draggable
            onDragStart={() => setActiveTask(index)}
            onDragEnd={() => setActiveTask(null)} // reset active task
          >
            <h4 className="font-semibold text-lg">{task.title}</h4>
            <p className="text-base-content-secondary">{task.description}</p>
          </div>
          <DropArea onDrop={() => onDrop(category, index + 1)} />
        </>
      ))}
    </>
  );
};

export default TaskCard;
