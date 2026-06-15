import { Link } from 'react-router-dom';
import { Camera, Twitter, Instagram, Linkedin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Upload', path: '/upload' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Pricing', path: '/pricing' },
];

const resources = [
  { label: 'How It Works', path: '/#how-it-works' },
  { label: 'Photo Tips', path: '/upload' },
  { label: 'Support', path: '#' },
  { label: 'Privacy', path: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-[#F1F5F9]">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-violet-600">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                AI Photo Studio
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional headshots powered by AI. Transform your selfies into studio-quality portraits in minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-500/20 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.08] pt-6">
          <p className="text-sm text-slate-500 text-center">
            &copy; 2025 AI Photo Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
