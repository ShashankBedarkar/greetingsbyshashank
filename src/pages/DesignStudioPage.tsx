import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Type,
  Image,
  Shapes,
  Palette,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Save,
  Sparkles,
  ShoppingCart,
  Layers,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Move,
  Trash2,
  QrCode,
  Eye,
  Grid3X3,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useCart } from '../contexts/CartContext';

interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'sticker';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  rotation?: number;
  opacity?: number;
  borderRadius?: number;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const fonts = [
  'Inter',
  'Poppins',
  'Dancing Script',
  'Georgia',
  'Playfair Display',
  'Roboto',
  'Open Sans',
  'Montserrat',
];

const stickers = [
  { id: '1', emoji: '❤️', name: 'Heart' },
  { id: '2', emoji: '🎉', name: 'Party' },
  { id: '3', emoji: '🎂', name: 'Cake' },
  { id: '4', emoji: '🎁', name: 'Gift' },
  { id: '5', emoji: '✨', name: 'Sparkles' },
  { id: '6', emoji: '🌟', name: 'Star' },
  { id: '7', emoji: '🎈', name: 'Balloon' },
  { id: '8', emoji: '🌸', name: 'Flower' },
];

const shapes = [
  { id: '1', name: 'Rectangle', style: 'rounded-lg' },
  { id: '2', name: 'Circle', style: 'rounded-full' },
  { id: '3', name: 'Square', style: 'rounded-md' },
];

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8B500', '#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9',
];

const templates = [
  {
    id: '1',
    name: 'Birthday Classic',
    preview: 'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Birthday',
  },
  {
    id: '2',
    name: 'Elegant Wedding',
    preview: 'https://images.pexels.com/photos/1704088/pexels-photo-1704088.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Wedding',
  },
  {
    id: '3',
    name: 'Floral Thank You',
    preview: 'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Thank You',
  },
];

