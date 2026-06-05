import { Heart, Users, Award, Sparkles, Target, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const values = [
  {
    icon: Heart,
    title: 'Quality First',
    description: 'We use only premium materials to ensure every card makes a lasting impression.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.',
  },
  {
    icon: Award,
    title: 'Craftsmanship',
    description: 'Every design is crafted with attention to detail and artistic excellence.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We continuously innovate to bring you the latest design tools and features.',
  },
];

const milestones = [
  { year: '2020', title: 'Founded', description: 'Started with a passion for personalized greeting cards' },
  { year: '2021', title: '10,000 Customers', description: 'Reached our first major milestone' },
  { year: '2022', title: 'Design Studio Launch', description: 'Introduced our drag-and-drop card editor' },
  { year: '2023', title: 'Global Shipping', description: 'Now shipping to 50+ countries worldwide' },
  { year: '2024', title: 'AI Integration', description: 'Launched AI-powered message generator' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950 pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-accent-50 dark:from-primary-950/20 dark:via-transparent dark:to-accent-950/20" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Creating{' '}
              <span className="gradient-text">Meaningful Connections</span>
            </h1>
            <p className="text-body text-xl">
              We believe that a thoughtfully crafted greeting card has the power to strengthen relationships,
              express emotions, and create lasting memories.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Our Story</h2>
              <div className="space-y-4 text-body">
                <p>
                  Custom Greetings was born from a simple idea: everyone deserves to express their feelings
                  in a unique and personal way. What started in a small home office in 2020 has grown into
                  a platform serving customers worldwide.
                </p>
                <p>
                  We noticed that store-bought cards often felt impersonal and generic. People wanted more—they
                  wanted to add their own touch, share their own stories, and create something truly unique.
                </p>
                <p>
                  Today, we combine cutting-edge technology with traditional craftsmanship to give you the
                  tools to create beautiful, personalized greeting cards for every occasion.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our team"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="heading-3 mb-4">Our Mission</h3>
              <p className="text-body">
                To empower everyone to create beautiful, personalized greeting cards that capture
                heartfelt emotions and strengthen personal connections.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="heading-3 mb-4">Our Vision</h3>
              <p className="text-body">
                To become the world's most beloved platform for personalized greetings,
                where technology meets tradition to help people express what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">What We Stand For</h2>
            <p className="text-body max-w-2xl mx-auto">
              Our core values guide everything we do, from product design to customer service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-secondary-900 dark:text-secondary-100">{value.title}</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Journey</h2>
            <p className="text-body max-w-2xl mx-auto">
              From a small startup to a global platform for personalized greetings.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary-600 dark:text-primary-400">{milestone.year}</span>
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary-200 dark:bg-primary-800 my-2" />
                  )}
                </div>
                <div className="pt-2 pb-8">
                  <h3 className="font-semibold text-lg text-secondary-900 dark:text-secondary-100">{milestone.title}</h3>
                  <p className="text-secondary-600 dark:text-secondary-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-primary-500 to-accent-500">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-white mb-6">Ready to Create Something Special?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who have discovered the joy of personalized greeting cards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop">
              <Button size="lg" variant="secondary">
                Explore Our Cards
              </Button>
            </Link>
            <Link to="/custom-studio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Start Designing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
