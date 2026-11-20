import React, { useState } from "react";
import { Trash2, ArrowRight, ShieldCheck, Minus, Plus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Premium Wagyu Burger",
    description: "Extra pickles, no onions, brioche bun.",
    price: 18.5,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Superfood Harvest Bowl",
    description: "Gluten-free, vegan, maple-tahini dressing.",
    price: 14.2,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Signature Cold Brew",
    description: "Large (16oz), Oat milk, Vanilla syrup.",
    price: 5.5,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80",
  },
];

export const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoFeedback, setPromoFeedback] = useState("");

  const handleUpdateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === "DELIVIO10") {
      setDiscount(5.0);
      setPromoFeedback("Promo code applied (-$5.00)");
    } else {
      setDiscount(0);
      setPromoFeedback("Invalid code. Try DELIVIO10");
    }
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const estimatedTax =
    subtotal > 0 ? Number((subtotal * 0.080153).toFixed(2)) : 0;
  const total = Math.max(0, subtotal + estimatedTax - discount);

  return (
    <div className="mx-auto max-w-6xl py-4">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:col-span-8">
          {items.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-base font-medium text-slate-500">
                Your shopping cart is empty.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 shrink-0 rounded-lg object-cover"
                />

                <div className="flex flex-1 flex-col justify-between self-stretch">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {item.name}
                      </h2>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-4 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="text-slate-600 transition-colors hover:text-slate-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[1rem] text-center text-sm font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="text-slate-600 transition-colors hover:text-slate-900"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Botón Remove */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 transition-colors hover:text-red-700"
                    >
                      <Trash2 size={15} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-4">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Order Summary
          </h2>

          <div className="space-y-3.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Delivery Fee</span>
              <span className="font-semibold text-teal-600">Free</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Estimated Tax</span>
              <span className="font-semibold text-slate-900">
                ${estimatedTax.toFixed(2)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between text-emerald-600">
                <span>Discount</span>
                <span className="font-semibold">-${discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <hr className="my-5 border-slate-200" />

          <form onSubmit={handleApplyPromo}>
            <label
              htmlFor="promo-code"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Promo Code
            </label>
            <div className="flex gap-2">
              <input
                id="promo-code"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="w-full flex-1 rounded-lg border border-slate-200 bg-slate-100/80 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-sky-200/80 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-sky-300/80"
              >
                Apply
              </button>
            </div>
            {promoFeedback && (
              <p className="mt-1.5 text-xs font-medium text-indigo-600">
                {promoFeedback}
              </p>
            )}
          </form>

          <hr className="my-6 border-slate-200" />

          <div className="mb-6 flex items-baseline justify-between">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-3xl font-extrabold text-indigo-600">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-3.5 text-base font-bold text-white shadow-xs transition-colors hover:bg-indigo-700"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            <ShieldCheck size={14} className="text-slate-600" />
            <span>SECURE CHECKOUT POWERED BY DELIVIO</span>
          </div>
        </aside>
      </div>
    </div>
  );
};