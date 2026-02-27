import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="h-52 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
          ${product.price}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-5">
          {product.description}
        </p>
        <button className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-700 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95">
          View Details <ExternalLink size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;