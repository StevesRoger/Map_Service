import svgPaths from "./svg-r4497ei7ml";

function Heading() {
  return (
    <div className="box-border content-stretch flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal gap-[12px] items-center leading-[0] pb-[10px] pt-0 px-0 relative shrink-0 text-center text-white" data-name="Heading">
      <div className="flex flex-col justify-center relative shrink-0 text-[30px] w-[370px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Payment Completed</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[14px] w-[370px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Your payment went through. Thanks for your order!</p>
      </div>
    </div>
  );
}

function IconsSuccess() {
  return (
    <div className="relative shrink-0 size-[90px]" data-name="Icons/Success">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90 90">
        <g id="Icons/Success">
          <circle cx="45" cy="45" fill="var(--fill-0, #1B5BA5)" id="Ellipse 128" r="45" />
          <path clipRule="evenodd" d={svgPaths.pf46ef00} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
        </g>
      </svg>
    </div>
  );
}

function BtnPrimaryBtnSm() {
  return (
    <div className="box-border content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[14px] py-[6px] relative shrink-0" data-name="btn-primary btn-sm">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Get Invoice
      </p>
      <div className="relative shrink-0 size-[20px]" data-name="download">
        <div className="absolute inset-0" data-name="Path">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Path"></g>
          </svg>
        </div>
        <div className="absolute inset-[70.83%_16.67%_12.5%_16.67%]" data-name="Path">
          <div className="absolute inset-[-22.5%_-5.63%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 5">
              <path d={svgPaths.p13efeb80} id="Path" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[45.83%_29.17%_33.33%_29.17%]" data-name="Path">
          <div className="absolute inset-[-18%_-9%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
              <path d={svgPaths.p3bb8de00} id="Path" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[16.67%_47.92%_33.33%_47.92%]" data-name="Path">
          <div className="absolute inset-[-7.5%_-40%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 12">
              <path d="M0.75 0.75V10.75" id="Path" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultButton() {
  return (
    <div className="bg-[#1b5ba5] box-border content-stretch flex flex-col h-[30px] items-center justify-center overflow-clip relative rounded-[5px] shadow-[0px_2px_6px_0px_rgba(115,103,240,0.3)] shrink-0" data-name="Default Button">
      <BtnPrimaryBtnSm />
    </div>
  );
}

function Body() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] items-center overflow-clip pb-[20px] pt-0 px-0 relative shrink-0 w-full" data-name="Body">
      <IconsSuccess />
      <DefaultButton />
    </div>
  );
}

function Body1() {
  return (
    <div className="absolute bg-black box-border content-stretch flex flex-col gap-[20px] items-center justify-center left-0 pb-[15px] pt-[35px] px-[65px] rounded-[6px] top-0 w-[456px]" data-name="Body">
      <Heading />
      <Body />
    </div>
  );
}

function Close() {
  return (
    <div className="absolute bg-[#131722] box-border content-stretch flex gap-[10px] items-center justify-center left-[413px] p-[6px] rounded-[46px] size-[32px] top-[9px]" data-name="Close">
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

export default function SuccessfullyPaid() {
  return (
    <div className="relative size-full" data-name="Successfully paid">
      <Body1 />
      <Close />
    </div>
  );
}