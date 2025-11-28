import svgPaths from "./svg-vzz83viz30";
import { imgVisa, img } from "./svg-uzfmd";

/**
 * @figmaAssetKey 49eb3aff38d9a19a659465fcad93bed6baa746c5
 */
function Footer({ className }: { className?: string }) {
  return (
    <div className={className} data-name="Footer">
      <div className="basis-0 content-stretch flex gap-[10px] grow h-full items-center min-h-px min-w-px relative shrink-0" data-name="Search">
        <div className="basis-0 flex flex-col font-['Arial:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#74b5ff] text-[0px]">
          <p className="leading-[20px] text-[12px]">
            <span className="font-['Arial:Regular',sans-serif] not-italic text-[#4483cd]">© </span>2014-2025 All Rights Reserved.
          </p>
        </div>
      </div>
      <div className="content-stretch flex gap-[5px] h-full items-center relative shrink-0" data-name="Text">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#51a2ff] text-[12px] text-nowrap whitespace-pre">We accept :</p>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="payment logos">
          <div className="h-[20px] relative shrink-0 w-[34px]" data-name="Visa">
            <img alt="" className="block max-w-none size-full" src={imgVisa} />
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[16px] h-full items-center justify-end relative shrink-0" data-name="Search">
        <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#51a2ff] text-[12px] text-nowrap text-right">
          <p className="leading-[20px] whitespace-pre">Version : 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
type BadgeProps = {
  className?: string;
  property1?: "suspended" | "active";
};

/**
 * @figmaAssetKey 2b805513df948a436d12c6f374fa42160198849b
 */
function Badge({ className, property1 = "active" }: BadgeProps) {
  if (property1 === "suspended") {
    return (
      <div className={className} data-name="Property 1=suspended">
        <div className="box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#ff6467] text-[12px] text-nowrap whitespace-pre">suspended</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(130,24,26,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
    );
  }
  return (
    <div className={className} data-name="Property 1=active">
      <div className="box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#05df72] text-[12px] text-nowrap whitespace-pre">active</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(13,84,43,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

/**
 * @figmaAssetKey d75a80292426fb9abe362d4713bc071b0d4dbd6e
 */
function Card({ className }: { className?: string }) {
  return (
    <div className={className} data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1412.4px]" data-name="UserManagement">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-full items-start relative w-[1412.4px]">
          <div className="content-stretch flex h-[52px] items-start justify-between relative shrink-0 w-full" data-name="Container">
            <div className="h-[52px] relative shrink-0 w-[472.875px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[52px] items-start relative w-[472.875px]">
                <div className="content-stretch flex gap-[12px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
                  <div className="h-[24px] relative shrink-0 w-[81.484px]" data-name="Heading 3">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[81.484px]">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">John Smith</p>
                    </div>
                  </div>
                  <Badge className="bg-[rgba(3,46,21,0.5)] h-[22px] relative rounded-[8px] shrink-0" />
                </div>
                <div className="content-stretch flex gap-[16px] h-[20px] items-center relative shrink-0" data-name="Container">
                  <div className="relative shrink-0" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center relative">
                      <div className="relative shrink-0 size-[16px]" data-name="Icon">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g id="Icon">
                            <path d={svgPaths.p2f8e7e80} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p17070980} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </g>
                        </svg>
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">john.smith@techcorp.com</p>
                    </div>
                  </div>
                  <div className="relative shrink-0" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center relative">
                      <div className="relative shrink-0 size-[16px]" data-name="Icon">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g clipPath="url(#clip0_107_3791)" id="Icon">
                            <path d={svgPaths.p26187580} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </g>
                          <defs>
                            <clipPath id="clip0_107_3791">
                              <rect fill="white" height="16" width="16" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">+1-555-0123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(0,0,0,0)] h-[32px] relative rounded-[8px] shrink-0 w-[127.125px]" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[127.125px]">
                <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="Icon">
                      <path d={svgPaths.p26b72c80} id="Vector" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[35px] not-italic text-[14px] text-nowrap text-zinc-200 top-[6.5px] tracking-[-0.1504px] whitespace-pre">View Details</p>
              </div>
            </div>
          </div>
          <div className="gap-[16px] grid grid-cols-[repeat(5,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] relative shrink-0 w-full" data-name="Container">
            <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Balance</p>
              </div>
              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#05df72] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[62px]">$850.00</p>
              </div>
            </div>
            <div className="[grid-area:1_/_2] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Paragraph">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#9f9fa9] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Total Spent</p>
              </div>
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Paragraph">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-zinc-100 tracking-[-0.3125px] whitespace-pre">$12450.75</p>
              </div>
            </div>
            <div className="[grid-area:1_/_3] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Requests</p>
              </div>
              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">2,456,789</p>
              </div>
            </div>
            <div className="[grid-area:1_/_4] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">API Keys</p>
              </div>
              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">3</p>
              </div>
            </div>
            <div className="[grid-area:1_/_5] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Registered</p>
              </div>
              <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">1/15/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @figmaAssetKey f7e0b1c0bf01d1f5114b1e1bb41548517ec5b86e
 */
function AppContent({ className }: { className?: string }) {
  return (
    <div className={className} data-name="AppContent">
      <div aria-hidden="true" className="absolute border-[#9f9fa9] border-[0px_0px_0.8px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative shrink-0 w-[1514.84px]">
        <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
          <div className="h-[44px] relative shrink-0 w-[244.288px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[44px] items-center relative w-[244.288px]">
              <div className="relative rounded-[5px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
                  <div className="h-[25px] relative shrink-0 w-[28px]">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[25px] relative w-[28px]">
                      <div className="absolute bottom-[18.65%] left-[0.46%] right-0 top-[0.55%]">
                        <img alt="" className="block max-w-none size-full" src={img} />
                      </div>
                      <div className="absolute bottom-0 left-[23.91%] right-[23.91%] top-[79.07%]" data-name="Vector">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 6">
                          <path d={svgPaths.p222cd000} fill="url(#paint0_linear_84_3434)" id="Vector" />
                          <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_84_3434" x1="7.30394" x2="7.30394" y1="0.144267" y2="4.69361">
                              <stop stopColor="white" stopOpacity="0.6" />
                              <stop offset="1" stopColor="white" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start relative w-full">
                  <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 1">
                    <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-2.2px] whitespace-pre">RokTenh Map</p>
                  </div>
                  <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
                    <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#9f9fa9] text-[11px] text-nowrap top-[-1.2px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Map API Service Platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-0 content-stretch flex gap-[10px] grow h-full items-center justify-end min-h-px min-w-px relative shrink-0">
        <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
          <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
            <div className="absolute inset-[8.333%]" data-name="Vector">
              <div className="absolute inset-[-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
                  <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[8.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-5%_-12.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 19">
                  <path d={svgPaths.p39947b80} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-1/2 left-[8.33%] right-[8.33%] top-1/2" data-name="Vector">
              <div className="absolute inset-[-0.83px_-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 2">
                  <path d="M0.833333 0.833333H17.5" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
          <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Icon">
                <path d={svgPaths.p31962400} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p1f3d9f80} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </g>
            </svg>
          </div>
          <div className="absolute bg-[#fb2c36] left-[24px] rounded-[1.67772e+07px] size-[8px] top-[4px]" data-name="Text" />
        </div>
        <div className="bg-[rgba(159,159,169,0.1)] box-border content-stretch flex gap-[8px] h-[44px] items-center px-[12px] py-0 relative rounded-[10px] shrink-0 w-[127.383px]" data-name="Container">
          <div className="relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">A</p>
            </div>
          </div>
          <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
              <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">admin</p>
            </div>
          </div>
          <div className="relative shrink-0 size-[16px]" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g id="Icon">
                <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[77.112px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[77.112px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-2.2px] whitespace-pre">Dashboard</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[223.2px]" data-name="Button">
      <Icon />
      <Text />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p756c900} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 1.66667L9.5 9.66667" id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21f2c800} id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[59.9px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[59.9px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-2.2px] whitespace-pre">API Keys</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative rounded-[10px] shrink-0 w-[223.2px]" data-name="Button">
      <Icon1 />
      <Text1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_84_3377)" id="Icon">
          <path d={svgPaths.p2e329c00} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p17412500} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M5 5H5.00833" id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M5 15H5.00833" id="Vector_4" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_84_3377">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[94.025px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[94.025px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-2.2px] whitespace-pre">Request Logs</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative rounded-[10px] shrink-0 w-[223.2px]" data-name="Button">
      <Icon2 />
      <Text2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3e8f800} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p11d57a00} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[44.703px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Wallet</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[48px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Icon3 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3055a600} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[48.15px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[48.15px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-2.2px] whitespace-pre">Calculator</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative rounded-[10px] shrink-0 w-[223.2px]" data-name="Button">
      <Icon4 />
      <Text4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1e34ef00} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[109.537px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[109.537px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-2.2px] whitespace-pre">Documentation</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative rounded-[10px] shrink-0 w-[223.2px]" data-name="Button">
      <Icon5 />
      <Text5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pb1f2000} id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3427e900} id="Vector_2" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p11bd83d8} id="Vector_3" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1d1b2740} id="Vector_4" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.0433 14.81L13.7242 15.58" id="Vector_5" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p37711d00} id="Vector_6" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.275 15.58L15.9567 14.81" id="Vector_7" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.31 11.5433L18.08 11.2242" id="Vector_8" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.31 13.4567L18.08 13.7758" id="Vector_9" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p31b7b00} id="Vector_10" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_11" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[130.213px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[130.213px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#51a2ff] text-[16px] text-nowrap top-[-2.2px] whitespace-pre">User Management</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(21,93,252,0.2)] box-border content-stretch flex gap-[12px] h-[48px] items-center pl-[16px] pr-0 py-0 relative rounded-[10px] shrink-0 w-[223.2px]" data-name="Button">
      <Icon6 />
      <Text6 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Navigation">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
          <Button />
          <Button1 />
          <Button2 />
          <Button3 />
          <Button4 />
          <Button5 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[84.109px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-zinc-300 top-[0.5px] tracking-[-0.1504px] whitespace-pre">Your Balance</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#00c950] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[150.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[150.922px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px whitespace-pre">Real-time balance updates</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-[197px]" data-name="Container">
      <Container />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex gap-[10px] items-end relative shrink-0" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[40px] not-italic relative shrink-0 text-[24px] text-nowrap text-white tracking-[0.3691px] whitespace-pre">{`$300.00 `}</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow h-full items-end min-h-px min-w-px relative shrink-0" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[9px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">USD</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="box-border content-stretch flex gap-px items-center px-0 py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Text9 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#1b5ba5] h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[32px] items-center justify-center px-[12px] py-[8px] relative w-full">
          <Icon7 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">Top Up Balance</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[rgba(39,39,42,0.5)] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-700 inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[9px] items-start p-[13px] relative w-full">
          <Heading1 />
          <Container1 />
          <Container2 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative shrink-0">
      <Container3 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p22604700} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14069000} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function AppContent1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.852px]" data-name="AppContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[31.852px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px whitespace-pre">Close</p>
      </div>
    </div>
  );
}

