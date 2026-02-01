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
  const { t, language } = useI18n();
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + tax + shipping;

  /* =========================
     PLACE ORDER
  ========================= */
  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      /* -------------------------
         STEP 1: CREATE ORDER
      ------------------------- */
      const createRes = await orderAPI.create({
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        customerDetails: formData,
      });

      const { orderId, razorpayOrderId, amount, key } = createRes.data;

      if (!key) throw new Error("Razorpay key missing");

      /* -------------------------
         STEP 2: LOAD RAZORPAY
      ------------------------- */
      await new Promise((resolve, reject) => {
        if (window.Razorpay) return resolve();

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      /* -------------------------
         STEP 3: OPEN PAYMENT
      ------------------------- */
      const rzp = new window.Razorpay({
        key,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: "ARS Electronics World",
        description: "Electronics Purchase",
        order_id: razorpayOrderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#FBBF24" },

        handler: async (response) => {
          try {
            await orderAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });

            alert("✓ Payment successful! Order confirmed.");
            clearCart();
            router.push("/");
          } catch (err) {
            alert("Payment verification failed.");
          } finally {
            setLoading(false);
          }
        },
      });

      rzp.on("payment.failed", (res) => {
        alert(res.error.description || "Payment failed");
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Error placing order. Please try again.");
      setLoading(false);
    }
  };

  /* =========================
     EMPTY CART
  ========================= */
  if (cart.length === 0 && !loading) {
    return (
      <>
        <Head>
          <title>Checkout - ARS Electronics World</title>
        </Head>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-6">Your cart is empty</h1>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - ARS Electronics World</title>
      </Head>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">🛒 Checkout</h1>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-bold"
        >
          {loading ? "⏳ Processing..." : "✓ Place Order"}
        </button>
      </main>

      <Footer />
    </>
  );
}
