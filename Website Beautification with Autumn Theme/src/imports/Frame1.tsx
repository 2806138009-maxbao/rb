import svgPaths from "./svg-9yuvp90q2d";
import imgAutumnMottRodeheaverSPd9CSoWCkYUnsplash1 from "figma:asset/0a7380f7f7a20e859c9a8b156ecdf00015af5935.png";

function Mask() {
  return (
    <div className="absolute bg-white inset-[-50px]" data-name="Mask">
      <div className="absolute bg-black inset-[76px] rounded-[34px]" data-name="Shape" />
    </div>
  );
}

function Blur() {
  return <div className="absolute backdrop-blur-2xl backdrop-filter bg-[rgba(0,0,0,0.08)] blur-[20px] filter inset-[31px_26px_21px_26px] mix-blend-hard-light rounded-[34px]" data-name="Blur" />;
}

function Shadow() {
  return (
    <div className="absolute inset-[-26px_-25.73px_-26.4px_-26px]" data-name="Shadow">
      <Mask />
      <Blur />
    </div>
  );
}

function Fill() {
  return (
    <div className="absolute bottom-[-0.4px] left-0 right-[0.27px] rounded-[34px] top-0" data-name="Fill">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[34px]">
        <div className="absolute bg-neutral-800 inset-0 mix-blend-color-dodge rounded-[34px]" />
        <div className="absolute bg-[rgba(250,250,250,0.7)] inset-0 rounded-[34px]" />
      </div>
    </div>
  );
}

function GlassEffect() {
  return <div className="absolute bg-[rgba(0,0,0,0)] bottom-[-0.4px] left-0 right-[0.27px] rounded-[34px] top-0" data-name="Glass Effect" />;
}

