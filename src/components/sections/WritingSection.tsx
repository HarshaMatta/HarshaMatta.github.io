import React from 'react';
import { articles, writingMetadata } from '../../data/articles';
import { WritingCard } from '../writing/WritingCard';

export const WritingSection: React.FC = () => {
  return (
    <section id="writing" className="scroll-mt-32 lg:scroll-mt-24 space-y-6">
      <div className="border-b border-border-subtle pb-4 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
            Technical Writing &amp; Publications
          </h2>
          <p className="text-secondary text-xs sm:text-sm font-sans mt-1">
            Mathematical derivations and portfolio replication on Medium.
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-surface-elevated text-secondary border border-border-subtle">
          {writingMetadata.totalImpressions} Impressions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <WritingCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
