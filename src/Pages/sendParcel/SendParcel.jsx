import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SendParcel = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const warehouses = useLoaderData();

    const parcelType = watch("parcelType");

    const [senderLocation, setSenderLocation] = useState(null);
    const [receiverLocation, setReceiverLocation] = useState(null);

    /* ================= COST CALC ================= */
    const calculateCost = (data) => {
        const weight = Number(data.weight || 0);
        const sameRegion =
            senderLocation?.region === receiverLocation?.region;

        if (data.parcelType === "document") {
            return sameRegion ? 60 : 80;
        }

        if (data.parcelType === "non-document") {
            if (weight <= 3) return sameRegion ? 110 : 150;
            const extra = Math.ceil(weight - 3) * 40;
            return sameRegion ? 110 + extra : 150 + extra + 40;
        }
        return 0;
    };

    /* ================= SUBMIT ================= */
    const onSubmit = (data) => {
        const cost = calculateCost(data);

        toast((t) => (
            <div className="space-y-3">
                <p className="text-lg font-semibold">
                    Delivery Cost:
                    <span className="ml-2 text-green-600">৳{cost}</span>
                </p>
                <button
                    onClick={() => confirmOrder(data, cost, t.id)}
                    className="w-full rounded-md bg-green-600 py-2 text-white"
                >
                    Confirm Delivery
                </button>
            </div>
        ));
    };

    /* ================= CONFIRM ================= */
    const confirmOrder = async (data, cost, toastId) => {
        const payload = {
            parcelType: data.parcelType,
            parcelName: data.parcelName,
            weight: Number(data.weight || 0),

            sender: {
                name: data.senderName,
                contact: data.senderContact,
                region: senderLocation.region,
                center: data.senderCenter,
                address: data.senderAddress,
                instruction: data.pickupInstruction,
            },

            receiver: {
                name: data.receiverName,
                contact: data.receiverContact,
                region: receiverLocation.region,
                center: data.receiverCenter,
                address: data.receiverAddress,
                instruction: data.deliveryInstruction,
            },

            cost,
            trackingId: `FC-${Date.now()}`,
            payment_status: "unpaid",
            delivery_status: "not_collected",

            createdBy: user?.email,
            createdAt: new Date(),
            createdAtISO: new Date().toISOString(),
        };
        console.log(payload);
        await axiosSecure.post("/parcels", payload)
            .then(res => {
                console.log(res.data);
            })

        toast.dismiss(toastId);
        toast.success("Parcel created successfully 🚚");

        reset();
        setSenderLocation(null);
        setReceiverLocation(null);
    };

    const input =
        "w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500";

    return (
        <>
            <Toaster position="top-center" />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto max-w-6xl space-y-8 rounded-xl bg-white p-8 shadow"
            >
                {/* ================= PARCEL DETAILS ================= */}
                <section className="border rounded-lg p-6 space-y-6">
                    <h1 className="text-xl font-bold">
                        Enter your parcel details
                    </h1>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="document"
                                {...register("parcelType", { required: true })}
                                className="accent-indigo-600"
                            />
                            Document
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="non-document"
                                {...register("parcelType", { required: true })}
                                className="accent-indigo-600"
                            />
                            Non-Document
                        </label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            {...register("parcelName", { required: true })}
                            className={input}
                            placeholder="Parcel Name *"
                        />

                        <input
                            type="number"
                            step="0.1"
                            {...register("weight")}
                            disabled={parcelType === "document"}
                            className={`${input} ${parcelType === "document"
                                ? "bg-gray-100 cursor-not-allowed"
                                : ""
                                }`}
                            placeholder="Weight (kg)"
                        />
                    </div>
                </section>

                {/* ================= SENDER & RECEIVER ================= */}
                <section className="grid lg:grid-cols-2 gap-6">
                    {/* -------- SENDER -------- */}
                    <div className="border rounded-lg p-5">
                        <h3 className="mb-4 text-lg font-semibold">👤 Sender Info</h3>

                        <div className="grid gap-4">
                            <input
                                defaultValue={user?.displayName}
                                {...register("senderName", { required: true })}
                                className={input}
                                placeholder="Sender Name *"
                            />

                            <input
                                {...register("senderContact", { required: true })}
                                className={input}
                                placeholder="Contact *"
                            />

                            <select
                                onChange={(e) =>
                                    setSenderLocation(JSON.parse(e.target.value))
                                }
                                className={input}
                                required
                            >
                                <option value="">Select Region *</option>
                                {warehouses.map((w, i) => (
                                    <option
                                        key={i}
                                        value={JSON.stringify({
                                            region: w.district,
                                            centers: w.covered_area,
                                        })}
                                    >
                                        {w.district}
                                    </option>
                                ))}
                            </select>

                            <select
                                {...register("senderCenter", { required: true })}
                                disabled={!senderLocation}
                                className={input}
                            >
                                <option value="">Select Service Center *</option>
                                {senderLocation?.centers.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>

                            <textarea
                                {...register("senderAddress", { required: true })}
                                className={input}
                                placeholder="Pickup Address *"
                            />

                            <textarea
                                {...register("pickupInstruction")}
                                className={input}
                                placeholder="Pickup Instruction"
                            />
                        </div>
                    </div>

                    {/* -------- RECEIVER -------- */}
                    <div className="border rounded-lg p-5">
                        <h3 className="mb-4 text-lg font-semibold">📍 Receiver Info</h3>

                        <div className="grid gap-4">
                            <input
                                {...register("receiverName", { required: true })}
                                className={input}
                                placeholder="Receiver Name *"
                            />

                            <input
                                {...register("receiverContact", { required: true })}
                                className={input}
                                placeholder="Contact *"
                            />

                            <select
                                onChange={(e) =>
                                    setReceiverLocation(JSON.parse(e.target.value))
                                }
                                className={input}
                                required
                            >
                                <option value="">Select Region *</option>
                                {warehouses.map((w, i) => (
                                    <option
                                        key={i}
                                        value={JSON.stringify({
                                            region: w.district,
                                            centers: w.covered_area,
                                        })}
                                    >
                                        {w.district}
                                    </option>
                                ))}
                            </select>

                            <select
                                {...register("receiverCenter", { required: true })}
                                disabled={!receiverLocation}
                                className={input}
                            >
                                <option value="">Select Service Center *</option>
                                {receiverLocation?.centers.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>

                            <textarea
                                {...register("receiverAddress", { required: true })}
                                className={input}
                                placeholder="Delivery Address *"
                            />

                            <textarea
                                {...register("deliveryInstruction")}
                                className={input}
                                placeholder="Delivery Instruction"
                            />
                        </div>
                    </div>
                </section>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 py-3 text-lg font-semibold text-white"
                >
                    Submit Parcel
                </button>
            </form>
        </>
    );
};

export default SendParcel;
