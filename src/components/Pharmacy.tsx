import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Trash2, 
  ShieldCheck, 
  AlertCircle, 
  Truck, 
  Clock, 
  X,
  FileCheck,
  Check
} from 'lucide-react';
import { PharmacyItem, CartItem, PharmacyOrder } from '../types/medical';

interface PharmacyProps {
  items: PharmacyItem[];
  cart: CartItem[];
  onAddToCart: (item: PharmacyItem) => void;
  onUpdateCartQty: (itemId: string, newQty: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: PharmacyOrder) => void;
  activeOrders: PharmacyOrder[];
  isCartDrawerOpen: boolean;
  onCloseCartDrawer: () => void;
  activePatientAddress: string;
}

export const Pharmacy: React.FC<PharmacyProps> = ({
  items,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  onPlaceOrder,
  activeOrders,
  isCartDrawerOpen,
  onCloseCartDrawer,
  activePatientAddress
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<PharmacyItem | null>(null);

  // Prescription Upload OCR Scanner State
  const [isRxScannerOpen, setIsRxScannerOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedMeds, setScannedMeds] = useState<PharmacyItem[]>([]);
  const [rxFileUploaded, setRxFileUploaded] = useState(false);

  // Checkout address & state
  const [deliveryAddress, setDeliveryAddress] = useState(activePatientAddress);
  const [orderConfirmed, setConfirmedOrder] = useState<PharmacyOrder | null>(null);

  const categories = [
    'All',
    'Cardiovascular',
    'Anti-diabetic',
    'Pain Relief',
    'Antibiotics',
    'Vitamins & Wellness',
    'Respiratory'
  ];

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartSubtotal = cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0);
  const deliveryFee = cartSubtotal > 500 || cartSubtotal === 0 ? 0 : 50.00;
  const cartTotal = cartSubtotal + deliveryFee;
  const requiresRx = cart.some((c) => c.product.requiresPrescription);

  const handleSimulatePrescriptionScan = () => {
    setIsScanning(true);
    setRxFileUploaded(true);
    setTimeout(() => {
      setIsScanning(false);
      // Detected matching items in catalog
      const detected = [items[0], items[1]]; // Lipitor, Metformin
      setScannedMeds(detected);
    }, 1800);
  };

  const handleAddAllScannedToCart = () => {
    scannedMeds.forEach((m) => onAddToCart(m));
    setIsRxScannerOpen(false);
    setScannedMeds([]);
    setRxFileUploaded(false);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder: PharmacyOrder = {
      id: `RX-ORD-${Date.now().toString().slice(-6)}`,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      shippingAddress: deliveryAddress,
      prescriptionAttached: requiresRx,
      status: 'verified_by_pharmacist',
      estimatedDelivery: 'Today within 60 Minutes (Express Delivery)',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onPlaceOrder(newOrder);
    setConfirmedOrder(newOrder);
    onClearCart();
    onCloseCartDrawer();
  };

  return (
    <div className="space-y-8">
      {/* Header with Prescription Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
              Licensed Clinical Online Pharmacy
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Genuine Prescription Drugs & Healthcare Essentials
            </h1>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              100% authentic pharmaceuticals verified by registered clinical pharmacists. Upload your doctor's digital prescription for automated order fulfillment and express doorstep delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsRxScannerOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Prescription to Order</span>
            </button>
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search generic salt, brand name, or therapeutic category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Orders Tracker Strip */}
      {activeOrders.length > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-teal-950 flex items-center gap-2">
              <Truck className="w-4 h-4 text-teal-700" />
              <span>Active Pharmacy Deliveries ({activeOrders.length})</span>
            </h3>
            <span className="text-xs font-mono text-teal-800 font-semibold">Priority Clinical Dispatch</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeOrders.map((ord) => (
              <div key={ord.id} className="bg-white p-3.5 rounded-lg border border-teal-200/80 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Pharmacist Verified
                  </span>
                </div>
                <p className="text-slate-600">{ord.items.length} Medicines · Total: <strong className="font-mono text-slate-900">₹{ord.total.toFixed(2)}</strong></p>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>ETA: <strong className="text-slate-800">{ord.estimatedDelivery}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pharmacy Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 transition-all"
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
                  {item.category}
                </span>
                {item.requiresPrescription && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Rx Required
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-sm mt-1.5 line-clamp-1">{item.name}</h3>
              <p className="text-slate-500 text-xs">{item.brand}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{item.packageSize}</p>

              <div className="mt-3 p-2 bg-slate-50 rounded text-[11px] text-slate-600 leading-snug line-clamp-2">
                <strong>Salt: </strong>{item.composition}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through mr-1 font-mono">₹{item.originalPrice.toFixed(2)}</span>
                  <span className="text-base font-extrabold text-slate-900 font-mono">₹{item.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setSelectedItemForDetails(item)}
                  className="text-xs text-teal-700 hover:text-teal-900 font-medium"
                >
                  Details
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => onAddToCart(item)}
                className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Medication Details Modal */}
      {selectedItemForDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setSelectedItemForDetails(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-teal-700 font-bold uppercase">{selectedItemForDetails.category}</span>
                {selectedItemForDetails.requiresPrescription && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Rx Required
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-1">{selectedItemForDetails.name}</h3>
              <p className="text-slate-500 text-xs">{selectedItemForDetails.brand} · {selectedItemForDetails.packageSize}</p>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed">
              <div>
                <p className="font-semibold text-slate-700">Active Chemical Composition</p>
                <p className="text-slate-800 font-mono text-[11px] mt-0.5">{selectedItemForDetails.composition}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-700">Standard Dosage & Usage Instructions</p>
                <p className="text-slate-600 mt-0.5">{selectedItemForDetails.instructions}</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="font-bold text-amber-900 text-[11px] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Clinical Safety & Food Interaction Notice</span>
                </p>
                <p className="text-amber-800 text-[11px] mt-1">{selectedItemForDetails.warnings}</p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xl font-bold font-mono text-slate-900">₹{selectedItemForDetails.price.toFixed(2)}</span>
                <button
                  onClick={() => {
                    onAddToCart(selectedItemForDetails);
                    setSelectedItemForDetails(null);
                  }}
                  className="py-2.5 px-6 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-xs transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Upload OCR Scanner Modal */}
      {isRxScannerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setIsRxScannerOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Prescription OCR Verification</h3>
              <p className="text-slate-500 text-xs mt-0.5">Upload doctor's prescription file (PDF/Image) for automatic medicine matching</p>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {!rxFileUploaded ? (
                <div
                  onClick={handleSimulatePrescriptionScan}
                  className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/40 rounded-xl p-8 text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-900">Click to upload prescription or drop file here</p>
                  <p className="text-slate-500 text-[11px] mt-1">Supports PNG, JPG, or PDF (Max 15MB)</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-teal-700 text-white text-[11px] font-semibold rounded">
                    Simulate Upload & OCR
                  </span>
                </div>
              ) : isScanning ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="font-semibold text-slate-800">Analyzing Prescription with Clinical OCR...</p>
                  <p className="text-slate-400 text-[11px]">Identifying salt formulations & dosage schedules</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>2 Prescribed Medications Successfully Detected</span>
                  </div>

                  <div className="space-y-2">
                    {scannedMeds.map((med) => (
                      <div key={med.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{med.name}</p>
                          <p className="text-[11px] text-slate-500">{med.composition}</p>
                        </div>
                        <span className="font-mono font-bold text-slate-800">₹{med.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleAddAllScannedToCart}
                    className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add All {scannedMeds.length} to Cart</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer Slide-Over */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-md bg-white h-full flex flex-col text-slate-900 shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Cart Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-base text-slate-900">Your Pharmacy Cart ({cart.length})</h3>
              </div>
              <button onClick={onCloseCartDrawer} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <ShoppingCart className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
                  <p className="font-semibold text-slate-700">Your cart is currently empty</p>
                  <p className="text-xs">Browse the pharmacy catalog to add medications or wellness products.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs truncate">{item.product.name}</h4>
                      <p className="text-slate-500 text-[11px] truncate">{item.product.packageSize}</p>
                      <p className="font-mono font-bold text-slate-800 text-xs mt-1">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                        className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-xs font-bold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                        className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Checkout */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3 text-xs">
                {requiresRx && (
                  <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 text-[11px] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>Includes prescription items verified under your EHR profile.</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Delivery Address</label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-900"
                  />
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold">₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Express Clinical Delivery</span>
                    <span className="font-mono font-semibold">
                      {deliveryFee === 0 ? <span className="text-emerald-700">FREE (Orders &gt; ₹500)</span> : `₹${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-sm pt-1 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="font-mono">₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Place Express Order (₹{cartTotal.toFixed(2)})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Confirmed Dialog */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 text-slate-900 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Order Placed & Dispatched!</h3>
              <p className="text-slate-600 text-xs mt-1">
                Order <strong className="font-mono text-slate-900">{orderConfirmed.id}</strong> has been assigned to a licensed clinical pharmacist.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Items Count:</span>
                <span className="font-semibold text-slate-800">{orderConfirmed.items.length} Medicines</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">{orderConfirmed.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="text-slate-800 truncate max-w-[200px]">{orderConfirmed.shippingAddress}</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedOrder(null)}
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
