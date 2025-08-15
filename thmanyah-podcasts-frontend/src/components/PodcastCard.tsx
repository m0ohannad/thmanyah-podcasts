'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tag, Music } from 'lucide-react';
import { Podcast } from '@/types/podcast';

interface PodcastCardProps {
  podcast: Podcast;
  index?: number;
}

export default function PodcastCard({ podcast, index = 0 }: PodcastCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:shadow-strong hover:-translate-y-1 dark:bg-neutral-800"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-thmanyah-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-thmanyah-900/20 pointer-events-none" />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Artwork */}
          <div className="relative flex-shrink-0">
            <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-700">
              {podcast.artworkUrl ? (
                <Image
                  src={podcast.artworkUrl}
                  alt={podcast.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="80px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Music className="h-8 w-8 text-neutral-400" />
                </div>
              )}
            </div>
          </div>
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 w-100 h-100" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 line-clamp-2 group-hover:text-thmanyah-600 dark:group-hover:text-thmanyah-400 transition-colors duration-300">
              {podcast.title}
            </h3>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              {podcast.author}
            </p>
            
            {/* Release Date */}
            {podcast.releaseDate && (
              <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(podcast.releaseDate)}</span>
              </div>
            )}
          </div>

          {/* External Link */}
          {podcast.itunesUrl && (
            <Link
              href={podcast.itunesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-50 flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-700 dark:bg-thmanyah-900/30 text-thmanyah-600 dark:text-thmanyah-400 hover:bg-thmanyah-600 hover:text-thmanyah-700 dark:hover:bg-thmanyah-800/50 dark:hover:text-thmanyah-300 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Genres */}
        {podcast.genres && podcast.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {podcast.genres.slice(0, 3).map((genre, idx) => (
              <motion.span
                key={genre}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="inline-flex items-center gap-1 rounded-full bg-neutral-100 dark:bg-neutral-700 px-2 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400"
              >
                <Tag className="h-3 w-3" />
                {genre}
              </motion.span>
            ))}
            {podcast.genres.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-700 px-2 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-500">
                +{podcast.genres.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
          <span>آخر تحديث: {formatDate(podcast.updatedAt)}</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-gentle" />
            <span>متاح</span>
          </div>
        </div>
      </div>

      {/* Hover Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-thmanyah-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:border-thmanyah-600 pointer-events-none" />
    </motion.div>
  );
}
