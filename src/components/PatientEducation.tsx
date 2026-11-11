import React, { useState } from 'react';
import { 
  BookOpen, 
  Video as VideoIcon, 
  HelpCircle, 
  Search, 
  Phone, 
  Clock, 
  UserCheck, 
  ChevronRight, 
  X, 
  Play, 
  Share2, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { 
  EducationArticle, 
  EducationVideo, 
  EducationFaq, 
  EducationCategory 
} from '../types/medical';
import { 
  MOCK_EDUCATION_ARTICLES, 
  MOCK_EDUCATION_VIDEOS, 
  MOCK_EDUCATION_FAQS, 
  INDIAN_EMERGENCY_HELPLINES 
} from '../data/mockEducationAndMedData';

interface PatientEducationProps {
  onConsultDoctor: (specialty?: string) => void;
}

export const PatientEducation: React.FC<PatientEducationProps> = ({
  onConsultDoctor
}) => {
  const [activeFormat, setActiveFormat] = useState<'articles' | 'videos' | 'faqs'>('articles');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals for article reader and video player
  const [activeArticle, setActiveArticle] = useState<EducationArticle | null>(null);
  const [activeVideo, setActiveVideo] = useState<EducationVideo | null>(null);

  const categories = [
    'All',
    'Cardiology & Heart Health',
    'Diabetes & Metabolic Wellness',
    'Tropical & Seasonal Health',
    'Orthopedics & Joint Care'
  ];

  const filteredArticles = MOCK_EDUCATION_ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredVideos = MOCK_EDUCATION_VIDEOS.filter((vid) => {
    const matchesCat = selectedCategory === 'All' || vid.category === selectedCategory;
    const matchesSearch =
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredFaqs = MOCK_EDUCATION_FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
              Physician-Reviewed Clinical Knowledge Hub
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Patient Education Resource Library
            </h1>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Explore evidence-based health articles, video masterclasses, and FAQs covering common Indian clinical conditions (Hypertension, Diabetes, Monsoon Fevers, Ergonomics, and Preventive Wellness).
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shrink-0 space-y-1.5 max-w-sm">
            <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
              National Health Helpline (India)
            </span>
            <p className="text-xs text-slate-700">
              Need free 24/7 government telemedicine advice?
            </p>
            <a
              href="tel:+91104"
              className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-teal-700 hover:text-teal-900 mt-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Dial +91 104 (eSanjeevani Tele-Consult)</span>
            </a>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search medical topics, diets, tropical fevers, or symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Indian Country Codes Emergency Directory Strip */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold text-white">
              Official Indian Emergency & Healthcare Helplines (Country Code: +91)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Toll-Free Nationwide Access
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {INDIAN_EMERGENCY_HELPLINES.map((line, idx) => (
            <div key={idx} className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">{line.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{line.desc}</p>
              </div>
              <a
                href={`tel:${line.number.replace(/\s+/g, '')}`}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-400 hover:text-white"
              >
                <Phone className="w-3 h-3" />
                <span>{line.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Format Switcher Tabs: Articles / Videos / FAQs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveFormat('articles')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeFormat === 'articles'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Clinical Articles ({filteredArticles.length})</span>
        </button>

        <button
          onClick={() => setActiveFormat('videos')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeFormat === 'videos'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <VideoIcon className="w-4 h-4" />
          <span>Video Masterclasses ({filteredVideos.length})</span>
        </button>

        <button
          onClick={() => setActiveFormat('faqs')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeFormat === 'faqs'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Medical FAQs ({filteredFaqs.length})</span>
        </button>
      </div>

      {/* CONTENT VIEW 1: Articles Grid */}
      {activeFormat === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-teal-700 uppercase tracking-wider text-[11px]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3" />
                    {article.readTimeMinutes} min read
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">{article.title}</h3>
                <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {article.subtitle}
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 uppercase">Key Clinical Takeaways:</span>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="line-clamp-1">{takeaway}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Reviewed by {article.reviewedBy.split(',')[0]}</span>
                <button
                  onClick={() => setActiveArticle(article)}
                  className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONTENT VIEW 2: Video Masterclasses */}
      {activeFormat === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div
                  onClick={() => setActiveVideo(video)}
                  className="relative h-44 bg-slate-900 flex items-center justify-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">
                    {video.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{video.title}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{video.instructor}</p>
                  <p className="text-[11px] text-slate-400">{video.hospital}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                    <span className="font-semibold text-slate-700 text-[11px]">Core Lessons:</span>
                    <ul className="list-disc list-inside text-[11px] text-slate-500 space-y-0.5">
                      {video.keyPoints.slice(0, 2).map((kp, idx) => (
                        <li key={idx} className="truncate">{kp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => setActiveVideo(video)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Watch Masterclass</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONTENT VIEW 3: Medical FAQs */}
      {activeFormat === 'faqs' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Frequently Asked Medical Questions</h3>
            <span className="text-xs text-slate-500 font-mono">{filteredFaqs.length} Answers</span>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className={`p-4 rounded-xl border transition-colors ${
                  faq.emergencyTrigger
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
                  {faq.emergencyTrigger && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-600 text-white shrink-0">
                      Emergency Alert
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {activeArticle.title}
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Reviewed by <strong>{activeArticle.reviewedBy}</strong> · {activeArticle.readTimeMinutes} min read
              </p>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeArticle.contentParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2">
                <h4 className="font-bold text-teal-950 text-xs uppercase tracking-wider">
                  Clinical Recommendations
                </h4>
                <ul className="list-disc list-inside text-xs text-teal-900 space-y-1">
                  {activeArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </div>

              {activeArticle.regionalIndianHelpline && (
                <div className="p-3 bg-slate-900 text-white rounded-lg flex items-center justify-between text-xs">
                  <span>Indian Tele-Health Advisory Helpline:</span>
                  <a
                    href="tel:+91104"
                    className="font-mono font-bold text-teal-400 hover:underline"
                  >
                    {activeArticle.regionalIndianHelpline}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  onConsultDoctor(activeArticle.category.split('&')[0].trim());
                  setActiveArticle(null);
                }}
                className="py-2.5 px-5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Consult a Doctor on this Condition
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 bg-black rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
              <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </div>
              <div className="absolute bottom-3 left-4 text-xs font-mono text-teal-400 bg-slate-950/80 px-2 py-0.5 rounded">
                Video Stream · {activeVideo.duration}
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider">{activeVideo.category}</span>
              <h3 className="text-lg font-bold text-white mt-0.5">{activeVideo.title}</h3>
              <p className="text-slate-400 text-xs mt-1">
                Instructor: <strong>{activeVideo.instructor}</strong> · {activeVideo.hospital}
              </p>

              <div className="mt-3 p-3 bg-slate-800/80 rounded-lg text-xs space-y-1">
                <p className="font-semibold text-slate-300">Key Educational Points:</p>
                <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                  {activeVideo.keyPoints.map((kp, idx) => (
                    <li key={idx}>{kp}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveVideo(null)}
                className="py-2 px-5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
