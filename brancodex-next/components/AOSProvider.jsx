/**
 * components/AOSProvider.jsx
 *
 * AOS (Animate On Scroll) must be initialized on the CLIENT because it
 * reads the DOM. The 'use client' directive tells Next.js that.
 *
 * We wrap the entire app with this so AOS works on every page.
 */

'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      once: true,       // Only animate once per element
      duration: 1000,   // 1 second animation
      easing: 'ease-in-out',
    });
  }, []);

  return <>{children}</>;
}
