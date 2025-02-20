import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router";
import { ListTodo, Pickaxe, SquareCheckBig } from "lucide-react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <section className="max-w-screen-xl mx-auto px-5 min-h-screen">
          <div className="flex items-center gap-6 justify-end py-5">
            <h1 className="text-base-content">
              Welcome, <span className="font-semibold">{user.displayName}</span>
            </h1>
            <button className="px-5 py-1 bg-rose-600 text-white rounded-lg font-medium cursor-pointer hover:opacity-80">
              Log Out
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div>
              <h3 className="text-lg font-medium text-base-content-secondary flex items-center gap-2">
                <ListTodo /> To Do
              </h3>
              <div className="bg-base-100 min-h-96 shadow-sm rounded-lg p-6 mt-2"></div>
            </div>
            {/* in progress */}
            <div>
              <h3 className="text-lg font-medium text-base-content-secondary flex items-center gap-2">
                <Pickaxe /> In Progress
              </h3>
              <div className="bg-base-100 min-h-96 shadow-sm rounded-lg p-6 mt-2"></div>
            </div>
            {/* done */}
            <div>
              <h3 className="text-lg font-medium text-base-content-secondary flex items-center gap-2">
                <SquareCheckBig /> Done
              </h3>
              <div className="bg-base-100 min-h-96 shadow-sm rounded-lg p-6 mt-2"></div>
            </div>
          </div>
        </section>
      ) : (
        <h1>
          Please <Link to="/">sign in</Link>
        </h1>
      )}
    </>
  );
}
