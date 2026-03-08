/**
 * Auth illustration: property keys and checklist motif.
 * Split layout left panel for login/signup pages.
 */
export function AuthIllustration() {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-slate-100/50">
      <div className="relative w-full max-w-md">
        {/* Abstract house + key visual */}
        <svg
          viewBox="0 0 400 320"
          fill="none"
          className="w-full text-slate-300"
          aria-hidden
        >
          {/* House outline */}
          <path
            d="M200 40L60 140v140h80v-80h120v80h80V140L200 40z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="text-slate-200"
          />
          {/* Door */}
          <rect
            x="165"
            y="160"
            width="70"
            height="90"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-300"
          />
          {/* Key */}
          <g className="text-slate-400">
            <circle cx="280" cy="120" r="25" stroke="currentColor" strokeWidth="2" />
            <rect x="268" y="120" width="12" height="80" rx="2" stroke="currentColor" strokeWidth="2" />
            <path
              d="M268 180h24v20h-24z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
          {/* Checkmarks */}
          <g className="text-emerald-400" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M310 82l4 4 10-12" />
            <path d="M310 142l4 4 10-12" />
            <path d="M310 202l4 4 10-12" />
          </g>
        </svg>
        <p className="mt-6 text-center text-sm text-slate-500">
          Your data is secure. We never share your information.
        </p>
      </div>
    </div>
  );
}
