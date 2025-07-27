
export interface AddAddressResponse {
  message: string;
}
export interface Address {
  country: string;
  city: string;
  street: string;
  zip: string;
}
export interface DeliveryAddressFormProps {
  messageType: "" | "success" | "error";
  setMessageType: React.Dispatch<React.SetStateAction<"" | "success" | "error">>;
}