/** Original facade study, not a supplied product or a completed project. */
export default function SmartGlassVisual({ frosted = false, className = "" }: { frosted?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 1200 720" fill="none" aria-hidden="true" className={`h-full w-full ${className}`}>
      <path fill="#e4e6dd" d="M0 0h1200v720H0z" />
      <path fill="#eeeee6" d="M0 0h1200v387H0z" />
      <path fill="#d7d9cc" d="M0 575h1200v145H0z" />
      <path fill="#c2c6b7" d="M164 584l852-10 184 70v76H494z" />
      <path fill="#babfb0" d="M861 86l172 80v446l-172-30z" />
      <path fill="#7f9085" d="M885 122l125 58v401l-125-24z" />
      <path fill="#aab6a7" d="M888 251l121 53v63l-121-41zm0 182 121 31v107l-121-24z" />
      <path d="M927 143v423m42-403v411m-83-283 123 43m-123 113 123 27" stroke="#d0d1c4" strokeWidth="7" />
      <path fill="#d1cebf" d="M156 83h716v500H156z" />
      {[0, 1, 2].map(floor => (
        <g key={floor} transform={`translate(0 ${floor * 158})`}>
          {[0, 1, 2, 3, 4].map(bay => (
            <g key={bay} transform={`translate(${bay * 135} 0)`}>
              <path fill="#637a6d" d="M178 107h116v136H178z" />
              <path fill="#849587" d="M181 110h110v70H181z" />
              <path fill="#9dad9a" d="M181 157l35-47h34l-69 98z" />
              <path fill="#bec8b7" fillOpacity=".45" d="M210 241l68-131h13v32l-51 99z" />
              <path fill="#a9b5a2" d="M181 217h110v24H181z" />
              <path d="M235 111v129" stroke="#526759" strokeWidth="2" />
              <g className="transition-opacity duration-700 motion-reduce:transition-none" opacity={frosted ? 1 : 0}>
                <path fill="#dce3d5" d="M181 110h110v131H181z" />
                <path fill="#ccd6c4" d="M181 219h110v22H181z" />
                <path fill="#e6ebdf" fillOpacity=".7" d="M181 110h110v40H181z" />
              </g>
              <path d="M182 112h107M182 112v127" stroke="#edf0e7" strokeOpacity=".65" />
            </g>
          ))}
          <path fill="#b7b6a7" d="M166 249h686v10H166z" />
          <path fill="#e6e2d4" d="M156 248h716v5H156z" />
        </g>
      ))}
      <path fill="#eeeadd" d="M156 83h716l161 83h-20L861 96H156z" />
      <path fill="#b2b4a4" d="M872 83v501l-11-3V97z" />
      <path fill="#c6c4b5" d="M141 583h748v13H141z" />
      <path fill="#eae6d9" d="M156 576h716l17 7H141z" />
      <path d="M67 650h996m-91-34 87 88M220 615l-54 89m392-89 20 89" stroke="#b9bfaf" />
      <path stroke="#68755e" strokeWidth="5" d="M108 593V471m0 63-29-31m29 3 33-33" />
      <path fill="#8b9a79" d="M108 526C53 525 45 449 77 441c-5-49 49-51 61-9 47 5 28 84-30 94z" />
      <path fill="#798b68" d="M107 525c-41 0-50-38-43-60 8 29 27 21 26-2 11 31 18 43 17 62z" />
      <path fill="#aeb89f" d="M1080 614c-25-15-21-51-9-53 8-44 44-36 50-9 38 8 40 49 15 66z" />
      <path d="M177 55h662m-662-6v12m662-12v12" stroke="#909783" />
    </svg>
  );
}
