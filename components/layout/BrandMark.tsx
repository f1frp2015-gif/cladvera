export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M37 3H3v34h34v-5H8V8h29V3Z" fill="currentColor" />
      <path d="M32 13H13v14h19v-5H18v-4h14v-5Z" fill="currentColor" />
    </svg>
  );
}
