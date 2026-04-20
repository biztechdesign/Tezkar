import { useState } from 'react';
import { Upload, Download, Check } from 'lucide-react';

type PrintArea = 'leftChest' | 'fullFront' | 'fullBack' | 'rightChest' | 'leftSleeve' | 'rightSleeve';
type PrintMethod = 'screenPrint' | 'dtg' | 'heatTransfer' | 'embroidery';
type InkColors = 1 | 2 | 3 | 4 | 'full';

interface PrintConfig {
  method: PrintMethod;
  inkColors: InkColors;
  printSize: string;
  uploadedFile?: File;
}

const colors = [
  { name: 'White', hex: '#FFFFFF', border: true },
  { name: 'Black', hex: '#000000' },
  { name: 'Navy', hex: '#1E40AF' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Orange', hex: '#EA580C' },
  { name: 'Purple', hex: '#9333EA' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Gray', hex: '#9CA3AF' },
  { name: 'Brown', hex: '#78350F' },
  { name: 'Teal', hex: '#14B8A6' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

const printAreas = [
  { id: 'leftChest' as PrintArea, name: 'Left Chest', icon: '👕' },
  { id: 'fullFront' as PrintArea, name: 'Full Front', icon: '👕' },
  { id: 'fullBack' as PrintArea, name: 'Full Back', icon: '👕' },
  { id: 'rightChest' as PrintArea, name: 'Right Chest', icon: '👕' },
  { id: 'leftSleeve' as PrintArea, name: 'Left Sleeve', icon: '💪' },
  { id: 'rightSleeve' as PrintArea, name: 'Right Sleeve', icon: '💪' },
];

const printMethods = [
  { id: 'screenPrint' as PrintMethod, name: 'Screen Print', color: '#044c5c' },
  { id: 'dtg' as PrintMethod, name: 'DTG', color: '#d41c5c' },
  { id: 'heatTransfer' as PrintMethod, name: 'Heat Transfer', color: '#C8956C' },
  { id: 'embroidery' as PrintMethod, name: 'Embroidery', color: '#2C2C2C' },
];

const inkColorOptions = [
  { value: 1, label: '1 Color', colors: ['●'] },
  { value: 2, label: '2 Colors', colors: ['●', '●'] },
  { value: 3, label: '3 Colors', colors: ['●', '●', '●'] },
  { value: 4, label: '4 Colors', colors: ['●', '●', '●', '●'] },
  { value: 'full', label: 'Full', colors: ['🌈'] },
];

const bulkPricing = [
  { range: '12 - 49', price: 14.99, discount: null },
  { range: '50 - 99', price: 12.49, discount: '17%' },
  { range: '100 - 249', price: 10.99, discount: '27%' },
  { range: '250 - 499', price: 9.49, discount: '37%' },
  { range: '500+', price: 8.99, discount: '40%', badge: true },
];

const digitalFiles = [
  { id: 1, name: 'Product Spec Sheet', type: 'PDF', icon: '📄' },
  { id: 2, name: 'Branding Template', type: 'AI', icon: '📐' },
  { id: 3, name: 'Print Area Guide', type: 'PDF', icon: '📄' },
  { id: 4, name: 'Color Options Guide', type: 'PDF', icon: '📄' },
  { id: 5, name: 'Packaging Mockup', type: 'ZIP', icon: '📦' },
];

export function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState('White');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedAreas, setSelectedAreas] = useState<PrintArea[]>(['leftChest']);
  const [configuringArea, setConfiguringArea] = useState<PrintArea>('leftChest');
  const [printConfigs, setPrintConfigs] = useState<Record<PrintArea, PrintConfig>>({
    leftChest: { method: 'screenPrint', inkColors: 1, printSize: '200' },
    fullFront: { method: 'screenPrint', inkColors: 1, printSize: '200' },
    fullBack: { method: 'screenPrint', inkColors: 1, printSize: '200' },
    rightChest: { method: 'screenPrint', inkColors: 1, printSize: '200' },
    leftSleeve: { method: 'screenPrint', inkColors: 1, printSize: '100' },
    rightSleeve: { method: 'screenPrint', inkColors: 1, printSize: '100' },
  });

  const toggleArea = (area: PrintArea) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
      // If deselecting the currently configuring area, switch to another selected area
      if (configuringArea === area) {
        const remaining = selectedAreas.filter(a => a !== area);
        if (remaining.length > 0) {
          setConfiguringArea(remaining[0]);
        }
      }
    } else {
      setSelectedAreas([...selectedAreas, area]);
      setConfiguringArea(area);
    }
  };

  const updatePrintConfig = (area: PrintArea, updates: Partial<PrintConfig>) => {
    setPrintConfigs({
      ...printConfigs,
      [area]: { ...printConfigs[area], ...updates },
    });
  };

  const handleFileUpload = (area: PrintArea, file: File | undefined) => {
    updatePrintConfig(area, { uploadedFile: file });
  };

  const handleQuantityChange = (size: string, value: string) => {
    const num = parseInt(value) || 0;
    setQuantities({ ...quantities, [size]: num });
  };

  const totalQuantity = Object.values(quantities).reduce((sum, q) => sum + q, 0);

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <a href="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', textDecoration: 'none' }}>
            Home
          </a>
          <span style={{ color: '#666' }}>›</span>
          <a href="/category/apparel" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', textDecoration: 'none' }}>
            Apparel
          </a>
          <span style={{ color: '#666' }}>›</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C', fontWeight: '600' }}>
            Custom T-Shirt
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '48px' }}>
          {/* Left Column - Product Images */}
          <div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0px', overflow: 'hidden', marginBottom: '16px' }}>
              <img 
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop" 
                alt="Product" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ backgroundColor: '#FFFFFF', borderRadius: '0px', overflow: 'hidden', cursor: 'pointer' }}>
                  <img 
                    src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop&sig=${i}`}
                    alt={`Thumbnail ${i}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Configuration */}
          <div>
            {/* Product Header */}
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: '600', color: '#2C2C2C', marginBottom: '8px', lineHeight: '1.2' }}>
                Premium Custom T-Shirt
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#666', marginBottom: '16px', lineHeight: '1.5' }}>
                High-quality customizable t-shirt with multiple print options
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '600', color: '#044c5c' }}>
                  $14.99
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                  (Volume discounts available)
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Color:
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', marginLeft: '8px' }}>
                  {selectedColor}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: color.border ? '2px solid #E8DDD3' : selectedColor === color.name ? '3px solid #044c5c' : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: selectedColor === color.name ? '2px solid #044c5c' : 'none',
                      outlineOffset: '2px',
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes & Quantities */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Sizes & Quantities:
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                  Enter qty per size (min. 12 total)
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {sizes.map(size => (
                  <div key={size}>
                    <div style={{ 
                      fontFamily: 'Poppins, sans-serif', 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: '#2C2C2C', 
                      marginBottom: '4px',
                      textAlign: 'center'
                    }}>
                      {size}
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={quantities[size] || ''}
                      onChange={(e) => handleQuantityChange(size, e.target.value)}
                      placeholder="0"
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #E8DDD3',
                        borderRadius: '0px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        textAlign: 'center',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                Total qty across all sizes must be ≥ 12 — Volume discounts start at 50 units
              </div>
            </div>

            {/* Print Setup */}
            <div style={{ marginBottom: '32px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '0px', border: '1px solid #E8DDD3' }}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Print Setup:
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                  Configure each print area independently
                </span>
              </div>

              {/* Select Areas */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                  SELECT AREAS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {printAreas.map(area => (
                    <div
                      key={area.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        border: selectedAreas.includes(area.id) ? '2px solid #044c5c' : '1px solid #E8DDD3',
                        borderRadius: '0px',
                        backgroundColor: configuringArea === area.id ? '#F0F9FF' : '#FFFFFF',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#2C2C2C',
                        transition: 'all 0.2s',
                      }}
                      onClick={() => toggleArea(area.id)}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px' }}>{area.icon}</span>
                        <span>{area.name}</span>
                        {selectedAreas.includes(area.id) && (
                          <Check size={16} color="#044c5c" />
                        )}
                      </span>
                      {selectedAreas.includes(area.id) && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfiguringArea(area.id);
                          }}
                          style={{
                            padding: '4px 12px',
                            backgroundColor: configuringArea === area.id ? '#044c5c' : 'transparent',
                            color: configuringArea === area.id ? '#FFFFFF' : '#044c5c',
                            border: '1px solid #044c5c',
                            borderRadius: '0px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          Configure
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration for Selected Area */}
              {selectedAreas.includes(configuringArea) && (
                <div style={{ padding: '20px', backgroundColor: '#F7F8FA', borderRadius: '0px', border: '1px solid #E8DDD3' }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#044c5c', marginBottom: '20px' }}>
                    Configuring: {printAreas.find(a => a.id === configuringArea)?.name}
                  </div>

                  {/* Print Method */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      METHOD
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {printMethods.map(method => (
                        <button
                          key={method.id}
                          onClick={() => updatePrintConfig(configuringArea, { method: method.id })}
                          style={{
                            padding: '10px 20px',
                            backgroundColor: printConfigs[configuringArea].method === method.id ? method.color : '#FFFFFF',
                            color: printConfigs[configuringArea].method === method.id ? '#FFFFFF' : '#2C2C2C',
                            border: `1px solid ${method.color}`,
                            borderRadius: '0px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {method.name}
                        </button>
                      ))}
                    </div>
                    {printConfigs[configuringArea].method === 'embroidery' && (
                      <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666' }}>
                        Best for bulk orders with 1–4 spot colors
                      </div>
                    )}
                  </div>

                  {/* Ink Colors */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      INK COLORS
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {inkColorOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => updatePrintConfig(configuringArea, { inkColors: option.value as InkColors })}
                          style={{
                            padding: '10px 16px',
                            backgroundColor: printConfigs[configuringArea].inkColors === option.value ? '#044c5c' : '#FFFFFF',
                            color: printConfigs[configuringArea].inkColors === option.value ? '#FFFFFF' : '#2C2C2C',
                            border: '1px solid #E8DDD3',
                            borderRadius: '0px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                          }}
                        >
                          {option.colors.map((c, i) => <span key={i}>{c}</span>)}
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                    <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666' }}>
                      Each additional color increases price (~$1)
                    </div>
                  </div>

                  {/* Print Size */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      PRINT SIZE (CM²)
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['100', '200', '400', '800'].map(size => (
                        <button
                          key={size}
                          onClick={() => updatePrintConfig(configuringArea, { printSize: size })}
                          style={{
                            padding: '10px 20px',
                            backgroundColor: printConfigs[configuringArea].printSize === size ? '#044c5c' : '#FFFFFF',
                            color: printConfigs[configuringArea].printSize === size ? '#FFFFFF' : '#2C2C2C',
                            border: '1px solid #E8DDD3',
                            borderRadius: '0px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {size}
                        </button>
                      ))}
                      <input
                        type="text"
                        placeholder="Custom"
                        style={{
                          padding: '10px 20px',
                          border: '1px solid #E8DDD3',
                          borderRadius: '0px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '13px',
                          width: '100px',
                        }}
                      />
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666' }}>
                        ✦ Screen Print
                      </span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666' }}>
                        1 Color
                      </span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666' }}>
                        5" × 5"
                      </span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#044c5c', fontWeight: '600' }}>
                        Est. +$1.50/unit
                      </span>
                    </div>
                  </div>

                  {/* Upload Design */}
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      UPLOAD DESIGN
                    </div>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        padding: '20px',
                        border: '2px dashed #E8DDD3',
                        borderRadius: '0px',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Upload size={20} color="#044c5c" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C' }}>
                        {printConfigs[configuringArea].uploadedFile 
                          ? printConfigs[configuringArea].uploadedFile!.name
                          : 'Click to upload or drag & drop'}
                      </span>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.ai,.eps,.pdf"
                        onChange={(e) => handleFileUpload(configuringArea, e.target.files?.[0])}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666' }}>
                      Accepted: PNG, JPG, AI, EPS, PDF (max 10MB)
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#FFF8E1', borderRadius: '0px', border: '1px solid #FFD54F' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#2C2C2C' }}>
                  💡 Each location is configured independently. Pricing per location will be confirmed in your digital proof.
                </span>
              </div>
            </div>

            {/* Bulk Pricing */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Bulk Pricing:
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                  1-color screen print
                </span>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0px', border: '1px solid #E8DDD3', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #E8DDD3' }}>
                  <div style={{ padding: '12px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    QUANTITY
                  </div>
                  <div style={{ padding: '12px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    PER UNIT
                  </div>
                  <div style={{ padding: '12px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    YOU SAVE
                  </div>
                </div>
                {bulkPricing.map((tier, index) => (
                  <div 
                    key={index}
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr 1fr',
                      borderBottom: index < bulkPricing.length - 1 ? '1px solid #E8DDD3' : 'none',
                      backgroundColor: tier.badge ? '#E6F7F0' : '#FFFFFF',
                    }}
                  >
                    <div style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C' }}>
                      {tier.range}
                    </div>
                    <div style={{ padding: '12px 16px', fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '600', color: '#044c5c' }}>
                      ${tier.price}
                    </div>
                    <div style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: tier.discount ? '#16A34A' : '#666', fontWeight: tier.discount ? '600' : '400' }}>
                      {tier.discount ? tier.discount : '—'}
                      {tier.badge && (
                        <span style={{ 
                          marginLeft: '8px',
                          padding: '2px 8px',
                          backgroundColor: '#16A34A',
                          color: '#FFFFFF',
                          borderRadius: '0px',
                          fontSize: '10px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                        }}>
                          Save 40%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Files & Resources */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2C2C2C', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Digital Files & Resources
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {digitalFiles.map(file => (
                  <div 
                    key={file.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8DDD3',
                      borderRadius: '0px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '20px' }}>{file.icon}</span>
                      <div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C', fontWeight: '500' }}>
                          {file.name}
                        </div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                          {file.type}
                        </div>
                      </div>
                    </div>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: 'transparent',
                        color: '#044c5c',
                        border: '1px solid #044c5c',
                        borderRadius: '0px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                      }}
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#044c5c',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '0px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                🛒 + Cart
              </button>
              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: 'transparent',
                  color: '#d41c5c',
                  border: '2px solid #d41c5c',
                  borderRadius: '0px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                📋 Add to Quote
              </button>
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
                }}
              >
                ✨ Design It — Launch Customizer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}