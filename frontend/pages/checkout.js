import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../utils/CartContext";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { orderAPI, settingsAPI } from "../utils/api";

export default function Checkout() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    gstPercentage: 18,
    shippingCharge: 200,
    freeShippingThreshold: 5000,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.get();
        const data = response.data || response;
        const settingsData = data?.data || data;
        if (settingsData?.gstPercentage || settingsData?.shippingCharge) {
          setSettings({
            gstPercentage: settingsData.gstPercentage || 18,
            shippingCharge: settingsData.shippingCharge || 200,
            freeShippingThreshold: settingsData.freeShippingThreshold || 5000,
          });
        }
      } catch (error) {
        console.log("Using default settings:", error.message);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* =========================
     PRICE CALCULATION - PER-PRODUCT GST
  ========================= */
  const subtotal = getCartTotal();
  
  // Calculate GST per product based on its specific GST rate
  let tax = 0;
  let taxBreakdown = [];
  cart.forEach((item) => {
    const productSubtotal = item.price * item.quantity;
    const productGst = item.gstPercentage || 18;
    const productTax = productSubtotal * (productGst / 100);
    tax += productTax;
    taxBreakdown.push({
      name: item.name?.en || item.name,
      quantity: item.quantity,
      basePrice: item.price,
      gstRate: productGst,
      tax: productTax,
    });
  });
  
  const shipping = subtotal > settings.freeShippingThreshold ? 0 : settings.shippingCharge;
  const total = subtotal + tax + shipping;

  /* =========================
     PLACE ORDER
  ========================= */
  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill all required fields");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    try {
      /* STEP 1: CREATE ORDER */
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

      /* STEP 2: LOAD RAZORPAY */
      await new Promise((resolve, reject) => {
        if (window.Razorpay) return resolve();

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      /* STEP 3: OPEN PAYMENT */
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
          } catch {
            alert("Payment verification failed");
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

  /* =========================
     UI
  ========================= */
  return (
    <>
      <Head>
        <title>Checkout - ARS Electronics World</title>
      </Head>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">🛒 Checkout</h1>

        {/* CART ITEMS */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-semibold">{item.name?.en || item.name}</p>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="px-2 bg-gray-200 rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="ml-4 text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DELIVERY ADDRESS */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">📍 Delivery Address</h2>

          <div className="space-y-3">
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="w-full border p-2 rounded" />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full border p-2 rounded" />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="w-full border p-2 rounded" />
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="bg-blue-50 border rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">💰 Price Summary</h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            
            {/* GST Breakdown Per Product */}
            <div className="border-t pt-2 mt-2">
              <p className="font-semibold text-sm mb-2">GST Breakdown:</p>
              {taxBreakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm ml-4 text-gray-700">
                  <span>{item.name} ({item.quantity}x @ {item.gstRate}%)</span>
                  <span>₹{item.tax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold mt-1 text-sm">
                <span>Total GST</span>
                <span>₹{tax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-green-600" : ""}>
                {shipping === 0 ? "Free" : `₹${shipping}`}
              </span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* PLACE ORDER */}
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
