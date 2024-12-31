import { useQuery } from "react-query";
import * as apiClient from "../utils/api-clients";
import { toast } from "react-toastify";
import { BookingType } from "../../../backend/src/models/search";
import MyBookingDetails from "../components/my-booking-details";

const MyBookings = () => {
  const {
    data: bookingData,
    isLoading,
    isError,
  } = useQuery<BookingType[]>("fetchBookings", apiClient.getMyBookings, {
    onError: (error) => {
      toast.error("Error fetching bookings", { position: "top-right" });
      console.error("Error fetching bookings:", error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !bookingData || bookingData.length === 0) {
    return <p className="text-center text-gray-600">No Bookings Found</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">My Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookingData.map((booking) => (
          <MyBookingDetails key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
