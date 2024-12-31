import { UserType } from "../../../../backend/src/models/user";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../context/search-context";
import { BookingType } from "../../../../backend/src/models/search";
type BookingFormProps = {
  currentUser: UserType;
  hotelId: string;
  onSave: (bookingFormData: Omit<BookingType, "_id" | "userId">) => void;
  noNights: number;
  totalCost: number;
  isLoading: boolean;
};
type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};
const BookingForm = ({
  currentUser,
  hotelId,
  onSave,
  noNights,
  totalCost,
  isLoading,
}: BookingFormProps) => {
  const search = useSearchContext();
  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });
  const onSubmit = handleSubmit((data: BookingFormData) => {
    const bookingData = {
      hotelId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      adultCapacity: search.adults,
      childCapacity: search.child,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      noNights,
      totalCost,
    };

    console.log("Booking data to save:", bookingData);

    onSave(bookingData); // Pass the plain object instead of FormData
  });

  return (
    <form
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
      onSubmit={onSubmit}
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-s font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            // disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-s font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            // disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-s font-bold">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            // disabled
            {...register("email")}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white h-1/2 self-center font-bold text-xl hover:bg-blue-500"
        >
          {isLoading ? "Loading...." : "Confirm"}
        </button>
      </div>
    </form>
  );
};
export default BookingForm;
