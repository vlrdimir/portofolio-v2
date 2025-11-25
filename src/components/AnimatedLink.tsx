"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ComponentProps } from "react";

type AnimatedLinkProps = ComponentProps<typeof Link>;

export default function AnimatedLink({
  children,
  className,
  ...props
}: AnimatedLinkProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full w-full"
    >
      <Link className={className} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}
