import Head from "next/head";
import { useI18n } from "../utils/i18n/context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../utils/CartContext";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { orderAPI } from "../utils/api";

export default function Checkout() {
  const { language } = useI18n();
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await orderAPI.create({
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        customerDetails: formData,
      });

      const { orderId, razorpayOrderId, amount, key } = res.data;
      if (!key) throw new Error("Razorpay key missing");

      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const rzp = new window.Razorpay({
        key,
        amount: Math.round(amount * 100),
        currency: "INR",
        order_id: razorpayOrderId,
        name: "ARS Electronics World",
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response) => {
          try {
            await orderAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });
            alert("✓ Order placed successfully!");
            clearCart();
            router.push("/");
          } catch {
            alert("Payment verification failed");
          } finally {
            setLoading(false);
          }
        },
        theme: { color: "#FBBF24" },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Error placing order");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Checkout - ARS Electronics World</title>
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">🛒 Checkout</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-6">Your cart is empty</h2>
            <Link href="/products" className="text-blue-600 underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* ADDRESS FORM */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

              {["name", "email", "phone", "address"].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.toUpperCase()}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full border p-2 mb-3 rounded"
                />
              ))}
            </div>

            {/* PLACE ORDER */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold"
            >
              {loading ? "⏳ Processing..." : "✓ Place Order"}
            </button>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
