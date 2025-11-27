'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Shield,
  Lock,
  Award
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Markets', href: '/markets' },
        { name: 'Trading Tools', href: '/tools' },
        { name: 'Insights', href: '/insights' },
        // { name: 'API Documentation', href: '/api' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        // { name: 'Careers', href: '/careers' },
        // { name: 'Press', href: '/press' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Community', href: '/community' },
        { name: 'Status', href: '/status' },
        { name: 'Security', href: '/security' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
  ]

  const trustBadges = [
    { name: 'Bank-Grade Security', icon: Shield },
    { name: '256-bit Encryption', icon: Lock },
    { name: 'Award Winning', icon: Award },
  ]

  return (
    <footer className="bg-dark-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-6 h-6 md:w-8 md:h-8">
                  <Image
                    src="/LC.png"
                    alt="ClubLiquidez Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="relative h-6 md:h-8 w-auto">
                  <Image
                    src="/LCP.png"
                    alt="ClubLiquidez"
                    width={200}
                    height={32}
                    className="object-contain h-full w-auto"
                    priority
                  />
                </div>
              </Link>
              <p className="text-gray-400 max-w-md">
                Unlock liquidity and trade smarter with our cutting-edge platform. 
                Join thousands of traders worldwide.
              </p>
              
              {/* Trust Badges */}
              <div className="flex items-center space-x-4 pt-4">
                {trustBadges.map((badge) => (
                  <motion.div
                    key={badge.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-neon-gold transition-colors"
                  >
                    <badge.icon className="w-4 h-4" />
                    <span className="text-xs">{badge.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-neon-gold transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-400">
                Get the latest market insights and trading strategies delivered to your inbox.
              </p>
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-gold-deep focus:border-transparent"
              />
              <Button variant="primary" size="md">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>© {currentYear} ClubLiquidez. All rights reserved.</span>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-neon-gold transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-neon-gold transition-colors">
                Terms
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-dark-800 rounded-lg text-gray-400 hover:text-neon-gold hover:bg-dark-700 transition-all duration-200"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 