function LiquidGlassRegularLarge() {
  return (
    <div className="h-[1198.6px] relative w-[1181.27px]" data-name="Liquid Glass - Regular - Large">
      <Shadow />
      <Fill />
      <GlassEffect />
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="absolute left-[1961px] size-[240px] top-[2615px]" data-name="Arrow down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 240">
        <g id="Arrow down">
          <path d={svgPaths.p25bd93c0} id="Icon" stroke="var(--stroke-0, #B93A57)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[148.95px] left-[3.15px] top-[5.52px] w-[153.709px]">
      <div className="absolute bottom-0 left-[-0.22%] right-[-0.23%] top-[-2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 152">
          <g id="Group 1">
            <path d={svgPaths.p2235d100} fill="var(--fill-0, #F6D7DF)" id="Vector 3" />
            <path d={svgPaths.p7726a00} id="Polygon 1" stroke="var(--stroke-0, #D03660)" strokeWidth="5.95801" />
            <path d={svgPaths.p1409e980} id="Vector 1" stroke="var(--stroke-0, #D03660)" strokeWidth="5.95801" />
            <path d={svgPaths.p129efe80} id="Vector 2" stroke="var(--stroke-0, #D03660)" strokeWidth="5.95801" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function CalloutIcons() {
  return (
    <div className="absolute h-[629px] left-[2579px] top-[2197px] w-[1187px]" data-name="Callout Icons">
      <Group />
    </div>
  );
}

function Figma() {
  return (
    <div className="absolute left-[2471px] size-[48px] top-[3302px]" data-name="Figma">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Figma">
          <path d={svgPaths.pf4aa100} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[5159px] left-[1104px] top-[353px] w-[1979px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1979 5159">
          <path d="M0 0H1979V5159H0V0Z" fill="url(#paint0_linear_3_354)" id="Rectangle 1" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_354" x1="989.5" x2="989.5" y1="0" y2="5159">
              <stop offset="0.5" stopColor="#FDF7FB" />
              <stop offset="0.5" stopColor="#FFF7FB" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute h-[739px] left-[1104px] opacity-10 top-[353px] w-[1979px]" data-name="autumn-mott-rodeheaver-SPd9CSoWCkY-unsplash 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[445.84%] left-[-6.55%] max-w-none top-[-270.58%] w-[111.01%]" src={imgAutumnMottRodeheaverSPd9CSoWCkYUnsplash1} />
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.14619135856628418)+(var(--transform-inner-height)*0.9892563223838806)))] items-center justify-center left-[1461px] top-[1021px] w-[calc(1px*((var(--transform-inner-height)*0.14619135856628418)+(var(--transform-inner-width)*0.9892563223838806)))]" style={{ "--transform-inner-width": "1137.296875", "--transform-inner-height": "1149.078125" } as React.CSSProperties}>
        <div className="flex-none rotate-[351.594deg]">
          <div className="bg-[#ff6f61] h-[1149.09px] opacity-40 w-[1137.31px]" />
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7660444378852844)+(var(--transform-inner-height)*0.6427876353263855)))] items-center justify-center left-[772px] top-0 w-[calc(1px*((var(--transform-inner-height)*0.7660444378852844)+(var(--transform-inner-width)*0.6427876353263855)))]" style={{ "--transform-inner-width": "2579.84375", "--transform-inner-height": "1286.46875" } as React.CSSProperties}>
        <div className="flex-none rotate-[310deg]">
          <div className="font-['Inter:Light',sans-serif] font-light h-[1286.49px] leading-[normal] not-italic opacity-50 relative text-[400px] text-[rgba(255,134,134,0.5)] w-[2579.85px]">
            <p className="mb-0">FOR</p>
            <p className="mb-0 whitespace-pre-wrap">{`       MY`}</p>
            <p className="whitespace-pre-wrap">{`             LOVE`}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7660444378852844)+(var(--transform-inner-height)*0.6427876353263855)))] items-center justify-center left-[439px] top-[1424px] w-[calc(1px*((var(--transform-inner-height)*0.7660444378852844)+(var(--transform-inner-width)*0.6427876353263855)))]" style={{ "--transform-inner-width": "2579.84375", "--transform-inner-height": "1286.46875" } as React.CSSProperties}>
        <div className="flex-none rotate-[310deg]">
          <div className="font-['Inter:Light',sans-serif] font-light h-[1286.49px] leading-[normal] not-italic opacity-50 relative text-[400px] text-[rgba(255,134,134,0.5)] w-[2579.85px]">
            <p className="mb-0">FOR</p>
            <p className="mb-0 whitespace-pre-wrap">{`       MY`}</p>
            <p className="whitespace-pre-wrap">{`             LOVE`}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7660444378852844)+(var(--transform-inner-height)*0.6427876353263855)))] items-center justify-center left-0 top-[2964px] w-[calc(1px*((var(--transform-inner-height)*0.7660444378852844)+(var(--transform-inner-width)*0.6427876353263855)))]" style={{ "--transform-inner-width": "2579.84375", "--transform-inner-height": "1286.46875" } as React.CSSProperties}>
        <div className="flex-none rotate-[310deg]">
          <div className="font-['Inter:Light',sans-serif] font-light h-[1286.49px] leading-[normal] not-italic opacity-50 relative text-[400px] text-[rgba(255,134,134,0.5)] w-[2579.85px]">
            <p className="mb-0">FOR</p>
            <p className="mb-0 whitespace-pre-wrap">{`       MY`}</p>
            <p className="whitespace-pre-wrap">{`             LOVE`}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7660444378852844)+(var(--transform-inner-height)*0.6427876353263855)))] items-center justify-center left-[2353px] top-[3421px] w-[calc(1px*((var(--transform-inner-height)*0.7660444378852844)+(var(--transform-inner-width)*0.6427876353263855)))]" style={{ "--transform-inner-width": "2579.84375", "--transform-inner-height": "1286.46875" } as React.CSSProperties}>
        <div className="flex-none rotate-[310deg]">
          <div className="font-['Inter:Light',sans-serif] font-light h-[1286.49px] leading-[normal] not-italic opacity-50 relative text-[400px] text-[rgba(255,134,134,0.5)] w-[2579.85px]">
            <p className="mb-0">FOR</p>
            <p className="mb-0 whitespace-pre-wrap">{`       MY`}</p>
            <p className="whitespace-pre-wrap">{`             LOVE`}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.004393106792122126)+(var(--transform-inner-height)*0.9999903440475464)))] items-center justify-center left-[1488px] top-[1092px] w-[calc(1px*((var(--transform-inner-height)*0.004393106792122126)+(var(--transform-inner-width)*0.9999903440475464)))]" style={{ "--transform-inner-width": "1181.265625", "--transform-inner-height": "1198.59375" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.748deg]">
          <LiquidGlassRegularLarge />
        </div>
      </div>
      <div className="absolute font-['Smiley_Sans:Oblique',sans-serif] italic leading-[normal] left-[2108px] text-[#c97487] text-[64px] text-center top-[1273px] translate-x-[-50%] w-[768px]">
        <p className="mb-0">转眼间我们已经认识一年啦！</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">现在看来真的发生了好多好多事呢</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">所以我正好做了个网站</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">来记录我们生活的点点滴滴</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">至于怎么记录？</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">那你就往下翻吧！</p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute font-['Smiley_Sans:Oblique',sans-serif] h-[310px] italic leading-[normal] left-[1315px] text-[#e03d62] text-[0px] top-[381px] w-[640px]">
        <p className="mb-0 text-[350px]">致</p>
        <p className="text-[256px]">亲爱的燕包</p>
      </div>
      <ArrowDown />
      <CalloutIcons />
      <Figma />
    </div>
  );
}