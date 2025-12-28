import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    });
    console.log(parcels);

    const handleView = (parcel) => {
        console.log("View:", parcel);
    };

    const handlePay = (id) => {
        console.log("Pay:", id);
        navigate(`/dashboard/payment/${id}`)
    };

    // Parcel Delete confirmed==============================
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/parcels/${id}`);

            if (res.data?.deletedCount > 0) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Parcel has been deleted successfully.",
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to delete parcel. Please try again.",
                icon: "error",
            });
            console.error(error);
        }
    };


    return (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
            <table className="table table-zebra">
                {/* Table Head */}
                <thead className="bg-base-200">
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {parcels.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                No parcels found
                            </td>
                        </tr>
                    ) : (
                        parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>

                                {/* Parcel Type */}
                                <td>
                                    <span
                                        className={`badge badge-sm ${parcel.parcelType === "document"
                                            ? "badge-info"
                                            : "badge-warning"
                                            }`}
                                    >
                                        {parcel.parcelType}
                                    </span>
                                </td>

                                {/* Created At */}
                                <td>
                                    {new Date(parcel.createdAt).toLocaleDateString()}
                                </td>

                                {/* Cost */}
                                <td className="font-semibold">
                                    ৳ {parcel.cost}
                                </td>

                                {/* Payment Status */}
                                <td>
                                    <span
                                        className={`badge badge-sm ${parcel.payment_status === "paid"
                                            ? "badge-success"
                                            : "badge-error"
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="space-x-1">
                                    <button
                                        onClick={() => handleView(parcel)}
                                        className="btn btn-xs btn-outline btn-info"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => handlePay(parcel._id)}
                                        disabled={parcel.payment_status === "paid"}
                                        className="btn btn-xs btn-outline btn-success"
                                    >
                                        Pay
                                    </button>

                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-outline btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;