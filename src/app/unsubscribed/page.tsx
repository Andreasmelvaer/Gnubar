export default function UnsubscribedPage() {
  return (
    <html lang="no">
      <body className="min-h-screen bg-[#3C4932] flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold text-[#E2CE37] mb-4" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            Avmeldt
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Du er nå avmeldt nyhetsbrevet fra Gnu Bar. Vi sender deg ikke flere e-poster.
          </p>
          <a
            href="/"
            className="inline-block bg-[#E2CE37] text-[#3C4932] px-6 py-3 font-bold rounded hover:opacity-90 transition-opacity"
          >
            Tilbake til gnubar.no
          </a>
        </div>
      </body>
    </html>
  );
}
