export interface AddProductResponse {
  message: string;
}
export interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  owner: {
    _id: string;
    username: string;
  };
}

type ShoppingCartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export interface ShoppingCartCardProps {
  item: ShoppingCartItem;
}