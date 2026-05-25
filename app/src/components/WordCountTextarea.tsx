'use client';

import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  maxWords: number;
  rows?: number;
  placeholder?: string;
}

export default function WordCountTextarea({
  name,
  label,
  maxWords,
  rows = 4,
  placeholder,
}: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name) || '';
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const isOver = wordCount > maxWords;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-900">
        {label}
      </label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 resize-none transition ${
          errors[name]
            ? 'border-red-400 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-300'
        }`}
      />
      <div className="flex justify-between items-center text-xs">
        {errors[name] ? (
          <span className="text-red-500 font-medium">
            {errors[name]?.message as string}
          </span>
        ) : (
          <span className="text-gray-600">Max {maxWords} words</span>
        )}
        <span className={isOver ? 'text-red-500 font-medium' : 'text-gray-600'}>
          {wordCount} / {maxWords}
        </span>
      </div>
    </div>
  );
}