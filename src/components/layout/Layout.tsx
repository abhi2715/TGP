import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { useLenis } from '../../lib/lenis';
import Navbar from './Navbar';
import Footer from './Footer';
import UnfoldingWidget from '../ui/UnfoldingWidget';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <>
      <Navbar />
      <main className="main-content">
        {children || <Outlet />}
      </main>
      <Footer />
      <UnfoldingWidget />
    </>
  );
};

export default Layout;
