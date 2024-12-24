import { useMutation } from "react-query";
import * as apiClient from "../utils/api-clients";
import { toast } from "react-toastify";
import ManageHotelForm from "../form/manage-hotel-form/manage-hotel-form";
const AddHotel = () => {
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      toast.success("Hotel added successfully", { position: "top-right" });
    },
    onError: () => {
      toast.error("Error adding hotel", { position: "top-right" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};
export default AddHotel;
