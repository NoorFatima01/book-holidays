import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./details-section";
import TypeSection from "./type-section";
import FacilitiesSection from "./facilities-section";
import GuestsSection from "./guests-section";
import ImageSection from "./image-section";
import { HotelType } from "../../../../backend/src/models/hotel";
import { useEffect } from "react";
export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCapacity: number;
  childCapacity: number;
};

type ManageHotelFormProps = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotelData?: HotelType;
};

const ManageHotelForm = ({ onSave, isLoading,hotelData }: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  //we are not gonna destruct the formMethods object here

  const { handleSubmit,reset } = formMethods;

  useEffect (()=>{
    if(hotelData){
      reset(hotelData)
    }
  },[hotelData,reset])

  const onSubmit = handleSubmit((data: HotelFormData) => {
    const formData = new FormData();
    
    if (hotelData) {
      formData.append("_id", hotelData._id);
    }
    
    // Append basic hotel information
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCapacity", data.adultCapacity.toString());
    formData.append("childCapacity", data.childCapacity.toString());
    
    // Append facilities
    data.facilities.forEach((facility) => {
      formData.append("facilities", facility);
    });
  
    // Handle existing image URLs
    if (data.imageUrls && Array.isArray(data.imageUrls)) {
      formData.append("imageUrls", JSON.stringify(data.imageUrls));
    }
  
    // Append new image files
    if (data.imageFiles) {
      Array.from(data.imageFiles).forEach((imageFile) => {
        formData.append("imageFiles", imageFile);
      });
    }
  
    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImageSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
