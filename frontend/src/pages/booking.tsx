import * as apiClient from "../utils/api-clients";
import { useMutation, useQuery } from "react-query";
import BookingForm from "../form/booking-form/booking-form";
import { useSearchContext } from "../context/search-context";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/booking-details-summary";
import { toast } from "react-toastify";
import { BookingType } from "../../../backend/src/models/search";
const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams<{ hotelId: string }>();
  const [noNights, setNoNights] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(
        (search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setNoNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]); //anytime the global values of checkIn and checkOut changes, we want to recalculate the number of nights

  const { data: hotelData, isLoading } = useQuery(
    ["fetchHotelById", hotelId],
    () => apiClient.fetchHotelById(hotelId as string),
    { enabled: !!hotelId }
  );
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  useEffect(() => {
    if (hotelData && noNights > 0) {
      const calculatedTotalCost = hotelData.pricePerNight * noNights;
      setTotalCost(calculatedTotalCost);
    }
  }, [hotelData, noNights]);

  const { mutate, isLoading: isMutationLoading } = useMutation(
    apiClient.bookHotelById,
    {
      onSuccess: () => {
        toast.success("Hotel booked successfully", { position: "top-right" });
      },
      onError: () => {
        toast.error("Error booking hotel", { position: "top-right" });
      },
    }
  );

  const handleSave = (bookingFormData: Omit<BookingType, "_id" | "userId">) => {
    // bookingFormData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    mutate(bookingFormData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!hotelData) {
    return <div>Hotel not found</div>;
  }
  if (!currentUser) {
    return <div>Please login to book</div>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCapacity={search.adults}
        childrenCapacity={search.child}
        noNights={noNights}
        totalCost={totalCost}
        hotel={hotelData}
      />
      <BookingForm
        isLoading={isMutationLoading}
        currentUser={currentUser}
        hotelId={hotelId as string}
        totalCost={totalCost}
        noNights={noNights}
        onSave={handleSave}
      />
    </div>
  );
};
export default Booking;
