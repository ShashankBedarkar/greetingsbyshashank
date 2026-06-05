import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'hello@customgreetings.com',
    description: 'We\'ll respond within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+1 (234) 567-890',
    description: 'Mon-Fri 9am-6pm EST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '123 Greeting Lane, Card City, NY 10001',
    description: 'Our flagship store',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon - Sat: 9AM - 8PM',
    description: 'Sunday: 10AM - 6PM',
  },
];

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery. Overnight shipping is also available for next business day delivery.',
  },
  {
    question: 'Can I customize my card?',
    answer: 'Yes! All our cards are fully customizable. Use our design studio to add personal photos, custom text, and choose from hundreds of templates.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee on all orders. If you\'re not satisfied, contact us for a full refund or replacement.',
  },
  {
    question: 'Do you offer bulk discounts?',
    answer: 'Yes! We offer special pricing for bulk orders. Contact our sales team through the bulk orders page for a custom quote.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
      {/* Hero */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="heading-1 mb-4">Get in Touch</h1>
            <p className="text-body text-xl">
              Have a question or need help? We're here for you.
              Reach out and we'll respond as soon as we can.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-secondary-900 dark:text-secondary-100">{info.title}</h3>
                <p className="text-secondary-900 dark:text-secondary-100 font-medium mb-1">{info.content}</p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-3 mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="bg-success-50 dark:bg-success-950/30 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-success-500 mx-auto mb-4 flex items-center justify-center">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-success-700 dark:text-success-400">Message Sent!</h3>
                  <p className="text-success-600 dark:text-success-500">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="input resize-none"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" rightIcon={<Send className="w-5 h-5" />}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div>
              <h2 className="heading-3 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group bg-white dark:bg-secondary-800 rounded-xl p-5 shadow-sm">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-secondary-900 dark:text-secondary-100">
                      {faq.question}
                      <span className="ml-4 flex-shrink-0 text-primary-600 dark:text-primary-400">
                        <svg className="w-5 h-5 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-secondary-600 dark:text-secondary-400">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
