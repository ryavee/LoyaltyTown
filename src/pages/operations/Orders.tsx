import { ShoppingCart } from "lucide-react";
import OperationsPage from "./OperationsPage";

export default function Orders() {
  return <OperationsPage type="orders" icon={ShoppingCart} />;
}
