import svgPaths from "./svg-shf0glm1wk";

function PrimitiveH() {
  return (
    <div className="h-[18px] relative shrink-0 w-[462.4px]" data-name="Primitive.h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[462.4px]">
        <p className="absolute font-['Arial:Bold',sans-serif] leading-[18px] left-0 not-italic text-[18px] text-nowrap text-zinc-200 top-[-1.2px] whitespace-pre">Top Up Balance</p>
      </div>
    </div>
  );
}

function PrimitiveP() {
  return (
    <div className="h-[28px] relative shrink-0 w-[462px]" data-name="Primitive.p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[462px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-zinc-400 top-[-1.2px] w-[421px]">Add funds to your wallet. Minimum: $5, Maximum: $10,000</p>
      </div>
    </div>
  );
}

function DialogHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[462.4px]" data-name="DialogHeader">
      <PrimitiveH />
      <PrimitiveP />
    </div>
  );
}

function Close() {
  return (
    <div className="absolute bg-[#131722] box-border content-stretch flex gap-[10px] items-center justify-center left-[466px] p-[6px] rounded-[46px] size-[32px] top-[10px]" data-name="Close">
      <div className="relative shrink-0 size-[20px]" data-name="x">
        <div className="absolute inset-0" data-name="Path">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Path"></g>
          </svg>
        </div>
        <div className="absolute inset-1/4" data-name="Path">
          <div className="absolute inset-[-7.5%]" style={{ "--stroke-0": "rgba(75, 70, 92, 1)", "--stroke-1": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g id="Path">
                <path d="M10.75 0.75L0.75 10.75" stroke="var(--stroke-0, #4B465C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M10.75 0.75L0.75 10.75" stroke="var(--stroke-1, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute inset-1/4" data-name="Path">
          <div className="absolute inset-[-7.5%]" style={{ "--stroke-0": "rgba(75, 70, 92, 1)", "--stroke-1": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <g id="Path">
                <path d="M0.75 0.75L10.75 10.75" stroke="var(--stroke-0, #4B465C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M0.75 0.75L10.75 10.75" stroke="var(--stroke-1, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-100 tracking-[-0.1504px] whitespace-pre">
        Amount (USD)<span>{` :`}</span>
      </p>
    </div>
  );
}

function Input() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0)] grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip px-0 py-[4px] relative rounded-[inherit] w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-400 whitespace-pre">50</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 1.33333V14.6667" id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5120400} id="Vector_2" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-zinc-900 h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <Input />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <Container />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-100 tracking-[-0.1504px] whitespace-pre">Quick amounts</p>
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12.8px] py-[0.8px] relative w-full">
          <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-200 whitespace-pre">$5</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12.8px] py-[0.8px] relative w-full">
          <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-200 whitespace-pre">$10</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12.8px] py-[0.8px] relative w-full">
          <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-200 whitespace-pre">$50</p>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12.8px] py-[0.8px] relative w-full">
          <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-200 whitespace-pre">$100</p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12.8px] py-[0.8px] relative w-full">
          <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-200 whitespace-pre">$500</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Component() {
  return (
    <div className="[grid-area:1_/_1] h-[9px] ml-0 mt-0 relative w-[38.573px]" data-name="Component 1 2 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 9">
        <g id="Component 1 2 1">
          <path d={svgPaths.p32e67900} fill="var(--fill-0, white)" id="Path 5 1" />
          <path d={svgPaths.p26b4ca00} fill="var(--fill-0, white)" id="Path 6 1" />
          <path d={svgPaths.p3f0e3d00} fill="var(--fill-0, white)" id="Path 7 1" />
          <path d={svgPaths.p5b75c00} fill="var(--fill-0, white)" id="Path 8 1" />
          <g id="Group 3 1">
            <path d={svgPaths.p2567c100} fill="var(--fill-0, white)" id="Path 9 1" />
            <path d={svgPaths.p22a40800} fill="var(--fill-0, white)" id="Path 10 1" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Khqr() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[20.896%] mt-[40%] place-items-start relative" data-name="KHQR">
      <Component />
    </div>
  );
}

function Khqr1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="KHQR">
      <div className="[grid-area:1_/_1] h-[40px] ml-0 mt-0 relative w-[67px]" data-name="Fill 1">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67 40">
          <path clipRule="evenodd" d={svgPaths.p3d85eeb0} fill="var(--fill-0, #E1232E)" fillRule="evenodd" id="Fill 1" />
        </svg>
      </div>
      <Khqr />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center leading-[14px] not-italic relative shrink-0" data-name="label">
      <p className="font-['SF_Pro_Display:Semibold',sans-serif] relative shrink-0 text-[#ff001d] text-[12px] text-nowrap whitespace-pre">KHQR</p>
      <p className="font-['SF_Pro_Display:Regular',sans-serif] relative shrink-0 text-[11px] text-zinc-200 w-[176px]">Scan to pay with member bank app</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[319.2px]">
      <Khqr1 />
      <div className="flex flex-row items-center self-stretch">
        <Label />
      </div>
    </div>
  );
}

function Method() {
  return (
    <div className="bg-zinc-900 h-[60px] relative rounded-[8px] shrink-0 w-full" data-name="method">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[60px] items-center px-[12px] py-[4px] relative w-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
      <p className="font-['Arial:Regular',sans-serif] h-[21px] leading-[14px] not-italic relative shrink-0 text-[14px] text-zinc-200 w-full">Payment Method :</p>
      <Method />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[54.414px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[54.414px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Amount:</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-end relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-100 tracking-[-0.1504px] whitespace-pre">$10.00</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.648px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[102.648px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Processing Fee:</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-100 tracking-[-0.1504px] whitespace-pre">$0.00</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[39.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[39.594px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Total:</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[49.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[49.359px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-zinc-100 top-[-0.5px] tracking-[-0.3125px] w-[50px]">$10.00</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="box-border content-stretch flex h-[33px] items-start justify-between pb-0 pt-[9px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-solid border-zinc-700 inset-0 pointer-events-none" />
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-zinc-900 h-[121px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[121px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Container3 />
          <Container4 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function ApiKeyManager() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[462.4px]" data-name="APIKeyManager">
      <Container1 />
      <PrimitiveLabel1 />
      <Container2 />
      <Frame1 />
      <Container6 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-zinc-900 box-border content-stretch flex h-full items-center px-[20px] py-[10px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-white w-[73px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cancel
      </p>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#1b5ba5] box-border content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[10px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Confirm Top Up
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[15px] items-center justify-end relative shrink-0 w-[462.4px]">
      <div className="flex flex-row items-center self-stretch">
        <Button5 />
      </div>
      <Button6 />
    </div>
  );
}

export default function TopUpScreen() {
  return (
    <div className="bg-[#0a0a0f] relative rounded-[10px] size-full" data-name="TopUp Screen">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-start flex flex-wrap gap-0 items-start p-[20px] relative size-full">
          <DialogHeader />
          <Close />
          <ApiKeyManager />
          <Frame2 />
        </div>
      </div>
    </div>
  );
}