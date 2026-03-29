"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sayfa yüklendikten biraz sonra buton belirecek
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!phoneNumber) return null;

  // WhatsApp wa.me API'si için numarayı sadece rakamlara (ülke kodu dahil) dönüştürüyoruz
  const formattedNumber = phoneNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 sm:bottom-8 sm:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label="WhatsApp ile İletişime Geç"
    >
      <FaWhatsapp className="h-8 w-8" />
      
      {/* İsteğe bağlı, hafif bir ping efekti eklenebilir dikkat çekmek için */}
      <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30"></span>
    </motion.a>
  );
}