export default function DesignStudioPage() {
  const { addToCart } = useCart();
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'shapes' | 'stickers'>('text');
  const [showGrid, setShowGrid] = useState(false);
  const [cardSide, setCardSide] = useState<'front' | 'inside-left' | 'inside-right' | 'back'>('front');
  const [history, setHistory] = useState<DesignElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedMessages, setGeneratedMessages] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedElementData = elements.find(el => el.id === selectedElement);

  const addElement = (type: DesignElement['type'], defaultProps: Partial<DesignElement> = {}) => {
    const newElement: DesignElement = {
      id: crypto.randomUUID(),
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 50 : 100,
      content: type === 'text' ? 'Your Text Here' : undefined,
      fontSize: 24,
      fontFamily: 'Dancing Script',
      color: '#1e293b',
      rotation: 0,
      opacity: 1,
      ...defaultProps,
    };

    const newElements = [...elements, newElement];
    saveToHistory(newElements);
    setElements(newElements);
    setSelectedElement(newElement.id);
  };

  const saveToHistory = (newElements: DesignElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, ...updates } : el
    );
    saveToHistory(newElements);
    setElements(newElements);
  };

  const deleteElement = (id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    saveToHistory(newElements);
    setElements(newElements);
    setSelectedElement(null);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedElement(null);
    }
  };

  const generateAIMessages = () => {
    setGeneratedMessages([
      "May your special day be filled with love, laughter, and all the happiness your heart can hold. Happy Birthday!",
      "Wishing you a year ahead filled with new adventures, endless joy, and dreams come true!",
      "On your birthday, I wish you all the magic in the world. May every moment be as special as you are!",
      "Here's to celebrating YOU today and every day! May this year bring you closer to your dreams.",
      "Happy Birthday to someone who makes the world brighter just by being in it!",
    ]);
  };

  const addGeneratedMessage = (message: string) => {
    addElement('text', {
      content: message,
      fontSize: 20,
      fontFamily: 'Dancing Script',
      color: '#be185d',
      width: 250,
    });
    setShowAIModal(false);
    setGeneratedMessages([]);
    setAiPrompt('');
  };

  const handleAddToCart = async () => {
    await addToCart({
      id: 'custom-' + crypto.randomUUID(),
      name: 'Custom Greeting Card',
      price: 12.99,
      image: 'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=800',
    }, 1);
  };

  return (
    <div className="min-h-screen bg-secondary-100 dark:bg-secondary-900 pt-20">
      {/* Top Toolbar */}
      <div className="fixed top-20 left-0 right-0 z-30 bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-4 py-2">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/shop">
              <Button variant="ghost" size="sm">
                Back to Shop
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border-r border-secondary-300 dark:border-secondary-600 pr-4">
              <button onClick={undo} disabled={historyIndex === 0} className="btn-icon disabled:opacity-50">
                <Undo2 className="w-4 h-4" />
              </button>
              <button onClick={redo} disabled={historyIndex === history.length - 1} className="btn-icon disabled:opacity-50">
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-secondary-300 dark:border-secondary-600 pr-4">
              <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="btn-icon">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="w-16 text-center text-sm">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="btn-icon">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={() => setZoom(100)} className="btn-icon">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`btn-icon ${showGrid ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : ''}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>

            <Layers className="w-4 h-4 text-secondary-400" />

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" leftIcon={<Save className="w-4 h-4" />}>
                Save
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Export
              </Button>
              <Button size="sm" leftIcon={<ShoppingCart className="w-4 h-4" />} onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-5rem)] pt-12">
        {/* Left Sidebar - Tools */}
        <div className="w-72 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 flex flex-col">
          {/* Card Side Selector */}
          <div className="p-4 border-b border-secondary-200 dark:border-secondary-700">
            <p className="text-sm font-medium mb-3 text-secondary-700 dark:text-secondary-300">Card Side</p>
            <div className="grid grid-cols-2 gap-2">
              {(['front', 'inside-left', 'inside-right', 'back'] as const).map((side) => (
                <button
                  key={side}
                  onClick={() => setCardSide(side)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    cardSide === side
                      ? 'bg-primary-500 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                  }`}
                >
                  {side.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-secondary-200 dark:border-secondary-700">
            {(['text', 'image', 'shapes', 'stickers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'text' && (
              <div className="space-y-4">
                <Button onClick={() => addElement('text')} className="w-full">
                  <Type className="w-4 h-4 mr-2" /> Add Text
                </Button>
                <Button onClick={() => setShowAIModal(true)} variant="outline" className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" /> AI Message Generator
                </Button>

                {selectedElementData?.type === 'text' && (
                  <div className="space-y-4 pt-4 border-t border-secondary-200 dark:border-secondary-700 mt-4">
                    <div>
                      <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300 block mb-2">
                        Font Family
                      </label>
                      <select
                        value={selectedElementData.fontFamily}
                        onChange={(e) => updateElement(selectedElementData.id, { fontFamily: e.target.value })}
                        className="input text-sm"
                      >
                        {fonts.map(font => (
                          <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300 block mb-2">
                        Font Size: {selectedElementData.fontSize}px
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="72"
                        value={selectedElementData.fontSize}
                        onChange={(e) => updateElement(selectedElementData.id, { fontSize: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300 block mb-2">
                        Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {colors.map(color => (
                          <button
                            key={color}
                            onClick={() => updateElement(selectedElementData.id, { color })}
                            className={`w-8 h-8 rounded-lg border-2 ${
                              selectedElementData.color === color ? 'border-primary-500' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateElement(selectedElementData.id, {
                          fontWeight: selectedElementData.fontWeight === 'bold' ? 'normal' : 'bold'
                        })}
                        className={`flex-1 p-2 rounded-lg border ${
                          selectedElementData.fontWeight === 'bold'
                            ? 'bg-primary-100 dark:bg-primary-900/30 border-primary-500'
                            : 'border-secondary-300 dark:border-secondary-600'
                        }`}
                      >
                        <Bold className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => updateElement(selectedElementData.id, {
                          fontStyle: selectedElementData.fontStyle === 'italic' ? 'normal' : 'italic'
                        })}
                        className={`flex-1 p-2 rounded-lg border ${
                          selectedElementData.fontStyle === 'italic'
                            ? 'bg-primary-100 dark:bg-primary-900/30 border-primary-500'
                            : 'border-secondary-300 dark:border-secondary-600'
                        }`}
                      >
                        <Italic className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => updateElement(selectedElementData.id, { textAlign: 'left' })}
                        className={`flex-1 p-2 rounded-lg border ${
                          selectedElementData.textAlign === 'left'
                            ? 'bg-primary-100 dark:bg-primary-900/30 border-primary-500'
                            : 'border-secondary-300 dark:border-secondary-600'
                        }`}
                      >
                        <AlignLeft className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => updateElement(selectedElementData.id, { textAlign: 'center' })}
                        className={`flex-1 p-2 rounded-lg border ${
                          selectedElementData.textAlign === 'center' || !selectedElementData.textAlign
                            ? 'bg-primary-100 dark:bg-primary-900/30 border-primary-500'
                            : 'border-secondary-300 dark:border-secondary-600'
                        }`}
                      >
                        <AlignCenter className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => updateElement(selectedElementData.id, { textAlign: 'right' })}
                        className={`flex-1 p-2 rounded-lg border ${
                          selectedElementData.textAlign === 'right'
                            ? 'bg-primary-100 dark:bg-primary-900/30 border-primary-500'
                            : 'border-secondary-300 dark:border-secondary-600'
                        }`}
                      >
                        <AlignRight className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'image' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-600 rounded-xl p-8 text-center">
                  <Image className="w-12 h-12 mx-auto mb-3 text-secondary-400" />
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                    Drag and drop an image or
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors">
                    Browse Files
                  </button>
                </div>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 text-center">
                  Supports JPG, PNG, SVG, WebP
                </p>
              </div>
            )}

            {activeTab === 'shapes' && (
              <div className="grid grid-cols-2 gap-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => addElement('shape', {
                      backgroundColor: color,
                      borderRadius: 8,
                    })}
                    className="aspect-square rounded-lg border border-secondary-200 dark:border-secondary-700 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}

            {activeTab === 'stickers' && (
              <div className="grid grid-cols-4 gap-3">
                {stickers.map(sticker => (
                  <button
                    key={sticker.id}
                    onClick={() => addElement('sticker', {
                      content: sticker.emoji,
                      width: 60,
                      height: 60,
                    })}
                    className="aspect-square rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors text-3xl flex items-center justify-center"
                  >
                    {sticker.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-secondary-200 dark:bg-secondary-950 p-8">
          <div className="flex items-center justify-center min-h-full">
            <div
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="relative bg-white shadow-2xl transition-all duration-200"
              style={{
                width: `${5 * zoom / 100}in`,
                height: `${7 * zoom / 100}in`,
                backgroundImage: showGrid
                  ? 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)'
                  : undefined,
                backgroundSize: `${20 * zoom / 100}px ${20 * zoom / 100}px`,
              }}
            >
              {elements.map((element) => (
                <div
                  key={element.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(element.id);
                  }}
                  className={`absolute cursor-move ${
                    selectedElement === element.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  style={{
                    left: element.x * zoom / 100,
                    top: element.y * zoom / 100,
                    width: element.width * zoom / 100,
                    height: element.height * zoom / 100,
                    transform: `rotate(${element.rotation || 0}deg)`,
                    opacity: element.opacity || 1,
                    fontFamily: element.fontFamily,
                    fontSize: (element.fontSize || 16) * zoom / 100,
                    fontWeight: element.fontWeight,
                    fontStyle: element.fontStyle,
                    textAlign: element.textAlign,
                    color: element.color,
                    backgroundColor: element.backgroundColor,
                    borderRadius: element.borderRadius,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start',
                    padding: element.type === 'text' ? '8px' : 0,
                  }}
                >
                  {element.type === 'text' && (
                    <textarea
                      value={element.content}
                      onChange={(e) => updateElement(element.id, { content: e.target.value })}
                      className="w-full h-full bg-transparent resize-none outline-none"
                      style={{
                        fontFamily: element.fontFamily,
                        fontSize: (element.fontSize || 16) * zoom / 100,
                        fontWeight: element.fontWeight,
                        fontStyle: element.fontStyle,
                        color: element.color,
                      }}
                    />
                  )}
                  {element.type === 'sticker' && (
                    <span style={{ fontSize: (element.fontSize || 40) * zoom / 100 }}>
                      {element.content}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties & Templates */}
        <div className="w-72 bg-white dark:bg-secondary-800 border-l border-secondary-200 dark:border-secondary-700 flex flex-col">
          <div className="p-4 border-b border-secondary-200 dark:border-secondary-700">
            <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">Templates</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {templates.map(template => (
              <button
                key={template.id}
                className="w-full rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all"
              >
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full aspect-greeting-card object-cover"
                />
                <div className="p-2 bg-secondary-50 dark:bg-secondary-900">
                  <p className="text-sm font-medium text-left">{template.name}</p>
                  <p className="text-xs text-secondary-500 text-left">{template.category}</p>
                </div>
              </button>
            ))}
          </div>

          {selectedElementData && (
            <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">Properties</h3>
                <button
                  onClick={() => deleteElement(selectedElementData.id)}
                  className="p-2 rounded-lg hover:bg-error-50 dark:hover:bg-error-950/30 text-error-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-secondary-600 dark:text-secondary-400">X</label>
                    <input
                      type="number"
                      value={selectedElementData.x}
                      onChange={(e) => updateElement(selectedElementData.id, { x: Number(e.target.value) })}
                      className="input text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-secondary-600 dark:text-secondary-400">Y</label>
                    <input
                      type="number"
                      value={selectedElementData.y}
                      onChange={(e) => updateElement(selectedElementData.id, { y: Number(e.target.value) })}
                      className="input text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-secondary-600 dark:text-secondary-400">Width</label>
                    <input
                      type="number"
                      value={selectedElementData.width}
                      onChange={(e) => updateElement(selectedElementData.id, { width: Number(e.target.value) })}
                      className="input text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-secondary-600 dark:text-secondary-400">Height</label>
                    <input
                      type="number"
                      value={selectedElementData.height}
                      onChange={(e) => updateElement(selectedElementData.id, { height: Number(e.target.value) })}
                      className="input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-secondary-600 dark:text-secondary-400">Rotation: {selectedElementData.rotation || 0}°</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={selectedElementData.rotation || 0}
                    onChange={(e) => updateElement(selectedElementData.id, { rotation: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-xs text-secondary-600 dark:text-secondary-400">Opacity: {Math.round((selectedElementData.opacity || 1) * 100)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(selectedElementData.opacity || 1) * 100}
                    onChange={(e) => updateElement(selectedElementData.id, { opacity: Number(e.target.value) / 100 })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
            <Button variant="outline" className="w-full" leftIcon={<QrCode className="w-4 h-4" />}>
              Add QR Code
            </Button>
          </div>
        </div>
      </div>

      {/* AI Message Generator Modal */}
      <Modal isOpen={showAIModal} onClose={() => setShowAIModal(false)} title="AI Message Generator" size="lg">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300 block mb-2">
              Occasion
            </label>
            <select className="input">
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Wedding</option>
              <option>Graduation</option>
              <option>Baby Shower</option>
              <option>Thank You</option>
              <option>Sympathy</option>
              <option>Holiday</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300 block mb-2">
              Tone
            </label>
            <select className="input">
              <option>Funny</option>
              <option>Emotional</option>
              <option>Romantic</option>
              <option>Formal</option>
              <option>Professional</option>
              <option>Inspirational</option>
              <option>Friendly</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300 block mb-2">
              Additional Details (optional)
            </label>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., For my best friend who loves dogs..."
              className="input resize-none"
              rows={3}
            />
          </div>

          <Button onClick={generateAIMessages} className="w-full" leftIcon={<Sparkles className="w-4 h-4" />}>
            Generate Messages
          </Button>

          {generatedMessages.length > 0 && (
            <div className="space-y-3 pt-4">
              <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Generated Messages
              </p>
              {generatedMessages.map((message, idx) => (
                <button
                  key={idx}
                  onClick={() => addGeneratedMessage(message)}
                  className="w-full text-left p-4 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-colors"
                >
                  <p className="text-sm text-secondary-700 dark:text-secondary-300">{message}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
