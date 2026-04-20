import { useState } from 'react';
import { Upload, Download, Plus, Trash2, ChevronDown, Info } from 'lucide-react';

type DesignArea = 'chest' | 'fullFront' | 'fullBack' | 'leftSleeve' | 'rightSleeve';
type PrintMethod = 'screenPrint' | 'dtg' | 'embroidery' | 'heatTransfer';

interface DesignConfig {
  area: DesignArea;
  method: PrintMethod;
  colors: number;
  file?: File;
  fileName?: string;
}

const tshirtColors = [
  { name: 'White', hex: '#FFFFFF', border: true },
  { name: 'Black', hex: '#000000' },
  { name: 'Navy Blue', hex: '#1E3A8A' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Forest Green', hex: '#166534' },
  { name: 'Royal Blue', hex: '#2563EB' },
  { name: 'Maroon', hex: '#7C2D12' },
  { name: 'Gray', hex: '#6B7280' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

const designAreas = [
  {
    id: 'chest' as DesignArea,
    name: 'Chest',
    description: 'Left or center chest area',
    maxSize: '4" × 4"',
    position: 'top-[30%] left-[50%]',
  },
  {
    id: 'fullFront' as DesignArea,
    name: 'Full Front',
    description: 'Entire front of shirt',
    maxSize: '12" × 16"',
    position: 'top-[35%] left-[50%]',
  },
  {
    id: 'fullBack' as DesignArea,
    name: 'Full Back',
    description: 'Entire back of shirt',
    maxSize: '12" × 16"',
    position: 'top-[35%] left-[50%]',
  },
  {
    id: 'leftSleeve' as DesignArea,
    name: 'Left Sleeve',
    description: 'Left sleeve area',
    maxSize: '3" × 3"',
    position: 'top-[25%] left-[15%]',
  },
  {
    id: 'rightSleeve' as DesignArea,
    name: 'Right Sleeve',
    description: 'Right sleeve area',
    maxSize: '3" × 3"',
    position: 'top-[25%] right-[15%]',
  },
];

const printMethods = [
  {
    id: 'screenPrint' as PrintMethod,
    name: 'Screen Print',
    description: 'Best for bulk orders, vibrant colors',
    minQty: 24,
    pricePerColor: 1.5,
    setupFee: 25,
  },
  {
    id: 'dtg' as PrintMethod,
    name: 'Direct to Garment (DTG)',
    description: 'Photo quality, unlimited colors',
    minQty: 1,
    pricePerColor: 0,
    setupFee: 0,
  },
  {
    id: 'embroidery' as PrintMethod,
    name: 'Embroidery',
    description: 'Premium look, durable',
    minQty: 12,
    pricePerColor: 2.0,
    setupFee: 40,
  },
  {
    id: 'heatTransfer' as PrintMethod,
    name: 'Heat Transfer',
    description: 'Full color, good for small runs',
    minQty: 6,
    pricePerColor: 0,
    setupFee: 15,
  },
];

export function CustomTshirtDetailPage() {
  const [selectedColor, setSelectedColor] = useState('White');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [designs, setDesigns] = useState<DesignConfig[]>([]);
  const [activeDesign, setActiveDesign] = useState<number | null>(null);
  const [showMethodInfo, setShowMethodInfo] = useState<PrintMethod | null>(null);

  const addDesignArea = () => {
    const newDesign: DesignConfig = {
      area: 'chest',
      method: 'screenPrint',
      colors: 1,
    };
    setDesigns([...designs, newDesign]);
    setActiveDesign(designs.length);
  };

  const removeDesign = (index: number) => {
    setDesigns(designs.filter((_, i) => i !== index));
    if (activeDesign === index) {
      setActiveDesign(null);
    }
  };

  const updateDesign = (index: number, updates: Partial<DesignConfig>) => {
    const newDesigns = [...designs];
    newDesigns[index] = { ...newDesigns[index], ...updates };
    setDesigns(newDesigns);
  };

  const handleFileUpload = (index: number, file: File | undefined) => {
    if (file) {
      updateDesign(index, { file, fileName: file.name });
    }
  };

  const handleQuantityChange = (size: string, value: string) => {
    const num = parseInt(value) || 0;
    setQuantities({ ...quantities, [size]: num });
  };

  const totalQuantity = Object.values(quantities).reduce((sum, q) => sum + q, 0);

  const calculateEstimatedPrice = () => {
    let basePrice = 12.99;
    let setupTotal = 0;
    let printCostPerUnit = 0;

    designs.forEach(design => {
      const method = printMethods.find(m => m.id === design.method);
      if (method) {
        setupTotal += method.setupFee;
        printCostPerUnit += design.colors * method.pricePerColor;
      }
    });

    const unitPrice = basePrice + printCostPerUnit;
    const totalPrice = (unitPrice * totalQuantity) + setupTotal;

    return { unitPrice, totalPrice, setupTotal };
  };

  const pricing = calculateEstimatedPrice();

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
              Custom Apparel
            </a>
            <span style={{ color: '#C8C8C8' }}>›</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C', fontWeight: '500' }}>
              Custom T-Shirt Designer
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '36px', fontWeight: '600', color: '#2C2C2C', marginBottom: '12px', lineHeight: '1.2' }}>
            Custom T-Shirt Designer
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#666', lineHeight: '1.6', maxWidth: '800px' }}>
            Create your perfect custom t-shirt. Choose your colors, select design areas, pick printing methods, and upload your artwork. Perfect for teams, events, or promotional merchandise.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: '48px' }}>
          {/* Left Column - Visual Preview */}
          <div>
            <div style={{ position: 'sticky', top: '24px' }}>
              {/* T-Shirt Preview */}
              <div style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '0px', 
                padding: '32px',
                border: '1px solid #E8DDD3',
                marginBottom: '24px',
              }}>
                <div style={{ 
                  aspectRatio: '1/1.2',
                  backgroundColor: '#F7F8FA',
                  borderRadius: '0px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {/* T-shirt mockup */}
                  <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop"
                    alt="T-Shirt Preview"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      filter: selectedColor === 'Black' ? 'brightness(0.3)' : selectedColor === 'Navy Blue' ? 'hue-rotate(200deg) brightness(0.6)' : 'none',
                    }}
                  />
                  
                  {/* Design area indicators */}
                  {designs.map((design, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveDesign(index)}
                      style={{
                        position: 'absolute',
                        ...(design.area === 'chest' && { top: '30%', left: '35%', width: '30%', height: '15%' }),
                        ...(design.area === 'fullFront' && { top: '25%', left: '20%', width: '60%', height: '50%' }),
                        ...(design.area === 'fullBack' && { display: 'none' }),
                        ...(design.area === 'leftSleeve' && { top: '20%', left: '5%', width: '15%', height: '20%' }),
                        ...(design.area === 'rightSleeve' && { top: '20%', right: '5%', width: '15%', height: '20%' }),
                        border: activeDesign === index ? '3px solid #044c5c' : '2px dashed #C8956C',
                        backgroundColor: 'rgba(200, 149, 108, 0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontSize: '11px', 
                        fontWeight: '600',
                        color: activeDesign === index ? '#044c5c' : '#C8956C',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '4px 8px',
                        borderRadius: '0px',
                      }}>
                        {design.area.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}

                  {designs.length === 0 && (
                    <div style={{ 
                      textAlign: 'center',
                      color: '#999',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}>
                      <p style={{ marginBottom: '8px' }}>No design areas added</p>
                      <p style={{ fontSize: '12px' }}>Add a design area to get started</p>
                    </div>
                  )}
                </div>

                {/* Preview Info */}
                <div style={{ 
                  marginTop: '16px',
                  padding: '16px',
                  backgroundColor: '#F7F8FA',
                  borderRadius: '0px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666' }}>
                      Selected Color:
                    </span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '600', color: '#2C2C2C' }}>
                      {selectedColor}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666' }}>
                      Design Areas:
                    </span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '600', color: '#2C2C2C' }}>
                      {designs.length}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666' }}>
                      Total Quantity:
                    </span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '600', color: '#044c5c' }}>
                      {totalQuantity} units
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Estimate */}
              {totalQuantity > 0 && designs.length > 0 && (
                <div style={{ 
                  backgroundColor: '#044c5c', 
                  color: '#FFFFFF',
                  borderRadius: '0px',
                  padding: '24px',
                }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', opacity: 0.9 }}>
                    Price Estimate
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', opacity: 0.9 }}>
                        Per Unit:
                      </span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '600' }}>
                        ${pricing.unitPrice.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', opacity: 0.9 }}>
                        Setup Fees:
                      </span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '600' }}>
                        ${pricing.setupTotal.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '12px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '600' }}>
                        Total:
                      </span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '700' }}>
                        ${pricing.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    fontFamily: 'Inter, sans-serif',
                    opacity: 0.8,
                    lineHeight: '1.5',
                  }}>
                    * Final price may vary based on artwork complexity and final order details
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Configuration */}
          <div>
            {/* Color Selection */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '32px', 
              borderRadius: '0px',
              border: '1px solid #E8DDD3',
              marginBottom: '24px',
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: '600', color: '#2C2C2C', marginBottom: '4px' }}>
                  1. Select T-Shirt Color
                </h2>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                  Choose from our premium 100% cotton t-shirts
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '16px' }}>
                {tshirtColors.map(color => (
                  <div
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{
                      width: '100%',
                      aspectRatio: '1',
                      backgroundColor: color.hex,
                      border: color.border ? '2px solid #E8DDD3' : 'none',
                      borderRadius: '0px',
                      marginBottom: '8px',
                      outline: selectedColor === color.name ? '3px solid #044c5c' : 'none',
                      outlineOffset: '3px',
                      transition: 'all 0.2s',
                    }} />
                    <div style={{ 
                      fontFamily: 'Inter, sans-serif', 
                      fontSize: '12px', 
                      color: selectedColor === color.name ? '#044c5c' : '#666',
                      fontWeight: selectedColor === color.name ? '600' : '400',
                    }}>
                      {color.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size & Quantity */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '32px', 
              borderRadius: '0px',
              border: '1px solid #E8DDD3',
              marginBottom: '24px',
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: '600', color: '#2C2C2C', marginBottom: '4px' }}>
                  2. Enter Quantities by Size
                </h2>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                  Minimum order: 6 units • Volume discounts available at 50+ units
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {sizes.map(size => (
                  <div key={size}>
                    <label style={{ 
                      fontFamily: 'Poppins, sans-serif', 
                      fontSize: '13px', 
                      fontWeight: '600', 
                      color: '#2C2C2C',
                      display: 'block',
                      marginBottom: '6px',
                    }}>
                      {size}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={quantities[size] || ''}
                      onChange={(e) => handleQuantityChange(size, e.target.value)}
                      placeholder="0"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #E8DDD3',
                        borderRadius: '0px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: '600',
                        textAlign: 'center',
                        color: '#2C2C2C',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ 
                marginTop: '16px', 
                padding: '12px 16px',
                backgroundColor: '#F7F8FA',
                borderRadius: '0px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                  Total Quantity:
                </span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '700', color: '#044c5c' }}>
                  {totalQuantity} units
                </span>
              </div>
            </div>

            {/* Design Areas */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '32px', 
              borderRadius: '0px',
              border: '1px solid #E8DDD3',
              marginBottom: '24px',
            }}>
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: '600', color: '#2C2C2C', marginBottom: '4px' }}>
                    3. Add Design Areas
                  </h2>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                    Configure printing for each area of the shirt
                  </p>
                </div>
                <button
                  onClick={addDesignArea}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: '#044c5c',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '0px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <Plus size={18} />
                  Add Area
                </button>
              </div>

              {designs.length === 0 ? (
                <div style={{ 
                  padding: '60px 32px',
                  textAlign: 'center',
                  backgroundColor: '#F7F8FA',
                  borderRadius: '0px',
                  border: '2px dashed #E8DDD3',
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>👕</div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '600', color: '#2C2C2C', marginBottom: '8px' }}>
                    No design areas yet
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                    Click "Add Area" to start designing your custom t-shirt
                  </p>
                  <button
                    onClick={addDesignArea}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: '#d41c5c',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '0px',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={18} />
                    Add Your First Design Area
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {designs.map((design, index) => (
                    <div
                      key={index}
                      style={{
                        border: activeDesign === index ? '2px solid #044c5c' : '1px solid #E8DDD3',
                        borderRadius: '0px',
                        backgroundColor: activeDesign === index ? '#F0F9FF' : '#FFFFFF',
                        transition: 'all 0.2s',
                      }}
                    >
                      {/* Design Header */}
                      <div
                        onClick={() => setActiveDesign(activeDesign === index ? null : index)}
                        style={{
                          padding: '20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '0px',
                            backgroundColor: '#C8956C',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '16px',
                            fontWeight: '700',
                          }}>
                            {index + 1}
                          </div>
                          <div>
                            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '600', color: '#2C2C2C', marginBottom: '2px' }}>
                              {designAreas.find(a => a.id === design.area)?.name}
                            </div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                              {printMethods.find(m => m.id === design.method)?.name} • {design.colors} color{design.colors > 1 ? 's' : ''}
                              {design.fileName && ' • File uploaded'}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeDesign(index);
                            }}
                            style={{
                              padding: '8px',
                              backgroundColor: 'transparent',
                              color: '#DC2626',
                              border: '1px solid #DC2626',
                              borderRadius: '0px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                          <ChevronDown
                            size={20}
                            style={{
                              color: '#666',
                              transform: activeDesign === index ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s',
                            }}
                          />
                        </div>
                      </div>

                      {/* Design Configuration */}
                      {activeDesign === index && (
                        <div style={{ padding: '0 20px 20px 20px' }}>
                          <div style={{ height: '1px', backgroundColor: '#E8DDD3', marginBottom: '20px' }} />

                          {/* Select Area */}
                          <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontSize: '12px', 
                              fontWeight: '600', 
                              color: '#666',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              display: 'block',
                              marginBottom: '10px',
                            }}>
                              Design Area
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                              {designAreas.map(area => (
                                <div
                                  key={area.id}
                                  onClick={() => updateDesign(index, { area: area.id })}
                                  style={{
                                    padding: '12px',
                                    border: design.area === area.id ? '2px solid #044c5c' : '1px solid #E8DDD3',
                                    borderRadius: '0px',
                                    backgroundColor: design.area === area.id ? '#E6F2F5' : '#FFFFFF',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                  }}
                                >
                                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C', marginBottom: '2px' }}>
                                    {area.name}
                                  </div>
                                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666', marginBottom: '4px' }}>
                                    {area.description}
                                  </div>
                                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#C8956C', fontWeight: '600' }}>
                                    Max: {area.maxSize}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Print Method */}
                          <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontSize: '12px', 
                              fontWeight: '600', 
                              color: '#666',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              display: 'block',
                              marginBottom: '10px',
                            }}>
                              Printing Method
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                              {printMethods.map(method => (
                                <div
                                  key={method.id}
                                  onClick={() => updateDesign(index, { method: method.id })}
                                  style={{
                                    padding: '16px',
                                    border: design.method === method.id ? '2px solid #044c5c' : '1px solid #E8DDD3',
                                    borderRadius: '0px',
                                    backgroundColor: design.method === method.id ? '#E6F2F5' : '#FFFFFF',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'all 0.2s',
                                  }}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C' }}>
                                      {method.name}
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMethodInfo(showMethodInfo === method.id ? null : method.id);
                                      }}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0',
                                        color: '#C8956C',
                                      }}
                                    >
                                      <Info size={16} />
                                    </button>
                                  </div>
                                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666', marginBottom: '8px', lineHeight: '1.4' }}>
                                    {method.description}
                                  </div>
                                  <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontFamily: 'Inter, sans-serif', color: '#666' }}>
                                    <span>Min: {method.minQty}</span>
                                    <span>•</span>
                                    <span>Setup: ${method.setupFee}</span>
                                  </div>
                                  {showMethodInfo === method.id && (
                                    <div style={{
                                      position: 'absolute',
                                      top: '100%',
                                      left: '0',
                                      right: '0',
                                      marginTop: '8px',
                                      padding: '12px',
                                      backgroundColor: '#2C2C2C',
                                      color: '#FFFFFF',
                                      borderRadius: '0px',
                                      fontSize: '11px',
                                      fontFamily: 'Inter, sans-serif',
                                      lineHeight: '1.5',
                                      zIndex: 10,
                                    }}>
                                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>Price Details:</div>
                                      <div>Setup Fee: ${method.setupFee}</div>
                                      <div>Per Color: ${method.pricePerColor}/unit</div>
                                      <div>Min Qty: {method.minQty} units</div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Number of Colors */}
                          <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontSize: '12px', 
                              fontWeight: '600', 
                              color: '#666',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              display: 'block',
                              marginBottom: '10px',
                            }}>
                              Number of Colors
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <button
                                  key={num}
                                  onClick={() => updateDesign(index, { colors: num })}
                                  style={{
                                    flex: 1,
                                    padding: '12px',
                                    backgroundColor: design.colors === num ? '#044c5c' : '#FFFFFF',
                                    color: design.colors === num ? '#FFFFFF' : '#2C2C2C',
                                    border: design.colors === num ? 'none' : '1px solid #E8DDD3',
                                    borderRadius: '0px',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                  }}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                            <div style={{ 
                              marginTop: '8px',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '11px',
                              color: '#666',
                            }}>
                              {design.method === 'dtg' ? 'DTG supports unlimited colors (full color)' : `+$${(design.colors * (printMethods.find(m => m.id === design.method)?.pricePerColor || 0)).toFixed(2)} per unit`}
                            </div>
                          </div>

                          {/* File Upload */}
                          <div>
                            <label style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontSize: '12px', 
                              fontWeight: '600', 
                              color: '#666',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              display: 'block',
                              marginBottom: '10px',
                            }}>
                              Upload Design File
                            </label>
                            <label
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                padding: '32px',
                                border: design.fileName ? '2px solid #16A34A' : '2px dashed #E8DDD3',
                                borderRadius: '0px',
                                backgroundColor: design.fileName ? '#F0FDF4' : '#F7F8FA',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                            >
                              <Upload size={32} color={design.fileName ? '#16A34A' : '#C8956C'} />
                              <div style={{ textAlign: 'center' }}>
                                {design.fileName ? (
                                  <>
                                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#16A34A', marginBottom: '4px' }}>
                                      ✓ File Uploaded
                                    </div>
                                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                                      {design.fileName}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C', marginBottom: '4px' }}>
                                      Click to upload or drag & drop
                                    </div>
                                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                                      PNG, JPG, AI, EPS, PDF (max 25MB)
                                    </div>
                                  </>
                                )}
                              </div>
                              <input
                                type="file"
                                accept=".png,.jpg,.jpeg,.ai,.eps,.pdf,.svg"
                                onChange={(e) => handleFileUpload(index, e.target.files?.[0])}
                                style={{ display: 'none' }}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '32px', 
              borderRadius: '0px',
              border: '1px solid #E8DDD3',
              position: 'sticky',
              bottom: '24px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <button
                  disabled={totalQuantity < 6 || designs.length === 0}
                  style={{
                    padding: '16px',
                    backgroundColor: (totalQuantity < 6 || designs.length === 0) ? '#E8DDD3' : '#044c5c',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '0px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (totalQuantity < 6 || designs.length === 0) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Add to Cart
                </button>
                <button
                  disabled={totalQuantity < 6 || designs.length === 0}
                  style={{
                    padding: '16px',
                    backgroundColor: 'transparent',
                    color: (totalQuantity < 6 || designs.length === 0) ? '#C8C8C8' : '#d41c5c',
                    border: `2px solid ${(totalQuantity < 6 || designs.length === 0) ? '#E8DDD3' : '#d41c5c'}`,
                    borderRadius: '0px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (totalQuantity < 6 || designs.length === 0) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Request Quote
                </button>
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#FFB020',
                  color: '#2C2C2C',
                  border: 'none',
                  borderRadius: '0px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>📄</span>
                Download Spec Sheet
              </button>
              {(totalQuantity < 6 || designs.length === 0) && (
                <div style={{ 
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: '#FFF8E1',
                  borderRadius: '0px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#2C2C2C',
                  textAlign: 'center',
                }}>
                  {totalQuantity < 6 && '⚠️ Minimum order quantity is 6 units'}
                  {totalQuantity < 6 && designs.length === 0 && ' • '}
                  {designs.length === 0 && '⚠️ Add at least one design area'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
