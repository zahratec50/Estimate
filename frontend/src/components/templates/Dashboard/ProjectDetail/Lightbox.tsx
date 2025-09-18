"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const Lightbox = ({
  image,
  onClose,
}: {
  image: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.img
        src={image}
        alt="Preview"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-h-[80%] max-w-[80%] rounded-lg shadow-2xl"
      />
    </motion.div>
  );
};

export default Lightbox;
