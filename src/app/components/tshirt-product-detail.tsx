import { useState } from 'react';
import { Upload, Star, Download, FileText, ShoppingCart, ChevronDown } from 'lucide-react';

type DesignArea = 'front' | 'back' | 'leftSleeve' | 'rightSleeve';
type PrintMethod = 'screenPrint' | 'dtg' | 'embroidery' | 'vinylTransfer';

interface DesignAreaConfig {
  printMethod: PrintMethod | null;
  colors: number;
  file: File | null;
  fileName: string | null;
}

const printMethods = [
  { id: 'screenPrint', name: 'Screen Printing', price: 2.50 },
  { id: 'dtg', name: 'Direct to Garment', price: 3.50 },
  { id: 'embroidery', name: 'Embroidery', price: 4.00 },
  { id: 'vinylTransfer', name: 'Vinyl Transfer', price: 3.00 },
];

const colorOptions = [
  { name: 'White', hex: '#FFFFFF', border: true },
  { name: 'Black', hex: '#000000' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Gray', hex: '#6B7280' },
];

const designAreas = [
  { id: 'front' as DesignArea, name: 'Front Print', description: 'Main front design area (12" × 16")' },
  { id: 'back' as DesignArea, name: 'Back Print', description: 'Full back design area (12" × 16")' },
  { id: 'leftSleeve' as DesignArea, name: 'Left Sleeve', description: 'Left sleeve print (3" × 3")' },
  { id: 'rightSleeve' as DesignArea, name: 'Right Sleeve', description: 'Right sleeve print (3" × 3")' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

const pricingTiers = [
  { min: 10, max: 24, price: 15.99 },
  { min: 25, max: 49, price: 14.49 },
  { min: 50, max: 99, price: 12.99 },
  { min: 100, max: 249, price: 11.49 },
  { min: 250, max: null, price: 9.99 },
];

export function TshirtProductDetail() {
  const [selectedColor, setSelectedColor] = useState('White');
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>({
    XS: 0, S: 0, M: 0, L: 0, XL: 0, '2XL': 0, '3XL': 0,
  });
  const [designs, setDesigns] = useState<Record<DesignArea, DesignAreaConfig>>({
    front: { printMethod: null, colors: 1, file: null, fileName: null },
    back: { printMethod: null, colors: 1, file: null, fileName: null },
    leftSleeve: { printMethod: null, colors: 1, file: null, fileName: null },
    rightSleeve: { printMethod: null, colors: 1, file: null, fileName: null },
  });
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'positions' | 'reviews'>('description');

  const updateDesignArea = (area: DesignArea, updates: Partial<DesignAreaConfig>) => {
    setDesigns(prev => ({
      ...prev,
      [area]: { ...prev[area], ...updates },
    }));
  };

  const handleFileUpload = (area: DesignArea, file: File | null) => {
    if (file) {
      updateDesignArea(area, { file, fileName: file.name });
    }
  };

  const updateSizeQuantity = (size: string, value: number) => {
    setSizeQuantities(prev => ({ ...prev, [size]: Math.max(0, value) }));
  };

  const totalQuantity = Object.values(sizeQuantities).reduce((sum, qty) => sum + qty, 0);

  const basePrice = 15.99;
  const calculatePrice = () => {
    if (totalQuantity === 0) return { unitPrice: basePrice, totalPrice: 0 };
    
    // Find pricing tier
    const tier = pricingTiers.find(t => {
      if (t.max === null) return totalQuantity >= t.min;
      return totalQuantity >= t.min && totalQuantity <= t.max;
    });
    const tierPrice = tier?.price || basePrice;
    
    // Add printing costs
    let printingCost = 0;
    Object.values(designs).forEach(design => {
      if (design.printMethod) {
        const method = printMethods.find(m => m.id === design.printMethod);
        if (method) {
          printingCost += method.price;
        }
      }
    });
    
    const unitPrice = tierPrice + printingCost;
    const totalPrice = unitPrice * totalQuantity;
    
    return { unitPrice, totalPrice };
  };

  const { unitPrice, totalPrice } = calculatePrice();

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E8DDD3', padding: '16px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <a href="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', textDecoration: 'none' }}>
              Home
            </a>
            <span style={{ color: '#C8C8C8' }}>›</span>
            <a href="/category/apparel" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', textDecoration: 'none' }}>
              Apparel
            </a>
            <span style={{ color: '#C8C8C8' }}>›</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C', fontWeight: '500' }}>
              Custom Print T-Shirt
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: '60px', marginBottom: '80px' }}>
          {/* Left Column - Product Image Only */}
          <div>
            <div style={{ position: 'sticky', top: '24px' }}>
              <div style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '0px',
                overflow: 'hidden',
                border: '1px solid #E8DDD3',
                aspectRatio: '1/1',
                marginBottom: '16px',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop"
                  alt="Custom Print T-Shirt"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: selectedColor === 'Black' ? 'brightness(0.3)' : selectedColor === 'Navy' ? 'hue-rotate(200deg) brightness(0.6)' : 'none',
                  }}
                />
              </div>
              
              {/* Thumbnail images */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {['Front', 'Back', 'Side', 'Detail'].map((view, index) => (
                  <div
                    key={view}
                    style={{
                      aspectRatio: '1/1',
                      backgroundColor: '#FFFFFF',
                      border: index === 0 ? '2px solid #044c5c' : '1px solid #E8DDD3',
                      borderRadius: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    {view}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - All Details */}
          <div>
            {/* Product Name */}
            <h1 style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '32px', 
              fontWeight: '600', 
              color: '#2C2C2C', 
              marginBottom: '16px',
              lineHeight: '1.2',
            }}>
              Custom Print T-Shirt - Premium Cotton
            </h1>

            {/* Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={18} fill="#FFB020" color="#FFB020" />
                ))}
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                5.0 (47 reviews)
              </span>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #E8DDD3' }}>
              <label style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#2C2C2C',
                display: 'block',
                marginBottom: '12px',
              }}>
                Color: <span style={{ color: '#666', fontWeight: '400' }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {colorOptions.map(color => (
                  <div
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: color.hex,
                      border: color.border ? '2px solid #E8DDD3' : 'none',
                      borderRadius: '0px',
                      cursor: 'pointer',
                      outline: selectedColor === color.name ? '3px solid #044c5c' : 'none',
                      outlineOffset: '3px',
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size & Quantity Grid */}
            <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #E8DDD3' }}>
              <label style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#2C2C2C',
                display: 'block',
                marginBottom: '14px',
              }}>
                Size & Quantity
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {sizes.map(size => (
                  <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ 
                      fontFamily: 'Poppins, sans-serif', 
                      fontSize: '12px', 
                      fontWeight: '600',
                      color: '#2C2C2C',
                      textAlign: 'center',
                    }}>
                      {size}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #E8DDD3', borderRadius: '0px', overflow: 'hidden' }}>
                      <button
                        onClick={() => updateSizeQuantity(size, sizeQuantities[size] + 1)}
                        style={{
                          height: '28px',
                          backgroundColor: '#FFFFFF',
                          borderTop: 'none',
                          borderRight: 'none',
                          borderBottom: '1px solid #E8DDD3',
                          borderLeft: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#2C2C2C',
                        }}
                      >
                        +
                      </button>
                      <input
                        type="number"
                        value={sizeQuantities[size]}
                        onChange={(e) => updateSizeQuantity(size, parseInt(e.target.value) || 0)}
                        style={{
                          height: '32px',
                          border: 'none',
                          textAlign: 'center',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#2C2C2C',
                          width: '100%',
                        }}
                      />
                      <button
                        onClick={() => updateSizeQuantity(size, sizeQuantities[size] - 1)}
                        style={{
                          height: '28px',
                          backgroundColor: '#FFFFFF',
                          borderTop: '1px solid #E8DDD3',
                          borderRight: 'none',
                          borderBottom: 'none',
                          borderLeft: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#2C2C2C',
                        }}
                      >
                        −
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ 
                marginTop: '12px',
                padding: '10px 14px',
                backgroundColor: '#F7F8FA',
                borderRadius: '0px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666' }}>
                  Total Quantity:
                </span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#044c5c' }}>
                  {totalQuantity} pieces
                </span>
              </div>
            </div>

            {/* Design Areas - 2 Column Layout */}
            <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #E8DDD3' }}>
              <label style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#2C2C2C',
                display: 'block',
                marginBottom: '14px',
              }}>
                Design Areas
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {designAreas.map((area) => (
                  <div 
                    key={area.id} 
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8DDD3',
                      borderRadius: '0px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: '20px', alignItems: 'center' }}>
                      {/* Column 1: Area Name */}
                      <div>
                        <div style={{ 
                          fontFamily: 'Poppins, sans-serif', 
                          fontSize: '13px', 
                          fontWeight: '600',
                          color: '#2C2C2C',
                          marginBottom: '2px',
                        }}>
                          {area.name}
                        </div>
                        <div style={{ 
                          fontFamily: 'Inter, sans-serif', 
                          fontSize: '11px', 
                          color: '#999',
                        }}>
                          {area.description}
                        </div>
                      </div>

                      {/* Column 2: Printing Method */}
                      <div>
                        <div style={{ 
                          fontFamily: 'Inter, sans-serif', 
                          fontSize: '11px', 
                          color: '#999',
                          marginBottom: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>
                          Method
                        </div>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {printMethods.map(method => (
                            <button
                              key={method.id}
                              onClick={() => updateDesignArea(area.id, { printMethod: method.id as PrintMethod })}
                              style={{
                                padding: '5px 10px',
                                backgroundColor: designs[area.id].printMethod === method.id ? '#044c5c' : '#FFFFFF',
                                color: designs[area.id].printMethod === method.id ? '#FFFFFF' : '#666',
                                borderTop: designs[area.id].printMethod === method.id ? 'none' : '1px solid #E8DDD3',
                                borderRight: designs[area.id].printMethod === method.id ? 'none' : '1px solid #E8DDD3',
                                borderBottom: designs[area.id].printMethod === method.id ? 'none' : '1px solid #E8DDD3',
                                borderLeft: designs[area.id].printMethod === method.id ? 'none' : '1px solid #E8DDD3',
                                borderRadius: '0px',
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '11px',
                                fontWeight: '500',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {method.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Colors & Upload */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {/* Color Count */}
                        <div>
                          <div style={{ 
                            fontFamily: 'Inter, sans-serif', 
                            fontSize: '11px', 
                            color: '#999',
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            Colors
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {[1, 2, 3, 4].map(num => (
                              <button
                                key={num}
                                onClick={() => updateDesignArea(area.id, { colors: num })}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  backgroundColor: designs[area.id].colors === num ? '#C8956C' : '#FFFFFF',
                                  color: designs[area.id].colors === num ? '#FFFFFF' : '#666',
                                  borderTop: designs[area.id].colors === num ? 'none' : '1px solid #E8DDD3',
                                  borderRight: designs[area.id].colors === num ? 'none' : '1px solid #E8DDD3',
                                  borderBottom: designs[area.id].colors === num ? 'none' : '1px solid #E8DDD3',
                                  borderLeft: designs[area.id].colors === num ? 'none' : '1px solid #E8DDD3',
                                  borderRadius: '0px',
                                  fontFamily: 'Poppins, sans-serif',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                }}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* File Upload */}
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontFamily: 'Inter, sans-serif', 
                            fontSize: '11px', 
                            color: '#999',
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            File
                          </div>
                          <label
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              padding: '5px 10px',
                              borderTop: designs[area.id].fileName ? '1px solid #16A34A' : '1px solid #E8DDD3',
                              borderRight: designs[area.id].fileName ? '1px solid #16A34A' : '1px solid #E8DDD3',
                              borderBottom: designs[area.id].fileName ? '1px solid #16A34A' : '1px solid #E8DDD3',
                              borderLeft: designs[area.id].fileName ? '1px solid #16A34A' : '1px solid #E8DDD3',
                              borderRadius: '0px',
                              backgroundColor: designs[area.id].fileName ? '#F0FDF4' : '#FFFFFF',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              minHeight: '28px',
                            }}
                          >
                            <Upload size={12} color={designs[area.id].fileName ? '#16A34A' : '#999'} />
                            <span style={{ 
                              fontFamily: 'Inter, sans-serif', 
                              fontSize: '11px', 
                              fontWeight: '500',
                              color: designs[area.id].fileName ? '#16A34A' : '#666',
                              maxWidth: '120px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}>
                              {designs[area.id].fileName || 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept=".png,.jpg,.jpeg,.pdf,.ai,.eps,.svg"
                              onChange={(e) => handleFileUpload(area.id, e.target.files?.[0] || null)}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Based Pricing */}
            <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #E8DDD3' }}>
              <label style={{ 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#2C2C2C',
                display: 'block',
                marginBottom: '14px',
              }}>
                Quantity Based Pricing
              </label>
              <div style={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8DDD3',
                borderRadius: '0px',
                overflow: 'hidden',
              }}>
                {pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      padding: '10px 14px',
                      gap: '16px',
                      borderBottom: index < pricingTiers.length - 1 ? '1px solid #E8DDD3' : 'none',
                      backgroundColor: totalQuantity >= tier.min && (tier.max === null || totalQuantity <= tier.max) ? '#F0F9FF' : '#FFFFFF',
                    }}
                  >
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#2C2C2C' }}>
                      {tier.min} - {tier.max || '∞'} pieces
                    </span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '600', color: '#044c5c' }}>
                      ${tier.price.toFixed(2)}/pc
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Document */}
            <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #E8DDD3' }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8DDD3',
                  borderRadius: '0px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#044c5c',
                  cursor: 'pointer',
                }}
              >
                <Download size={16} />
                Download Size Chart
              </button>
            </div>

            {/* Final Rate */}
            <div style={{ 
              marginBottom: '32px',
              padding: '20px',
              backgroundColor: '#F7F8FA',
              borderRadius: '0px',
              border: '1px solid #E8DDD3',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666' }}>
                  Unit Price:
                </span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '600', color: '#2C2C2C' }}>
                  ${unitPrice.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #E8DDD3' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: '600', color: '#2C2C2C' }}>
                  Total Price:
                </span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '26px', fontWeight: '700', color: '#044c5c' }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <button
                style={{
                  padding: '16px 24px',
                  backgroundColor: '#044c5c',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '0px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Design Now
              </button>
              <button
                style={{
                  padding: '16px 24px',
                  backgroundColor: 'transparent',
                  color: '#d41c5c',
                  border: '2px solid #d41c5c',
                  borderRadius: '0px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <FileText size={18} />
                Request Quote
              </button>
              <button
                style={{
                  padding: '16px 24px',
                  backgroundColor: '#044c5c',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '0px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
            <div style={{ 
              padding: '12px 16px',
              backgroundColor: '#FFF8E1',
              borderRadius: '0px',
              textAlign: 'center',
            }}>
              <p style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontSize: '12px', 
                color: '#2C2C2C',
              }}>
                💡 Minimum order: 10 pieces • Upload high-resolution files (300 DPI) for best results
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DDD3', borderRadius: '0px', overflow: 'hidden' }}>
          {/* Tab Headers */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E8DDD3' }}>
            {[
              { id: 'description', label: 'Description' },
              { id: 'specs', label: 'Specifications' },
              { id: 'positions', label: 'Printing Positions' },
              { id: 'reviews', label: 'Reviews (47)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  backgroundColor: activeTab === tab.id ? '#FAFAF8' : '#FFFFFF',
                  borderTop: 'none',
                  borderRight: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid #044c5c' : 'none',
                  borderLeft: 'none',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  color: activeTab === tab.id ? '#044c5c' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '32px' }}>
            {activeTab === 'description' && (
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '600', color: '#2C2C2C', marginBottom: '16px' }}>
                  Product Description
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#666', lineHeight: '1.8', marginBottom: '16px' }}>
                  Our premium custom print t-shirt is made from 100% high-quality cotton, offering exceptional comfort and durability. Perfect for businesses, events, sports teams, promotional campaigns, or personal gifts.
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#666', lineHeight: '1.8', marginBottom: '16px' }}>
                  Each t-shirt can be customized with multiple print areas including front, back, and both sleeves. Choose from various printing methods to achieve your desired look - from vibrant screen prints to detailed embroidery.
                </p>
                <ul style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#666', lineHeight: '1.8', paddingLeft: '20px' }}>
                  <li>Premium 100% cotton fabric (180 GSM)</li>
                  <li>Pre-shrunk for consistent fit</li>
                  <li>Multiple printing methods available</li>
                  <li>Suitable for all occasions</li>
                  <li>Bulk pricing available</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '600', color: '#2C2C2C', marginBottom: '20px' }}>
                  Technical Specifications
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px' }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C' }}>Material:</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>100% Premium Cotton</div>
                  
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C' }}>Fabric Weight:</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>180 GSM</div>
                  
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C' }}>Neck Style:</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>Crew Neck</div>
                  
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C' }}>Sleeves:</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>Short Sleeve</div>
                  
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C' }}>Seams:</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>Double-stitched for durability</div>
                  
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C' }}>Care:</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>Machine wash cold, tumble dry low</div>
                  
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C' }}>Sizes Available:</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>XS, S, M, L, XL, 2XL, 3XL</div>
                </div>
              </div>
            )}

            {activeTab === 'positions' && (
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '600', color: '#2C2C2C', marginBottom: '20px' }}>
                  Available Printing Positions
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                  {designAreas.map(area => (
                    <div key={area.id} style={{ padding: '20px', backgroundColor: '#F7F8FA', borderRadius: '0px' }}>
                      <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '600', color: '#2C2C2C', marginBottom: '8px' }}>
                        {area.name}
                      </h4>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        {area.description}
                      </p>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C8956C', fontWeight: '600' }}>
                        All printing methods available
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '600', color: '#2C2C2C' }}>
                    Customer Reviews
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={20} fill="#FFB020" color="#FFB020" />
                      ))}
                    </div>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: '600', color: '#2C2C2C' }}>
                      5.0
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                      (47 reviews)
                    </span>
                  </div>
                </div>
                
                {[1, 2, 3].map(review => (
                  <div key={review} style={{ padding: '20px 0', borderBottom: '1px solid #E8DDD3' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: '600', color: '#2C2C2C', marginBottom: '4px' }}>
                          Customer Name
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} size={14} fill="#FFB020" color="#FFB020" />
                          ))}
                        </div>
                      </div>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666' }}>
                        2 weeks ago
                      </span>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                      Excellent quality t-shirts with great printing. The colors are vibrant and the fabric is very comfortable. Highly recommend for custom printing projects!
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}