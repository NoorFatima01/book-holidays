import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./manage-hotel-form";
const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              if (imageFiles.length === 0) {
                return "At least one image should be added";
              } else if (imageFiles.length > 6) {
                return "Maximum 6 images are allowed";
              } else {
                return true;
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};
export default ImageSection;
