// src/app/info/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, FileText, Download, Volume2 } from "lucide-react";

export default function InfoPage() {
  const pdfPath = "/docs/Proposal.pdf";
  const audioPath = "/docs/Overview.m4a";

  // لینک وب‌سایت در زمان انتشار (آدرس کامل به همراه دامنه برای iframe گوگل نیاز است)
  // در حالت توسعه محلی، گوگل نمی‌تواند فایل localhost شما را بخواند.
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const googleDocUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    siteUrl + pdfPath
  )}&embedded=true`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-800 via-green-700 to-green-600 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          <pattern id="grain" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="white" />
            <circle cx="5" cy="5" r="1" fill="white" />
            <circle cx="35" cy="35" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grain)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <span className="text-3xl">ℹ️</span>
            <h1 className="text-xl font-bold">اطلاعات پروژه و پروپوزال</h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all"
          >
            <span>بازگشت به خانه</span>
            <ArrowRight size={18} />
          </Link>
        </header>

        {/* Content Section */}
        <div className="flex-1 space-y-6">
          {/* Audio Player Card */}
          <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Volume2 className="text-green-300" size={24} />
              </div>
              <div>
                <h2 className="font-bold text-lg">توضیحات صوتی پروژه</h2>
                <p className="text-xs text-green-200">فایل معرفی و اهداف سامانه آقای کشاورز</p>
              </div>
            </div>

            <div className="bg-black/25 rounded-xl p-4 flex items-center justify-center">
              <audio controls className="w-full" src={audioPath}>
                مرورگر شما از پخش‌کننده صوتی پشتیبانی نمی‌کند. می‌توانید فایل را مستقیم دانلود کنید.
              </audio>
            </div>
          </section>

          {/* PDF Viewer Card */}
          <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex-1 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="text-green-300" size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-lg">پروپوزال رسمی طرح</h2>
                  <p className="text-xs text-green-200">پیش‌نمایش مستند فنی و اجرایی پروژه</p>
                </div>
              </div>

              <a
                href={pdfPath}
                download="Proposal.pdf"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl text-sm transition-all font-semibold"
              >
                <Download size={16} />
                <span>دانلود مستقیم PDF</span>
              </a>
            </div>

            {/* Google Doc Iframe for PDF */}
            <div className="relative flex-1 bg-white/5 rounded-xl overflow-hidden border border-white/10 min-h-[400px]">
              {siteUrl ? (
                <iframe
                  src={googleDocUrl}
                  className="w-full h-full min-h-[400px] border-0 rounded-xl"
                  title="PDF Viewer"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-green-200">
                  در حال بارگذاری نمایشگر سند...
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
