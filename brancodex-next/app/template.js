/**
 * app/template.js
 *
 * Next.js App Router "template" — re-mounts on every navigation,
 * which is exactly what Framer Motion needs for page transitions.
 * (layout.js persists across routes; template.js does not.)
 */

"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
