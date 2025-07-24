import { useState } from "react";
import axios from "../../lib/axios";
import type { AddAddressResponse } from "../../types/address.type";

function DeliveryAddressForm() {

    const [form, setForm] = useState({ country: "", city: "", street: "", zip: "" });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "">("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        const res = await axios.post<AddAddressResponse>("/address/add", form, {withCredentials: true});
        setMessage(res.data.message);
        setMessageType("success");
        } catch (err: any) {
        setMessage(err.response?.data?.message ?? "An unexpected error occurred");
        setMessageType("error");
        }
    };
    






  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="country" className="font-medium text-gray-700">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          placeholder="Enter your country"
          required
          onChange={handleChange}
          readOnly={messageType === "success"}
            disabled={messageType === "success"}
          value={form.country}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="font-medium text-gray-700">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Enter your city"
          required
            onChange={handleChange}
            readOnly={messageType === "success"}
            disabled={messageType === "success"}
            value={form.city}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="street" className="font-medium text-gray-700">Address:</label>
        <input
          type="text"
          id="street"
          name="street"
          placeholder="Enter your street and number"
          required
            onChange={handleChange}
            readOnly={messageType === "success"}
            disabled={messageType === "success"}
            value={form.street}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="zip" className="font-medium text-gray-700">Zip Code:</label>
        <input
          type="text"
          id="zip"
          name="zip"
          placeholder="Enter your zip code"
          required
            onChange={handleChange}
            readOnly={messageType === "success"}
            disabled={messageType === "success"}
            value={form.zip}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
        />
      </div>
      <span className={messageType === "success" ? "text-green-500" : messageType === "error" ? "text-red-500" : ""}>
        {message && <>{message}</>}
      </span>
      {(messageType === "success") ? (
        <button
          type="button"
          className="mt-2 px-6 py-2  text-white rounded-lg font-semibold bg-stone-900 hover:bg-stone-700 transition-colors shadow"
          onClick={e => { e.preventDefault(); setMessage(""); setMessageType(""); }}
        >
          Edit
        </button>
      ) : (
        <button
          type="submit"
          className="mt-2 px-6 py-2  text-white rounded-lg font-semibold bg-stone-900 hover:bg-stone-700 transition-colors shadow"
        >
          Save
        </button>
      )}
    </form>
  );
}
export default DeliveryAddressForm;