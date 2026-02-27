import React, { useState, useEffect, useRef } from 'react';
import { getProducts, askAI } from './services/api';
import ProductCard from './components/ProductCard';
import { Bot, Sun, Moon, Sparkles, AlertTriangle, X, Search, Send, PackageSearch, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayedText}</span>;
};

function App() {
  const [products, setProducts] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [aiSummary, setAiSummary] = useState('');
  const [showMockAlert, setShowMockAlert] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setDisplayResults(data);
    setLoading(false);
  };

  const handleAIQuery = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAiSummary(''); 
    const response = await askAI(query);
    setDisplayResults(response.products);
    setAiSummary(response.summary);
    setLoading(false);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors selection:bg-indigo-100">
        
        <header className="fixed top-0 w-full z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="container mx-auto px-6 h-16 flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white"><Bot size={20} /></div>
              <span>DISCOVER<span className="text-indigo-600">.AI</span></span>
            </motion.div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl hover:ring-2 ring-indigo-500/20 transition-all">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main className="container mx-auto px-6 pt-24 pb-32">
          <AnimatePresence>
            {aiSummary && !loading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto mb-12"
              >
                <motion.div 
                  animate={{ boxShadow: ["0px 0px 0px rgba(79, 70, 229, 0)", "0px 0px 20px rgba(79, 70, 229, 0.2)", "0px 0px 0px rgba(79, 70, 229, 0)"] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-indigo-600/[0.03] dark:bg-indigo-600/[0.07] border border-indigo-500/20 p-6 rounded-3xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-3">
                    <Sparkles size={18} />
                    <span className="text-sm uppercase tracking-widest">AI Analysis</span>
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    <Typewriter text={aiSummary} />
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <Loader2 className="animate-spin text-indigo-600" size={48} />
                <Bot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={20} />
              </div>
              <p className="mt-4 font-bold text-slate-400 animate-pulse uppercase tracking-widest text-xs">Processing Request</p>
            </div>
          ) : (
            <>
              {displayResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {displayResults.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="bg-slate-100 dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PackageSearch size={40} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No matching products</h3>
                  <p className="text-slate-500">Try asking for something else, like "gaming setup" or "lifestyle".</p>
                </motion.div>
              )}
            </>
          )}
        </main>

        <div className="fixed bottom-0 w-full bg-gradient-to-t from-white dark:from-slate-950 via-white/90 dark:via-slate-950/90 to-transparent pt-10 pb-6">
          <div className="container mx-auto px-6">
            <form 
              onSubmit={handleAIQuery}
              className="max-w-3xl mx-auto relative group"
            >
              <div className="absolute inset-0 bg-indigo-600/20 blur-xl group-focus-within:blur-2xl transition-all rounded-full opacity-0 group-focus-within:opacity-100" />
              <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden focus-within:border-indigo-500 transition-all">
                <div className="pl-5 text-slate-400">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask AI: 'Find me professional noise cancelling headphones'..."
                  className="w-full py-4 px-4 bg-transparent outline-none text-base font-medium"
                />
                <button 
                  type="submit"
                  disabled={!query.trim() || loading}
                  className="mr-2 p-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-400 text-white rounded-xl transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
            <p className="text-center text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-widest">Powered by Discover Ai</p>
          </div>
        </div>

        <AnimatePresence>
          {showMockAlert && (
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="fixed top-20 right-6 z-50 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 text-sm font-bold"
            >
              <AlertTriangle size={18} /> Mock Mode Active
              <button onClick={() => setShowMockAlert(false)}><X size={14} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;