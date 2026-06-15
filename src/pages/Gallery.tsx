import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Heart,
  Trash2,
  Filter,
  Grid3X3,
  LayoutList,
  Search,
  Calendar,
  ArrowDownToLine,
  X,
  ImageIcon,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

type FilterStyle = 'all' | 'corporate' | 'creative' | 'executive';
type SortBy = 'newest' | 'oldest';
type ViewMode = 'grid' | 'list';

interface GalleryItem {
  id: number;
  src: string;
  style: 'corporate' | 'creative' | 'executive';
  date: string;
  liked: boolean;
}

const mockGalleryItems: GalleryItem[] = [
  { id: 1, src: '/images/sample-headshot-1.jpg', style: 'corporate', date: '2025-06-10', liked: true },
  { id: 2, src: '/images/sample-headshot-2.jpg', style: 'executive', date: '2025-06-09', liked: false },
  { id: 3, src: '/images/sample-headshot-3.jpg', style: 'creative', date: '2025-06-08', liked: true },
  { id: 4, src: '/images/sample-headshot-4.jpg', style: 'corporate', date: '2025-06-07', liked: false },
  { id: 5, src: '/images/sample-headshot-5.jpg', style: 'creative', date: '2025-06-06', liked: false },
  { id: 6, src: '/images/sample-headshot-6.jpg', style: 'executive', date: '2025-06-05', liked: true },
  { id: 7, src: '/images/sample-headshot-7.jpg', style: 'corporate', date: '2025-06-04', liked: false },
  { id: 8, src: '/images/sample-headshot-8.jpg', style: 'creative', date: '2025-06-03', liked: true },
];

const styleFilters: { label: string; value: FilterStyle }[] = [
  { label: 'All', value: 'all' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Creative', value: 'creative' },
  { label: 'Executive', value: 'executive' },
];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(mockGalleryItems);
  const [filter, setFilter] = useState<FilterStyle>('all');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filteredItems = items
    .filter((item) => {
      if (filter !== 'all' && item.style !== filter) return false;
      if (searchQuery && !item.style.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const toggleLike = (id: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, liked: !item.liked } : item)));
  };

  const handleDelete = (id: number) => {
    if (deleteConfirm === id) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const downloadAll = () => {
    alert(`Downloading all ${filteredItems.length} headshots...`);
  };

  return (
    <div className="min-h-[100dvh] pt-[72px]">
      {/* Header */}
      <section className="py-10 bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-blue-900">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-2">
              Your Gallery
            </h1>
            <p className="text-slate-300">
              {items.length} headshots generated &middot; {items.filter((i) => i.liked).length} favorites
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Toolbar */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search headshots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>

            {/* Style Filters */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-slate-400 mr-1" />
              {styleFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    filter === f.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 ml-auto">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>

            {/* Download All */}
            <button
              onClick={downloadAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:brightness-110 transition-all"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              Download All
            </button>
          </div>
        </ScrollReveal>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-[#0F172A] mb-2">No headshots found</h3>
            <p className="text-sm text-[#64748B]">
              {searchQuery ? 'Try a different search term' : 'Generate your first headshot to see it here'}
            </p>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && filteredItems.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover bg-white"
                >
                  <img
                    src={item.src}
                    alt={`Headshot ${item.id}`}
                    className="w-full aspect-[3/4] object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                    onClick={() => setSelectedImage(item.src)}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLike(item.id)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          item.liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${item.liked ? 'fill-white' : ''}`} />
                      </button>
                      <button
                        onClick={() => alert('Downloading...')}
                        className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-white transition-colors ${
                          deleteConfirm === item.id ? 'bg-red-500' : 'bg-white/20 hover:bg-red-500/80'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Liked badge */}
                  {item.liked && (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  )}

                  <div className="px-3 py-2.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#64748B] capitalize">{item.style}</span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* List View */}
        {viewMode === 'list' && filteredItems.length > 0 && (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-card transition-all group"
                >
                  <img
                    src={item.src}
                    alt={`Headshot ${item.id}`}
                    className="w-16 h-16 rounded-xl object-cover cursor-pointer"
                    onClick={() => setSelectedImage(item.src)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[#0F172A] capitalize">{item.style} Headshot</p>
                    <p className="text-xs text-[#64748B]">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        item.liked ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${item.liked ? 'fill-red-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => alert('Downloading...')}
                      className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-blue-50 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        deleteConfirm === item.id ? 'bg-red-500 text-white' : 'bg-slate-50 text-slate-400 hover:text-red-500'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Preview" className="w-full rounded-2xl shadow-2xl" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0F172A]"
              >
                <span className="text-lg font-bold">&times;</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
