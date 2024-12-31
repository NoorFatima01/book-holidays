import { BookingType } from "../../../backend/src/models/search";

type MyBookingDetailsProps = {
  booking: BookingType;
};

const MyBookingDetails = ({ booking }: MyBookingDetailsProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-8">
        <h2 className="text-xl font-bold text-gray-800">
          {booking.firstName} {booking.lastName}
        </h2>
        <p className="text-sm text-gray-600">{booking.email}</p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Check-In:</span>{" "}
            {new Date(booking.checkIn).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Check-Out:</span>{" "}
            {new Date(booking.checkOut).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Adults:</span>{" "}
            {booking.adultCapacity}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Children:</span>{" "}
            {booking.childCapacity}
          </p>
          <p className="text-sm text-gray-600 col-span-2">
            <span className="font-semibold">Total Cost:</span> $
            {booking.totalCost}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyBookingDetails;
