import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import type { ArticleItem } from '../../types';

interface WritingCardProps {
  article: ArticleItem;
}

export const WritingCard: React.FC<WritingCardProps> = ({ article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-5 sm:p-6 rounded-2xl bg-surface border border-border-subtle hover:border-accent hover:shadow-sm transition-all flex flex-col justify-between group min-h-[44px]"
    >
      <div className="space-y-4">
        {/* SVG Cover Image Frame */}
        {article.coverSvg && (
          <div className="w-full aspect-[2/1] rounded-xl overflow-hidden border border-border-subtle bg-[#121519] flex items-center justify-center p-3">
            <img
              src={article.coverSvg}
              alt={`${article.title} Cover`}
              loading="lazy"
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-secondary">
            <span className="text-accent uppercase font-medium">
              {article.topic}
            </span>
            <span className="inline-flex items-center space-x-1 text-muted">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-secondary leading-relaxed font-sans">
            {article.hook}
          </p>
        </div>

        {/* Key Takeaways */}
        {article.takeaways && article.takeaways.length > 0 && (
          <div className="pt-2 border-t border-border-subtle/50 space-y-1">
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
              Key Derivations:
            </span>
            <ul className="text-[11px] text-secondary font-sans space-y-1">
              {article.takeaways.slice(0, 2).map((t, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-accent font-mono font-bold">›</span>
                  <span className="line-clamp-1">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 flex items-center justify-between text-xs font-mono text-accent">
        <span className="text-muted text-[11px] font-mono">
          {article.formattedDate || article.date}
        </span>
        <span className="inline-flex items-center space-x-1 font-semibold group-hover:underline">
          <span>Read on Medium</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
};
