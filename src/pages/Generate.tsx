import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Check,
  Loader2,
  Download,
  Heart,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  ImageIcon,
  Wand2,
  Share2,
} from 'lucide-react';

const processingSteps = [
  { id: 'upload', label: 'Uploading Photos', icon: ImageIcon },
  { id: 'analyze', label: 'Analyzing Features', icon: Brain },
  { id: 'train', label: 'Training AI Model', icon: Wand2 },
  { id: 'generate', label: 'Generating Headshots', icon: Sparkles },
];

const mockGeneratedHeadshots = [
  { id: 1, src: '/images/sample-headshot-1.jpg', style: 'corporate', liked: false },
  { id: 2, src: '/images/sample-headshot-2.jpg', style: 'executive', liked: false },
  { id: 3, src: '/images/sample-headshot-3.jpg', style: 'creative', liked: false },
  { id: 4, src: '/images/sample-headshot-4.jpg', style: 'corporate', liked: false },
  { id: 5, src: '/images/sample-headshot-5.jpg', style: 'creative', liked: false },
  { id: 6, src: '/images/sample-headshot-6.jpg', style: 'executive', liked: false },
  { id: 7, src: '/images/sample-headshot-7.jpg', style: 'corporate', liked: false },
  { id: 8, src: '/images/sample-headshot-8.jpg', style: 'creative', liked: false },
];

export default function Generate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { style = 'corporate' } = location.state || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [headshots, setHeadshots] = useState(mockGeneratedHeadshots);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Processing animation
  useEffect(() => {
    if (isComplete) return;

    const totalDuration = 8000; // 8 seconds total
    const stepDuration = totalDuration / processingSteps.length;
    const progressInterval = 50;
    const progressIncrement = (100 / (stepDuration / progressInterval));

    let currentStepIndex = 0;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += progressIncrement;

      if (currentProgress >= 100) {
        currentProgress = 0;
        currentStepIndex += 1;

        if (currentStepIndex >= processingSteps.length) {
          clearInterval(interval);
          setIsComplete(true);
          return;
        }
      }

      setCurrentStep(currentStepIndex);
      setStepProgress(currentProgress);
    }, progressInterval);

    return () => clearInterval(interval);
  }, [isComplete]);

  const toggleLike = (id: number) => {
    setHeadshots((prev) =>
      prev.map((h) => (h.id === id ? { ...h, liked: !h.liked } : h))
    );
  };

  const likedCount = headshots.filter((h) => h.liked).length;

  return (
    <div className="min-h-[100dvh] pt-[72px]">
      {/* Processing State */}
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-[calc(100dvh-72px)] flex items-center justify-center px-6"
          >
            <div className="text-center max-w-lg">
              {/* Animated brain/AI icon */}
              <motion.div
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-8 shadow-glow"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A] mb-2">
                AI is Working Its Magic
              </h2>
              <p className="text-[#64748B] mb-10">
                Training a custom AI model on your photos. This takes about 30 seconds...
              </p>

              {/* Progress Steps */}
              <div className="space-y-4">
                {processingSteps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isDone = index < currentStep;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-blue-50 border border-blue-100'
                          : isDone
                            ? 'bg-green-50 border border-green-100'
                            : 'bg-slate-50 border border-slate-100'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-blue-500 text-white'
                            : isDone
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-5 h-5" />
                        ) : isActive ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p
                          className={`font-medium text-sm ${
                            isActive ? 'text-blue-700' : isDone ? 'text-green-700' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                      {isActive && (
                        <span className="text-xs font-semibold text-blue-600">
                          {Math.round(stepProgress)}%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Overall Progress Bar */}
              <div className="mt-6">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-teal-400 rounded-full"
                    style={{
                      width: `${((currentStep + stepProgress / 100) / processingSteps.length) * 100}%`,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Results State */
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <section className="py-8 bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-blue-900">
              <div className="max-w-[1280px] mx-auto px-6">
                <button
                  onClick={() => navigate('/upload')}
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Upload
                </button>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-1">
                      Your Headshots Are Ready!
                    </h1>
                    <p className="text-slate-300 text-sm">
                      Generated {headshots.length} professional headshots in {style} style
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setHeadshots((prev) => prev.map((h) => ({ ...h, liked: false })))}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                    <button
                      onClick={() => {
                        const liked = headshots.filter((h) => h.liked);
                        if (liked.length > 0) {
                          alert(`Downloading ${liked.length} favorite headshots!`);
                        }
                      }}
                      disabled={likedCount === 0}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        likedCount > 0
                          ? 'bg-white text-[#0A1628] hover:bg-blue-50'
                          : 'bg-white/20 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      Download Favorites ({likedCount})
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Headshot Grid */}
            <div className="max-w-[1280px] mx-auto px-6 py-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {headshots.map((shot, index) => (
                  <motion.div
                    key={shot.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover bg-white"
                  >
                    <img
                      src={shot.src}
                      alt={`Generated headshot ${shot.id}`}
                      className="w-full aspect-[3/4] object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                      onClick={() => setSelectedImage(shot.src)}
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleLike(shot.id)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            shot.liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${shot.liked ? 'fill-white' : ''}`} />
                        </button>
                        <button
                          onClick={() => alert('Downloading headshot...')}
                          className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedImage(shot.src)}
                          className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Liked badge */}
                    {shot.liked && (
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5 fill-white text-white" />
                      </div>
                    )}

                    <div className="px-3 py-2.5">
                      <span className="text-xs font-medium text-[#64748B] capitalize">{shot.style}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Go to Gallery CTA */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => navigate('/gallery')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  View All in Gallery
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0F172A] hover:bg-slate-100 transition-colors"
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
