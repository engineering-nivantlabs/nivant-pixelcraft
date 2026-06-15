import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  X,
  ImageIcon,
  Sun,
  Camera,
  AlertCircle,
  Check,
  ChevronRight,
  Briefcase,
  Palette,
  Coffee,
  Sparkles,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const guidelines = [
  {
    icon: Sun,
    title: 'Good Lighting',
    description: 'Use natural light or a well-lit room. Avoid harsh shadows.',
  },
  {
    icon: Camera,
    title: 'Multiple Angles',
    description: 'Upload photos from different angles for best results.',
  },
  {
    icon: ImageIcon,
    title: 'Clear Background',
    description: 'Simple backgrounds work best. Avoid cluttered scenes.',
  },
  {
    icon: AlertCircle,
    title: 'Face Visible',
    description: 'Make sure your face is clearly visible in every photo.',
  },
];

const styles = [
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional & polished for business',
    icon: Briefcase,
    gradient: 'from-slate-700 to-slate-900',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern with artistic flair',
    icon: Palette,
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Relaxed & approachable',
    icon: Coffee,
    gradient: 'from-teal-500 to-emerald-600',
  },
];

const MIN_PHOTOS = 4;
const MAX_PHOTOS = 20;

export default function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('corporate');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    setFiles((prev) => [...prev, ...dropped].slice(0, MAX_PHOTOS));
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).filter((f) => f.type.startsWith('image/'));
    setFiles((prev) => [...prev, ...selected].slice(0, MAX_PHOTOS));
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleUpload = useCallback(() => {
    if (files.length < MIN_PHOTOS) return;
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/generate', { state: { style: selectedStyle, count: files.length } });
        }, 300);
      }
    }, 80);
  }, [files, selectedStyle, navigate]);

  const canProceed = files.length >= MIN_PHOTOS;

  return (
    <div className="min-h-[100dvh] pt-[72px]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-blue-900">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-3">
              Upload Your Photos
            </h1>
            <p className="text-slate-300 max-w-lg mx-auto">
              Upload {MIN_PHOTOS}-{MAX_PHOTOS} selfies and let our AI create stunning professional headshots.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Left Column - Upload Area */}
          <div>
            {/* Drop Zone */}
            <ScrollReveal>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50/50'
                    : 'border-slate-300 bg-white hover:border-blue-300 hover:bg-slate-50/50'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center mx-auto mb-4">
                  <UploadCloud className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-semibold text-[#0F172A] mb-1">
                  {isDragOver ? 'Drop your photos here' : 'Drag & drop your photos here'}
                </p>
                <p className="text-sm text-[#64748B]">
                  or click to browse. Supports JPG, PNG up to 10MB each.
                </p>
                <p className="text-xs text-[#64748B] mt-2">
                  Minimum {MIN_PHOTOS} photos required, maximum {MAX_PHOTOS}
                </p>
              </div>
            </ScrollReveal>

            {/* File List */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      Uploaded Photos ({files.length}/{MAX_PHOTOS})
                    </p>
                    <button
                      onClick={() => setFiles([])}
                      className="text-xs text-red-500 hover:text-red-600 font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    <AnimatePresence>
                      {files.map((file, i) => (
                        <motion.div
                          key={`${file.name}-${i}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          layout
                          className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(i);
                            }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#0F172A]">Uploading...</span>
                        <span className="text-sm text-[#64748B]">{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-600 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Proceed Button */}
                  {!isUploading && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={handleUpload}
                      disabled={!canProceed}
                      className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold transition-all ${
                        canProceed
                          ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:brightness-110 shadow-lg'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles className="w-5 h-5" />
                      {files.length < MIN_PHOTOS
                        ? `Upload at least ${MIN_PHOTOS} photos`
                        : 'Generate Headshots'}
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Guidelines & Style */}
          <div className="space-y-6">
            {/* Style Selection */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl bg-white shadow-card p-6">
                <h3 className="font-heading font-semibold text-lg text-[#0F172A] mb-4">
                  Choose Your Style
                </h3>
                <div className="space-y-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        selectedStyle === style.id
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shrink-0`}>
                        <style.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-[#0F172A]">{style.name}</p>
                        <p className="text-xs text-[#64748B]">{style.description}</p>
                      </div>
                      {selectedStyle === style.id && (
                        <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Guidelines */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl bg-white shadow-card p-6">
                <h3 className="font-heading font-semibold text-lg text-[#0F172A] mb-4">
                  Photo Guidelines
                </h3>
                <div className="space-y-4">
                  {guidelines.map((g) => (
                    <div key={g.title} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <g.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#0F172A]">{g.title}</p>
                        <p className="text-xs text-[#64748B]">{g.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
