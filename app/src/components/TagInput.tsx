'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  maxTags?: number;
}

export default function TagInput({
  name,
  label,
  placeholder = 'Type a module and press Enter',
  maxTags = 30,
}: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const tags = watch(name) || [];
  const [input, setInput] = useState('');

  const handleAddTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
      setValue(name, [...tags, trimmed]);
      setInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setValue(
      name,
      tags.filter((_: string, i: number) => i !== index)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="w-full border border-gray-300 rounded-lg p-3 bg-white focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-transparent">
        {/* Tags display */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag: string, index: number) => (
              <div
                key={index}
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 group hover:bg-blue-700 transition"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="text-blue-100 hover:text-white focus:outline-none"
                  aria-label={`Remove ${tag}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Input field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : 'Add another module...'}
          className="w-full outline-none text-sm text-gray-900 placeholder-gray-500 bg-transparent"
        />
      </div>

      {/* Add button */}
      <button
        type="button"
        onClick={handleAddTag}
        disabled={!input.trim() || tags.length >= maxTags}
        className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded transition w-fit"
      >
        Add Module
      </button>

      {/* Error and counter */}
      <div className="flex justify-between items-center text-xs">
        {errors[name] ? (
          <span className="text-red-500">
            {errors[name]?.message as string}
          </span>
        ) : (
          <span className="text-gray-400">
            {tags.length === 0 ? 'Add at least one module' : `${tags.length} module${tags.length !== 1 ? 's' : ''} added`}
          </span>
        )}
        <span className={tags.length >= maxTags ? 'text-orange-500 font-medium' : 'text-gray-400'}>
          {tags.length} / {maxTags}
        </span>
      </div>
    </div>
  );
}
