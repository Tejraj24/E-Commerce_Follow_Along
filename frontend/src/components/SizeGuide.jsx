import React, { useState } from 'react';
import { FiX, FiRuler, FiInfo } from 'react-icons/fi';

const SizeGuide = ({ isOpen, onClose, gender = 'men' }) => {
  const [activeTab, setActiveTab] = useState('clothing');
  const [measurementType, setMeasurementType] = useState('inches');

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const menClothingSizes = {
    inches: {
      chest: { XS: '34-36', S: '36-38', M: '38-40', L: '40-42', XL: '42-44', XXL: '44-46' },
      waist: { XS: '28-30', S: '30-32', M: '32-34', L: '34-36', XL: '36-38', XXL: '38-40' },
      hips: { XS: '34-36', S: '36-38', M: '38-40', L: '40-42', XL: '42-44', XXL: '44-46' }
    },
    cm: {
      chest: { XS: '86-91', S: '91-97', M: '97-102', L: '102-107', XL: '107-112', XXL: '112-117' },
      waist: { XS: '71-76', S: '76-81', M: '81-86', L: '86-91', XL: '91-97', XXL: '97-102' },
      hips: { XS: '86-91', S: '91-97', M: '97-102', L: '102-107', XL: '107-112', XXL: '112-117' }
    }
  };

  const womenClothingSizes = {
    inches: {
      bust: { XS: '32-33', S: '34-35', M: '36-37', L: '38-39', XL: '40-41', XXL: '42-43' },
      waist: { XS: '24-25', S: '26-27', M: '28-29', L: '30-31', XL: '32-33', XXL: '34-35' },
      hips: { XS: '34-35', S: '36-37', M: '38-39', L: '40-41', XL: '42-43', XXL: '44-45' }
    },
    cm: {
      bust: { XS: '81-84', S: '86-89', M: '91-94', L: '97-99', XL: '102-104', XXL: '107-109' },
      waist: { XS: '61-64', S: '66-69', M: '71-74', L: '76-79', XL: '81-84', XXL: '86-89' },
      hips: { XS: '86-89', S: '91-94', M: '97-99', L: '102-104', XL: '107-109', XXL: '112-114' }
    }
  };

  const shoeSizes = {
    men: {
      US: { 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12', 13: '13' },
      UK: { 7: '6.5', 8: '7.5', 9: '8.5', 10: '9.5', 11: '10.5', 12: '11.5', 13: '12.5' },
      EU: { 7: '40', 8: '41', 9: '42', 10: '43', 11: '44', 12: '45', 13: '46' }
    },
    women: {
      US: { 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11' },
      UK: { 5: '3', 6: '4', 7: '5', 8: '6', 9: '7', 10: '8', 11: '9' },
      EU: { 5: '36', 6: '37', 7: '38', 8: '39', 9: '40', 10: '41', 11: '42' }
    }
  };

  const currentSizes = gender === 'men' ? menClothingSizes : womenClothingSizes;
  const currentShoeSizes = shoeSizes[gender];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiRuler size={24} className="text-gray-900" />
              <h2 className="text-2xl font-bold text-gray-900">Size Guide</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close size guide"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('clothing')}
              className={`pb-3 px-4 font-medium transition-colors border-b-2 ${
                activeTab === 'clothing' 
                  ? 'text-gray-900 border-gray-900' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Clothing
            </button>
            <button
              onClick={() => setActiveTab('shoes')}
              className={`pb-3 px-4 font-medium transition-colors border-b-2 ${
                activeTab === 'shoes' 
                  ? 'text-gray-900 border-gray-900' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Shoes
            </button>
          </div>

          {/* Measurement Type Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Measurements:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMeasurementType('inches')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  measurementType === 'inches' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setMeasurementType('cm')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  measurementType === 'cm' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Clothing Size Chart */}
          {activeTab === 'clothing' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {gender === 'men' ? 'Men' : 'Women'} Clothing Sizes ({measurementType})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium text-gray-700">Size</th>
                        <th className="text-left py-2 px-4 font-medium text-gray-700">
                          {gender === 'men' ? 'Chest' : 'Bust'}
                        </th>
                        <th className="text-left py-2 px-4 font-medium text-gray-700">Waist</th>
                        <th className="text-left py-2 px-4 font-medium text-gray-700">Hips</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <tr key={size} className="border-b border-gray-100">
                          <td className="py-2 px-4 font-medium text-gray-900">{size}</td>
                          <td className="py-2 px-4 text-gray-600">
                            {currentSizes[measurementType][gender === 'men' ? 'chest' : 'bust'][size]} {measurementType}
                          </td>
                          <td className="py-2 px-4 text-gray-600">
                            {currentSizes[measurementType].waist[size]} {measurementType}
                          </td>
                          <td className="py-2 px-4 text-gray-600">
                            {currentSizes[measurementType].hips[size]} {measurementType}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* How to Measure */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <FiInfo className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">How to Measure</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>Chest/Bust:</strong> Measure around the fullest part of your chest/bust</li>
                      <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
                      <li>• <strong>Hips:</strong> Measure around the fullest part of your hips</li>
                      <li>• For best results, use a flexible tape measure and keep it level</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shoe Size Chart */}
          {activeTab === 'shoes' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {gender === 'men' ? 'Men' : 'Women'} Shoe Sizes
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium text-gray-700">US</th>
                        <th className="text-left py-2 px-4 font-medium text-gray-700">UK</th>
                        <th className="text-left py-2 px-4 font-medium text-gray-700">EU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(currentShoeSizes.US).map(usSize => (
                        <tr key={usSize} className="border-b border-gray-100">
                          <td className="py-2 px-4 font-medium text-gray-900">{usSize}</td>
                          <td className="py-2 px-4 text-gray-600">{currentShoeSizes.US[usSize]}</td>
                          <td className="py-2 px-4 text-gray-600">{currentShoeSizes.EU[usSize]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shoe Measurement Tips */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <FiInfo className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Shoe Sizing Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Measure your feet in the afternoon when they're at their largest</li>
                      <li>• Stand on a piece of paper and trace your foot outline</li>
                      <li>• Measure the length from heel to longest toe</li>
                      <li>• If you're between sizes, size up for better comfort</li>
                      <li>• Consider the type of socks you'll wear with the shoes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Size Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Sizes may vary slightly between brands. This is a general guide. 
              For the most accurate fit, please refer to the specific brand's size chart when available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
