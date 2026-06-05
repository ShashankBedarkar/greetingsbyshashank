import { useState } from 'react';
import { Package, FileText, Download, Send, CheckCircle, Users, Building2, Mail, Phone, HelpCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const bulkBenefits = [
  {
    icon: Package,
    title: 'Volume Discounts',
    description: 'Save up to 40% on large orders with tiered pricing',
  },
  {
    icon: Users,
    title: 'Corporate Accounts',
    description: 'Dedicated account manager for business clients',
  },
  {
    icon: FileText,
    title: 'Custom Branding',
    description: 'Add your company logo and branding to cards',
  },
  {
    icon: Download,
    title: 'Digital Proofs',
    description: 'Free digital proof approval before printing',
  },
];

const pricingTiers = [
  { quantity: '50-99', discount: '10% off' },
  { quantity: '100-249', discount: '20% off' },
  { quantity: '250-499', discount: '30% off' },
  { quantity: '500+', discount: '40% off' },
];

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    budget: '',
    occasion: '',
    message: '',
    needDesign: false,
    needEnvelope: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-1 mb-4">Bulk Orders</h1>
            <p className="text-xl text-white/90 mb-6">
              Planning a large event or corporate campaign? Get special pricing for bulk orders with dedicated support and fast turnaround times.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <CheckCircle className="w-5 h-5" />
                <span>No minimum order</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free shipping over $100</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <CheckCircle className="w-5 h-5" />
                <span>24-hour turnaround available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bulkBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-secondary-900 dark:text-secondary-100">{benefit.title}</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Tiers */}
        <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-sm mb-12">
          <h2 className="heading-3 mb-6 text-center">Volume Pricing</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-secondary-50 dark:bg-secondary-900">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">{tier.quantity}</p>
                <p className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">{tier.discount}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-secondary-500 dark:text-secondary-400 mt-4">
            Contact us for custom pricing on orders over 1000 cards
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Inquiry Form */}
          <div>
            <h2 className="heading-3 mb-6">Request a Quote</h2>

            {submitted ? (
              <div className="bg-success-50 dark:bg-success-950/30 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-success-500 mx-auto mb-4 flex items-center justify-center">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-success-700 dark:text-success-400">Quote Request Submitted!</h3>
                <p className="text-success-600 dark:text-success-500">
                  Our team will review your request and get back to you within 24 hours with a custom quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (234) 567-890"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Quantity Needed
                    </label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="input"
                      required
                    >
                      <option value="">Select quantity</option>
                      <option value="50-99">50-99 cards</option>
                      <option value="100-249">100-249 cards</option>
                      <option value="250-499">250-499 cards</option>
                      <option value="500-999">500-999 cards</option>
                      <option value="1000+">1000+ cards</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Approximate Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="input"
                      required
                    >
                      <option value="">Select budget</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Occasion/Event Type
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="input"
                    required
                  >
                    <option value="">Select occasion</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="holiday">Holiday Cards</option>
                    <option value="wedding">Wedding Invitations</option>
                    <option value="birthday">Birthday Cards</option>
                    <option value="thankyou">Thank You Cards</option>
                    <option value="custom">Custom Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input resize-none"
                    rows={4}
                    placeholder="Describe your project, design preferences, timeline, etc."
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="needDesign"
                      checked={formData.needDesign}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-secondary-700 dark:text-secondary-300">I need design assistance</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="needEnvelope"
                      checked={formData.needEnvelope}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-secondary-700 dark:text-secondary-300">Include envelopes</span>
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full" rightIcon={<Send className="w-5 h-5" />}>
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* CSV Upload */}
          <div>
            <h2 className="heading-3 mb-6">CSV Upload</h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Have a list of recipients? Upload a CSV file and we'll handle the addressing and mailing for you.
            </p>

            <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-600 rounded-2xl p-8 text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold mb-2 text-secondary-900 dark:text-secondary-100">Upload CSV File</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                Drag and drop your CSV file here or click to browse
              </p>
              <button className="px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
                Choose File
              </button>
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-primary-500" />
                Download Template
              </h4>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                Download our CSV template to ensure your file is formatted correctly.
              </p>
              <Button variant="outline" size="sm">
                Download CSV Template
              </Button>
            </div>

            <div className="mt-8 bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary-500" />
                Need Help?
              </h4>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                Our team is ready to assist you with your bulk order.
              </p>
              <div className="space-y-2">
                <a href="mailto:bulk@greetingsbyshashank.com" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline">
                  <Mail className="w-4 h-4" />
                  bulk@greetingsbyshashank.com
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline">
                  <Phone className="w-4 h-4" />
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
