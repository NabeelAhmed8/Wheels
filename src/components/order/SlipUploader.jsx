import React from 'react'
import { Upload, X, FileCheck } from 'lucide-react'

export function SlipUploader({ receiptFile, receiptPreview, onFileChange, onRemoveReceipt }) {
  return (
    <div className="space-y-1.5">
      <label className="font-mono text-xs uppercase tracking-wider text-black flex items-center gap-1.5 font-bold">
        <Upload className="h-3.5 w-3.5" />
        <span>Upload Payment Screenshot / Deposit Slip (Optional but Recommended)</span>
      </label>

      {!receiptFile ? (
        <label className="border-2 border-dashed border-neutral-300 hover:border-black p-4 bg-white flex flex-col items-center justify-center cursor-pointer transition-all">
          <Upload className="h-6 w-6 text-neutral-400 mb-1" />
          <span className="font-mono text-xs text-black font-bold uppercase">
            Click to Upload Slip (Image or PDF)
          </span>
          <span className="font-mono text-[10px] text-neutral-500 mt-0.5">
            JPG, PNG, WEBP, or PDF up to 15MB
          </span>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="border border-neutral-300 bg-[#f9f9f9] p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {receiptPreview ? (
              <img
                src={receiptPreview}
                alt="Receipt Preview"
                className="h-12 w-12 object-cover border border-neutral-200"
              />
            ) : (
              <FileCheck className="h-8 w-8 text-green-600" />
            )}
            <div className="font-mono text-xs">
              <div className="font-bold text-black">{receiptFile.name}</div>
              <div className="text-[10px] text-neutral-400">
                {(receiptFile.size / 1024).toFixed(1)} KB — Ready to submit
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemoveReceipt}
            className="text-neutral-500 hover:text-red-600 p-1 cursor-pointer"
            title="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
