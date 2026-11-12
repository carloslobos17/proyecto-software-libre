import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const mockDatabase: Record<string, any> = {
  "1": {
    name: "Truffle Umami Burger",
    reviews: "1.2k Reviews",
    category: "Fast Food",
    description: "A masterclass in savory flavors. Our signature Wagyu beef blend, hand-pressed and seared, layered with house-made black truffle aioli, sautéed balsamic wild mushrooms, and melted aged Gruyère. All cradled in a toasted, buttered artisan brioche bun.",
    basePrice: 18.50,
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    ]
  },
  "2": {
    name: "Classic Cheeseburger",
    reviews: "850 Reviews",
    category: "Fast Food",
    description: "Our traditional cheeseburger with a smashed beef patty, cheddar cheese, fresh lettuce, tomato, and our secret sauce on a toasted brioche bun.",
    basePrice: 12.00,
    images: [
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    ]
  }
};

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const product = id && mockDatabase[id] ? mockDatabase[id] : mockDatabase["1"];

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [toppings, setToppings] = useState({
    aioli: false,
    bacon: false,
    egg: false,
  });

  const calculateTotal = () => {
    let total = product.basePrice;
    if (toppings.aioli) total += 1.50;
    if (toppings.bacon) total += 2.50;
    if (toppings.egg) total += 2.00;
    return (total * quantity).toFixed(2);
  };

  const toggleTopping = (key: keyof typeof toppings) => {
    setToppings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-white py-10 px-4 flex justify-center">
      <div className="flex flex-col lg:flex-row max-w-5xl w-full gap-10">
        
        {/* LEFT COLUMN - Image Gallery */}
        <section className="flex-1 w-full lg:w-1/2">
          <img 
            src={product.images[selectedImage] || product.images[0]} 
            alt={product.name}
            className="w-full aspect-square md:aspect-[5/4] object-cover rounded-xl"
          />
          <div className="flex mt-4 gap-3">
            {product.images.map((img: string, index: number) => (
              <button 
                key={index} 
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-indigo-700' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN - Product Details */}
        <section className="flex-1 w-full lg:w-1/2">
          
          <div className="flex justify-between items-start">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight whitespace-pre-line">
              {product.name}
            </h1>
            <button className="text-slate-400 hover:text-red-500 text-3xl transition-colors mt-2">
              ♡
            </button>
          </div>

          <div className="flex items-center mt-3 mb-5">
            <span className="text-orange-700 text-lg tracking-widest">★★★★★</span>
            <span className="text-slate-500 text-sm ml-3 font-medium">
              ({product.reviews}) <span className="mx-2">•</span> <span className="text-teal-600 font-bold">{product.category}</span>
            </span>
          </div>

          <p className="text-slate-600 text-base leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="bg-[#F8F9FF] border border-slate-200 rounded-xl p-6">
            
            <label className="text-xs font-bold text-slate-700 tracking-wider mb-2 block">PRICE</label>
            <div className="flex justify-between items-center mb-6">
              <span className="text-4xl font-extrabold text-indigo-700">${product.basePrice.toFixed(2)}</span>
              
              <div className="flex items-center bg-white border border-slate-300 rounded-full w-28 justify-between p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-800 font-medium text-xl"
                >
                  -
                </button>
                <span className="font-bold text-slate-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-xl"
                >
                  +
                </button>
              </div>
            </div>

            <label className="text-xs font-bold text-slate-700 tracking-wider mb-3 block mt-4">ADD EXTRA TOPPINGS</label>
            
            <div 
              className={`flex items-center p-3.5 border rounded-lg bg-white mb-2.5 cursor-pointer transition-colors ${toppings.aioli ? 'border-indigo-600' : 'border-slate-200'}`}
              onClick={() => toggleTopping('aioli')}
            >
              <div className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${toppings.aioli ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                {toppings.aioli && <span>✓</span>}
              </div>
              <span className="flex-1 text-sm text-slate-900 font-medium">Extra Truffle Aioli</span>
              <span className="text-sm text-teal-600 font-semibold">+$1.50</span>
            </div>

            <div 
              className={`flex items-center p-3.5 border rounded-lg bg-white mb-2.5 cursor-pointer transition-colors ${toppings.bacon ? 'border-indigo-600' : 'border-slate-200'}`}
              onClick={() => toggleTopping('bacon')}
            >
              <div className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${toppings.bacon ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                {toppings.bacon && <span>✓</span>}
              </div>
              <span className="flex-1 text-sm text-slate-900 font-medium">Crispy Bacon Stripes</span>
              <span className="text-sm text-teal-600 font-semibold">+$2.50</span>
            </div>

            <div 
              className={`flex items-center p-3.5 border rounded-lg bg-white mb-2.5 cursor-pointer transition-colors ${toppings.egg ? 'border-indigo-600' : 'border-slate-200'}`}
              onClick={() => toggleTopping('egg')}
            >
              <div className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${toppings.egg ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                {toppings.egg && <span>✓</span>}
              </div>
              <span className="flex-1 text-sm text-slate-900 font-medium">Fried Egg</span>
              <span className="text-sm text-teal-600 font-semibold">+$2.00</span>
            </div>

            <label className="text-xs font-bold text-slate-700 tracking-wider mb-3 block mt-6">CHOOSE A SIDE</label>
            <div className="w-full flex justify-between items-center p-3.5 border border-slate-200 rounded-lg bg-white mb-6 cursor-pointer">
              <span className="text-sm text-slate-900 font-medium">Truffle Parmesan Fries (Included)</span>
              <span className="text-slate-500">⌄</span>
            </div>

            <button className="w-full bg-[#544CF6] text-white font-bold text-base rounded-lg py-4 hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              Add to Cart — ${calculateTotal()}
            </button>
          </div>

        </section>
      </div>
    </main>
  );
};