function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[18px] text-nowrap text-zinc-200 top-0 tracking-[-0.4395px] whitespace-pre">Top Up Balance</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Add funds to your wallet. Minimum: $5, Maximum: $10,000</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-100 tracking-[-0.1504px] whitespace-pre">Amount (USD) :</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-400 tracking-[-0.1504px] whitespace-pre">50</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[64px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-zinc-200 tracking-[-0.1504px] w-[18px]">$5</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-zinc-200 tracking-[-0.1504px] w-[24px]">$10</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-zinc-200 tracking-[-0.1504px] w-[26px]">$50</p>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-zinc-200 tracking-[-0.1504px] w-[33px]">$100</p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.25)] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[6px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-zinc-200 tracking-[-0.1504px] w-[35px]">$500</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[32px] items-start pl-0 py-0 relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[15px] relative shrink-0 w-[29.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[29.219px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[10px] text-nowrap text-white top-[0.5px] tracking-[0.1172px] whitespace-pre">KHQR</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#e1232e] h-[20px] relative rounded-[4px] shrink-0 w-[51px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-center justify-center relative w-[51px]">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[120.914px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[120.914px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-zinc-300 top-[0.5px] tracking-[-0.1504px] whitespace-pre">Payment via KHQR</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Text1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#71717b] text-[12px] text-nowrap top-px whitespace-pre">You will receive a QR code to scan with your banking app</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-zinc-800 h-[78px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-700 inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[78px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container4 />
          <Paragraph1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[54.414px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[54.414px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Amount:</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[46.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[46.094px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-zinc-100 top-[0.5px] tracking-[-0.1504px] w-[47px]">$50.00</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.648px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[102.648px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Processing Fee:</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[37.586px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[37.586px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-zinc-100 top-[0.5px] tracking-[-0.1504px] whitespace-pre">$0.00</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[39.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[39.594px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-100 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Total:</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[53.328px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-zinc-100 top-[-0.5px] tracking-[-0.3125px] w-[54px]">$50.00</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="box-border content-stretch flex h-[33px] items-start justify-between pb-0 pt-[9px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-solid border-zinc-700 inset-0 pointer-events-none" />
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-zinc-800 h-[123px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-700 inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[123px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container6 />
          <Container7 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[345px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
      <Container5 />
      <Container9 />
    </div>
  );
}

function Button5() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0)] grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[17px] py-[9px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-200 tracking-[-0.1504px] whitespace-pre">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="basis-0 bg-[#1b5ba5] grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">Confirm Top Up</p>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function WalletManagement() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[24px] h-[525px] items-start left-px pb-0 pt-[20px] px-[20px] top-px w-[510px]" data-name="WalletManagement">
      <Container />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function DialogContent() {
  return (
    <div className="absolute left-[-1px] overflow-clip size-px top-[15px]" data-name="DialogContent">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-200 top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Close</p>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute left-[479px] opacity-70 rounded-[2px] size-[16px] top-[17px]" data-name="Primitive.button">
      <Icon />
      <DialogContent />
    </div>
  );
}

export default function TopUpScreen() {
  return (
    <div className="bg-zinc-900 relative rounded-[10px] size-full" data-name="TopUp Screen">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <WalletManagement />
      <PrimitiveButton />
    </div>
  );
}