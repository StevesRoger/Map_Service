function Paragraph() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Showing 1 to 10 of 21 users</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PaginationPrevious() {
  return (
    <div className="absolute h-[20px] left-[32px] top-[8px] w-[56.969px]" data-name="PaginationPrevious">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-nowrap text-zinc-200 top-[0.5px] tracking-[-0.1504px] whitespace-pre">Previous</p>
    </div>
  );
}

function PaginationLink() {
  return (
    <div className="absolute h-[36px] left-0 opacity-50 rounded-[8px] top-0 w-[100.969px]" data-name="PaginationLink">
      <Icon />
      <PaginationPrevious />
    </div>
  );
}

function PaginationItem() {
  return (
    <div className="h-[36px] relative shrink-0 w-[100.969px]" data-name="PaginationItem">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[100.969px]">
        <PaginationLink />
      </div>
    </div>
  );
}

function PaginationLink1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] left-0 rounded-[8px] size-[36px] top-0" data-name="PaginationLink">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[14.71px] not-italic text-[14px] text-nowrap text-zinc-100 top-[8.5px] tracking-[-0.1504px] whitespace-pre">1</p>
    </div>
  );
}

function PaginationItem1() {
  return (
    <div className="bg-[rgba(21,93,252,0.2)] relative rounded-[8px] shrink-0 size-[36px]" data-name="PaginationItem">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border relative size-[36px]">
        <PaginationLink1 />
      </div>
    </div>
  );
}

function PaginationLink2() {
  return (
    <div className="absolute left-0 rounded-[8px] size-[36px] top-0" data-name="PaginationLink">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[13.76px] not-italic text-[14px] text-nowrap text-zinc-200 top-[8.5px] tracking-[-0.1504px] whitespace-pre">2</p>
    </div>
  );
}

function PaginationItem2() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="PaginationItem">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border relative size-[36px]">
        <PaginationLink2 />
      </div>
    </div>
  );
}

function PaginationLink3() {
  return (
    <div className="absolute left-0 rounded-[8px] size-[36px] top-0" data-name="PaginationLink">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[13.59px] not-italic text-[14px] text-nowrap text-zinc-200 top-[8.5px] tracking-[-0.1504px] whitespace-pre">3</p>
    </div>
  );
}

function PaginationItem3() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="PaginationItem">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border relative size-[36px]">
        <PaginationLink3 />
      </div>
    </div>
  );
}

function PaginationNext() {
  return (
    <div className="absolute h-[20px] left-[12px] top-[8px] w-[30.688px]" data-name="PaginationNext">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-nowrap text-zinc-200 top-[0.5px] tracking-[-0.1504px] whitespace-pre">Next</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[46.69px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PaginationLink4() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[74.688px]" data-name="PaginationLink">
      <PaginationNext />
      <Icon1 />
    </div>
  );
}

function PaginationItem4() {
  return (
    <div className="h-[36px] relative shrink-0 w-[74.688px]" data-name="PaginationItem">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[74.688px]">
        <PaginationLink4 />
      </div>
    </div>
  );
}

function PaginationContent() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="PaginationContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] items-center justify-end relative size-full">
        <PaginationItem />
        <PaginationItem1 />
        <PaginationItem2 />
        <PaginationItem3 />
        <PaginationItem4 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="box-border content-stretch flex items-center justify-between pb-0 pt-px px-0 relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-solid border-zinc-800 inset-0 pointer-events-none" />
      <Paragraph />
      <PaginationContent />
    </div>
  );
}