function SlotClone() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center pl-0 pr-[0.008px] py-0 relative w-full">
          <Icon8 />
          <AppContent1 />
        </div>
      </div>
    </div>
  );
}

function Navigation1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Navigation">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-center justify-end px-[16px] py-[15px] relative w-full">
          <SlotClone />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">User Management</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Monitor and manage all platform users</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[48px] relative shrink-0 w-[248.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[48px] items-start relative w-[248.07px]">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1066 11.1067" id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex gap-[10px] h-[36px] items-center relative rounded-[8px] shrink-0" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon9 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[-0.1504px] whitespace-pre">Search logs...</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-zinc-900 box-border content-stretch flex h-[40px] items-center px-[12px] py-[4px] relative rounded-[8px] shrink-0 w-[321px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
      <Input />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <Container5 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12824f00} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16.07px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[16.07px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-200 tracking-[-0.1504px] whitespace-pre">All</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0)] grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[13px] py-px relative w-full">
          <PrimitiveSpan />
          <Icon11 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-zinc-900 box-border content-stretch flex h-[40px] items-center px-[12px] py-[4px] relative rounded-[8px] shrink-0 w-[188px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
      <Icon10 />
      <PrimitiveButton />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 10V2" id="Vector" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p23ad1400} id="Vector_2" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p19411800} id="Vector_3" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(0,0,0,0)] box-border content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon12 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-200 tracking-[-0.1504px] whitespace-pre">Export Users</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[20px] items-center justify-end relative shrink-0">
      <Container6 />
      <Button8 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[20px] items-center relative">
        <Frame1 />
        <Frame />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-[1454.4px]" data-name="Container">
      <Container4 />
      <Frame3 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Total Users</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-nowrap text-zinc-100 top-0 tracking-[0.0703px] whitespace-pre">8</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[56px] relative shrink-0 w-[72.586px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[56px] items-start relative w-[72.586px]">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p27a3200} id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p27130800} id="Vector_2" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p18f42980} id="Vector_3" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2ee517c0} id="Vector_4" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function UserManagement() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[195.75px]" data-name="UserManagement">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-start justify-between relative w-[195.75px]">
        <Container8 />
        <Icon13 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_1] bg-zinc-900 relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[17px] pr-px py-[17px] relative size-full">
          <UserManagement />
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Active Users</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-nowrap text-zinc-100 top-0 tracking-[0.0703px] whitespace-pre">5</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[56px] relative shrink-0 w-[81.156px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[56px] items-start relative w-[81.156px]">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p265e2780} id="Vector" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1adb0100} id="Vector_2" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function UserManagement1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[195.75px]" data-name="UserManagement">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-start justify-between relative w-[195.75px]">
        <Container9 />
        <Icon14 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_2] bg-zinc-900 relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[17px] pr-px py-[17px] relative size-full">
          <UserManagement1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Total Balance</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-[-0.5px] not-italic text-[24px] text-zinc-100 top-0 tracking-[0.0703px] w-[164px]">$2859.00</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[56px] relative shrink-0 w-[106.688px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[56px] items-start relative w-[106.688px]">
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M16 2.66667V29.3333" id="Vector" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p30e9cc00} id="Vector_2" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function UserManagement2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[195.75px]" data-name="UserManagement">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-start justify-between relative w-[195.75px]">
        <Container10 />
        <Icon15 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_3] bg-zinc-900 relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[17px] pr-px py-[17px] relative size-full">
          <UserManagement2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Total Revenue</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-[-0.25px] not-italic text-[24px] text-zinc-100 top-0 tracking-[0.0703px] w-[160px]">$28897.40</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[56px] relative shrink-0 w-[118.32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[56px] items-start relative w-[118.32px]">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dcdf880} id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M24 22.6667V12" id="Vector_2" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M17.3333 22.6667V6.66667" id="Vector_3" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M10.6667 22.6667V18.6667" id="Vector_4" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function UserManagement3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[195.75px]" data-name="UserManagement">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-start justify-between relative w-[195.75px]">
        <Container11 />
        <Icon16 />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:1_/_4] bg-zinc-900 relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[17px] pr-px py-[17px] relative size-full">
          <UserManagement3 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[90px] relative shrink-0 w-[1454.4px]" data-name="Container">
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start shrink-0 sticky top-0">
      <Container7 />
      <Container12 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="Heading 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-zinc-100 tracking-[-0.3125px] whitespace-pre">User list results</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(159, 159, 169, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1333 1">
            <line id="Line 1" opacity="0.6" stroke="var(--stroke-0, #9F9FA9)" x2="1332.4" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[81.484px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[81.484px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">John Smith</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[12px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <div className="bg-[rgba(3,46,21,0.5)] h-[22px] relative rounded-[8px] shrink-0" data-name="Badge">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#05df72] text-[12px] text-nowrap whitespace-pre">active</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(13,84,43,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2f8e7e80} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17070980} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center relative">
        <Icon17 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">john.smith@techcorp.com</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_107_3791)" id="Icon">
          <path d={svgPaths.p26187580} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_107_3791">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center relative">
        <Icon18 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">+1-555-0123</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-center relative shrink-0" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[52px] relative shrink-0 w-[472.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[52px] items-start relative w-[472.875px]">
        <Container13 />
        <Container16 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p26b72c80} id="Vector" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[32px] relative rounded-[8px] shrink-0 w-[127.125px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[127.125px]">
        <Icon19 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[35px] not-italic text-[14px] text-nowrap text-zinc-200 top-[6.5px] tracking-[-0.1504px] whitespace-pre">View Details</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[52px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Button9 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Balance</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#05df72] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[62px]">$850.00</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#9f9fa9] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Total Spent</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-zinc-100 tracking-[-0.3125px] whitespace-pre">$12450.75</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Requests</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">2,456,789</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="[grid-area:1_/_3] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">API Keys</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">3</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="[grid-area:1_/_4] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Registered</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">1/15/2024</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="[grid-area:1_/_5] content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Container24() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(5,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
    </div>
  );
}

function UserManagement4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1412.4px]" data-name="UserManagement">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-full items-start relative w-[1412.4px]">
        <Container18 />
        <Container24 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[728px] items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full" data-name="Container">
      <div className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" data-name="Card">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
        <UserManagement4 />
      </div>
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
      <Card className="bg-zinc-900 box-border content-stretch flex flex-col h-[166px] items-start justify-center p-[21px] relative rounded-[14px] shrink-0" />
    </div>
  );
}

