import React, { useState, useRef } from 'react';
import { UploadCloud, File, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeSales } from '../services/api';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const validateFile = (selectedFile) => {
        if (!selectedFile) return false;
        const isValidName = selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.xlsx');
        if (!isValidName) {
            setError('Please upload a valid .csv or .xlsx file');
            return false;
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('File size must be strictly under 5MB');
            return false;
        }
        setError('');
        return true;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
            }
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please provide a file first.');
            return;
        }

        if (!email) {
            setError('Please provide your email address.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await analyzeSales(file, email);
            setSuccess('Summary sent to your email!');
            setFile(null);
            setEmail('');
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            setError(err.message || 'Something went wrong capturing the sales data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto backdrop-blur-xl bg-white/70 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-2xl transition-all">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* File Dropzone */}
                <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${isDragging
                            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
                            : file ? 'border-emerald-500 bg-emerald-50/30' : 'border-neutral-300 hover:border-blue-400 dark:border-neutral-700'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
                    />

                    {file ? (
                        <div className="flex flex-col items-center space-y-3 cursor-pointer">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full dark:bg-emerald-900/30">
                                {file.name.endsWith('.csv') ? <FileText size={32} /> : <File size={32} />}
                            </div>
                            <div className="text-emerald-700 font-medium break-all">
                                {file.name}
                            </div>
                            <div className="text-xs text-neutral-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB - Click to change
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-4 cursor-pointer">
                            <div className="p-4 bg-blue-50 dark:bg-neutral-800 text-blue-500 rounded-full group-hover:bg-blue-100 transition-colors">
                                <UploadCloud size={40} />
                            </div>
                            <div>
                                <span className="font-semibold text-blue-600">Click to upload</span>
                                <span className="text-neutral-500"> or drag and drop</span>
                            </div>
                            <div className="text-xs text-neutral-400">
                                CSV or XLSX up to 5MB
                            </div>
                        </div>
                    )}
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">
                        Recipient Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="executive@company.com"
                        className="w-full px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-neutral-400"
                        required
                    />
                </div>

                {/* Status Indicators */}
                {error && (
                    <div className="flex items-center p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="flex items-center p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm border border-emerald-100 animate-in fade-in zoom-in">
                        <CheckCircle size={18} className="mr-2 flex-shrink-0" />
                        <span className="font-medium">{success}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !file || !email}
                    className={`w-full py-4 px-6 rounded-xl font-medium text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-2
            ${loading || !file || !email
                            ? 'bg-blue-400 cursor-not-allowed opacity-70'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 scale-100 hover:scale-[1.01]'
                        }`
                    }
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Analyzing Sales Data...</span>
                        </>
                    ) : (
                        <span>Generate Summary</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default FileUpload;
