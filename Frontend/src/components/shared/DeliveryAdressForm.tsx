import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import type { AddAddressResponse, Address, DeliveryAddressFormProps } from "../../types/address.type";
import { useAuthStore } from "../../zustand/authStore";

interface ExtendedProps extends DeliveryAddressFormProps {
  address: Address;
  setAddress: (addr: Address) => void;
}

function DeliveryAddressForm({ messageType, setMessageType, address, setAddress }: ExtendedProps) {
  const [message, setMessage] = useState("");
  const user = useAuthStore((state) => state.user);
  // Pobiera adres użytkownika, jeśli jest zalogowany przy starcie komponentu
  useEffect(() => {
    const fetchAddress = async () => {
      if (user) {
        try {
          const res = await axios.get("/address/get", { withCredentials: true });
          setAddress(res.data as Address);
          setMessageType("success");
          setMessage("Is it still your address?");
        } catch (err) {
          setMessageType("");
          console.log("Failed to fetch address");
        }
      }
    };
    fetchAddress();
  }, []);
  //obsługa zmiany danych w formularzu (div)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  // Obsługuje zapisanie adresu zalogowanego użytkownika
  const handleSaveAddress = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user) {
      try {
        const res = await axios.post<AddAddressResponse>("/address/add", address, { withCredentials: true });
        setMessage(res.data.message);
        setMessageType("success");
      } catch (err: any) {
        setMessage(err.response?.data?.message ?? "An unexpected error occurred");
        setMessageType("error");
      }
    } else {
      setMessageType("success");
    }
  };
  return (
    <div className="flex flex-col gap-4">
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
          value={address.country}
          className={(messageType === "success" ? "bg-green-200" : messageType === "error" ? "bg-red-500" : "bg-white") + " border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 "}
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
          value={address.city}
          className={(messageType === "success" ? "bg-green-200" : messageType === "error" ? "bg-red-500" : "bg-white") + " border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 "}
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
          value={address.street}
          className={(messageType === "success" ? "bg-green-200" : messageType === "error" ? "bg-red-500" : "bg-white") + " border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 "}
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
          value={address.zip}
          className={(messageType === "success" ? "bg-green-200" : messageType === "error" ? "bg-red-500" : "bg-white") + " border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900 "}
        />
      </div>
      <span className={(messageType === "success" ? "text-green-500" : messageType === "error" ? "text-red-500" : "") + " min-h-6"}>
        {message && <>{message}</>}
      </span>
      
        <>
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
              type="button"
              className="mt-2 px-6 py-2  text-white rounded-lg font-semibold bg-stone-900 hover:bg-stone-700 transition-colors shadow"
              onClick={handleSaveAddress}
            >
              Save
            </button>
          )}
        </>
      
    </div>
  );
}
export default DeliveryAddressForm;