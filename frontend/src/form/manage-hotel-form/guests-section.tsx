import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./manage-hotel-form";
const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register("adultCapacity", {
              required: "This field is required",
            })}
          />
          {errors.adultCapacity?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.adultCapacity?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={0}
            {...register("childCapacity", {
              required: "This field is required",
            })}
          />
          {errors.childCapacity?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.childCapacity?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
export default GuestsSection;
