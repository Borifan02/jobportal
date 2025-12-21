'use client';

import { Share2, Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
    className?: string;
}

export default function ShareButton({ title, text, url, className = "" }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareUrl = url || window.location.href;

        // Try Web Share API first
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: shareUrl
                });
                return;
            } catch (error) {
                console.log('Error sharing:', error);
            }
        }

        // Fallback to clipboard
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className={className}
        >
            {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
            {copied ? 'Copied Link!' : 'Share'}
        </button>
    );
}