function UserManagement5() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[910px] items-start overflow-clip relative shrink-0 w-full" data-name="UserManagement">
      <Frame2 />
      <Heading2 />
      <Container25 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-black relative shrink-0 w-[1494.4px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[20px] items-center overflow-clip p-[20px] relative rounded-[inherit] w-[1494.4px]">
        <UserManagement5 />
        <Footer className="bg-zinc-900 h-[48px] relative rounded-[14px] shrink-0 w-full" />
      </div>
    </div>
  );
}

function AppContent2() {
  return (
    <div className="bg-[#0a0a0f] content-stretch flex gap-[4.578e_-5px] items-start relative shrink-0 w-full" data-name="AppContent">
      <div className="bg-zinc-900 relative self-stretch shrink-0 w-[256px]" data-name="Sidebar">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[30px] h-full items-center overflow-clip relative rounded-[inherit] w-[256px]">
          <Navigation />
          <Frame4 />
          <Navigation1 />
        </div>
        <div aria-hidden="true" className="absolute border-[0px_0.8px_0px_0px] border-solid border-zinc-800 inset-0 pointer-events-none" />
      </div>
      <MainContent />
    </div>
  );
}

export default function UserManagementRokTenhMap() {
  return (
    <div className="bg-[#0a0a0f] content-stretch flex flex-col items-start relative size-full" data-name="🟢 User Management -RokTenh Map">
      <AppContent className="bg-zinc-900 box-border content-stretch flex h-[76.8px] items-center px-[20px] py-[10px] relative shrink-0 w-[1750px]" />
      <AppContent2 />
    </div>
  );
}