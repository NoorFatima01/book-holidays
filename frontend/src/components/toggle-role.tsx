import { useAppContext } from "../context/app-context";

const ToggleRole = () => {
  const { role, updateRole } = useAppContext();

  return (
    <div>
      <>
        {role === 1 ? (
          <button
            onClick={() => {
              updateRole(0);
            }}
            className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
          >
            Change to Hotel Manager
          </button>
        ) : (
          <button
            onClick={() => {
              updateRole(1);
            }}
            className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
          >
            Change to Customer
          </button>
        )}
      </>
    </div>
  );
};

export default ToggleRole;
