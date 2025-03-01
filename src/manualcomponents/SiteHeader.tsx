import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 bg-white flex items-center justify-between border-b "
    style={{ height:'100px' }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <div className="rounded-full w-14 h-15 flex items-center justify-center mr-2">
          <img 
          style={{ height:'100%',width:'100%' }}
          src="logo.jpg" alt="Medifinder Logo" className="w-4 h-4" />
        </div>
        <span className="font-semibold text-lg">Medifinder</span>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <a href="#product" className="text-sm text-gray-600 hover:text-gray-900">Home</a>
        <a href="#playground" className="text-sm text-gray-600 hover:text-gray-900">Playground</a>
        <a href="#docs" className="text-sm text-gray-600 hover:text-gray-900">Docs</a>
        <a href="#blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</a>
      </nav>
      
      {/* Auth Buttons - Desktop */}
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="link" className="text-sm text-gray-600">Login</Button>
        <Button variant="primary" size="sm" className="bg-gray-800 text-white rounded-full text-sm">
          Sign Up
        </Button>
      </div>
      
      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col space-y-4 pt-6">
            <a href="#product" className="text-sm text-gray-600 hover:text-gray-900 py-2">Product</a>
            <a href="#playground" className="text-sm text-gray-600 hover:text-gray-900 py-2">Playground</a>
            <a href="#docs" className="text-sm text-gray-600 hover:text-gray-900 py-2">Docs</a>
            <a href="#blog" className="text-sm text-gray-600 hover:text-gray-900 py-2">Blog</a>
            <div className="h-px bg-gray-200 my-2"></div>
            <a href="#login" className="text-sm text-gray-600 hover:text-gray-900 py-2">Login</a>
            <Button variant="default" size="sm" className="bg-gray-800 text-white rounded-full text-sm w-full">
              Sign Up
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;