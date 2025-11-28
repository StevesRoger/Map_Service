function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#9f9fa9] text-[14px] text-nowrap top-[0.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Filter by date
      </p>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[19.205px] left-0 rounded-[8px] top-0 w-[32px]" data-name="Header Cell">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] left-0 text-[12.8px] text-nowrap text-zinc-400 top-[-1.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Su
      </p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[19.205px] left-[32px] rounded-[8px] top-0 w-[32px]" data-name="Header Cell">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] left-0 text-[12.8px] text-nowrap text-zinc-400 top-[-1.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mo
      </p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[19.205px] left-[64px] rounded-[8px] top-0 w-[32px]" data-name="Header Cell">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] left-0 text-[12.8px] text-nowrap text-zinc-400 top-[-1.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tu
      </p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[19.205px] left-[96px] rounded-[8px] top-0 w-[32px]" data-name="Header Cell">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] left-0 text-[12.8px] text-nowrap text-zinc-400 top-[-1.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        We
      </p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute h-[19.205px] left-[128px] rounded-[8px] top-0 w-[32px]" data-name="Header Cell">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] left-0 text-[12.8px] text-nowrap text-zinc-400 top-[-1.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Th
      </p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute h-[19.205px] left-[160px] rounded-[8px] top-0 w-[32px]" data-name="Header Cell">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] left-0 text-[12.8px] text-nowrap text-zinc-400 top-[-1.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fr
      </p>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute h-[19.205px] left-[192px] rounded-[8px] top-0 w-[32px]" data-name="Header Cell">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] left-0 text-[12.8px] text-nowrap text-zinc-400 top-[-1.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sa
      </p>
    </div>
  );
}

function Un() {
  return (
    <div className="absolute h-[19.205px] left-0 top-0 w-[224px]" data-name="Un10">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <HeaderCell6 />
    </div>
  );
}

function Zn() {
  return (
    <div className="absolute h-[19.205px] left-0 top-0 w-[224px]" data-name="zn8">
      <Un />
    </div>
  );
}

function Button() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        26
      </p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[32px] top-0" data-name="Table Cell">
      <Button />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        27
      </p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] size-[32px] top-0" data-name="Table Cell">
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        28
      </p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[64px] size-[32px] top-0" data-name="Table Cell">
      <Button2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        29
      </p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[96px] size-[32px] top-0" data-name="Table Cell">
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        30
      </p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[128px] size-[32px] top-0" data-name="Table Cell">
      <Button4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        31
      </p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[160px] size-[32px] top-0" data-name="Table Cell">
      <Button5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        1
      </p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[192px] size-[32px] top-0" data-name="Table Cell">
      <Button6 />
    </div>
  );
}

function Sa() {
  return (
    <div className="absolute h-[32px] left-0 top-[8px] w-[224px]" data-name="Sa8">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[32px] top-0" data-name="Table Cell">
      <Button7 />
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        3
      </p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] size-[32px] top-0" data-name="Table Cell">
      <Button8 />
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        4
      </p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[64px] size-[32px] top-0" data-name="Table Cell">
      <Button9 />
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        5
      </p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[96px] size-[32px] top-0" data-name="Table Cell">
      <Button10 />
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        6
      </p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[128px] size-[32px] top-0" data-name="Table Cell">
      <Button11 />
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        7
      </p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[160px] size-[32px] top-0" data-name="Table Cell">
      <Button12 />
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        8
      </p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[192px] size-[32px] top-0" data-name="Table Cell">
      <Button13 />
    </div>
  );
}

function Sa1() {
  return (
    <div className="absolute h-[32px] left-0 top-[48px] w-[224px]" data-name="Sa8">
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        9
      </p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[32px] top-0" data-name="Table Cell">
      <Button14 />
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        10
      </p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] size-[32px] top-0" data-name="Table Cell">
      <Button15 />
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        11
      </p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[64px] size-[32px] top-0" data-name="Table Cell">
      <Button16 />
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        12
      </p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[96px] size-[32px] top-0" data-name="Table Cell">
      <Button17 />
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-zinc-800 h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        13
      </p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[128px] size-[32px] top-0" data-name="Table Cell">
      <Button18 />
    </div>
  );
}

function Button19() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        14
      </p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[160px] size-[32px] top-0" data-name="Table Cell">
      <Button19 />
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        15
      </p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[192px] size-[32px] top-0" data-name="Table Cell">
      <Button20 />
    </div>
  );
}

function Sa2() {
  return (
    <div className="absolute h-[32px] left-0 top-[88px] w-[224px]" data-name="Sa8">
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
    </div>
  );
}

function Button21() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        16
      </p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[32px] top-0" data-name="Table Cell">
      <Button21 />
    </div>
  );
}

function Button22() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        17
      </p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] size-[32px] top-0" data-name="Table Cell">
      <Button22 />
    </div>
  );
}

function Button23() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        18
      </p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[64px] size-[32px] top-0" data-name="Table Cell">
      <Button23 />
    </div>
  );
}

function Button24() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        19
      </p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[96px] size-[32px] top-0" data-name="Table Cell">
      <Button24 />
    </div>
  );
}

function Button25() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        20
      </p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[128px] size-[32px] top-0" data-name="Table Cell">
      <Button25 />
    </div>
  );
}

function Button26() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        21
      </p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[160px] size-[32px] top-0" data-name="Table Cell">
      <Button26 />
    </div>
  );
}

function Button27() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        22
      </p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[192px] size-[32px] top-0" data-name="Table Cell">
      <Button27 />
    </div>
  );
}

function Sa3() {
  return (
    <div className="absolute h-[32px] left-0 top-[128px] w-[224px]" data-name="Sa8">
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
    </div>
  );
}

function Button28() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        23
      </p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[32px] top-0" data-name="Table Cell">
      <Button28 />
    </div>
  );
}

function Button29() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        24
      </p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] size-[32px] top-0" data-name="Table Cell">
      <Button29 />
    </div>
  );
}

function Button30() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        25
      </p>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[64px] size-[32px] top-0" data-name="Table Cell">
      <Button30 />
    </div>
  );
}

function Button31() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        26
      </p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[96px] size-[32px] top-0" data-name="Table Cell">
      <Button31 />
    </div>
  );
}

function Button32() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        27
      </p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[128px] size-[32px] top-0" data-name="Table Cell">
      <Button32 />
    </div>
  );
}

function Button33() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        28
      </p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[160px] size-[32px] top-0" data-name="Table Cell">
      <Button33 />
    </div>
  );
}

function Button34() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        29
      </p>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[192px] size-[32px] top-0" data-name="Table Cell">
      <Button34 />
    </div>
  );
}

function Sa4() {
  return (
    <div className="absolute h-[32px] left-0 top-[168px] w-[224px]" data-name="Sa8">
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
    </div>
  );
}

function Button35() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[7.99px] text-[14px] text-nowrap text-zinc-200 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        30
      </p>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[32px] top-0" data-name="Table Cell">
      <Button35 />
    </div>
  );
}

function Button36() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        1
      </p>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] size-[32px] top-0" data-name="Table Cell">
      <Button36 />
    </div>
  );
}

function Button37() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[64px] size-[32px] top-0" data-name="Table Cell">
      <Button37 />
    </div>
  );
}

function Button38() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        3
      </p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[96px] size-[32px] top-0" data-name="Table Cell">
      <Button38 />
    </div>
  );
}

function Button39() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        4
      </p>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[128px] size-[32px] top-0" data-name="Table Cell">
      <Button39 />
    </div>
  );
}

function Button40() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        5
      </p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[160px] size-[32px] top-0" data-name="Table Cell">
      <Button40 />
    </div>
  );
}

function Button41() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[11.99px] text-[14px] text-nowrap text-zinc-400 top-[6.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        6
      </p>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[192px] size-[32px] top-0" data-name="Table Cell">
      <Button41 />
    </div>
  );
}

function Sa5() {
  return (
    <div className="absolute h-[32px] left-0 top-[208px] w-[224px]" data-name="Sa8">
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[240px] left-0 top-[19.21px] w-[224px]" data-name="Table Body">
      <Sa />
      <Sa1 />
      <Sa2 />
      <Sa3 />
      <Sa4 />
      <Sa5 />
    </div>
  );
}

function Wa() {
  return (
    <div className="absolute h-[259.205px] left-0 top-[40px] w-[224px]" data-name="Wa10">
      <Zn />
      <TableBody />
    </div>
  );
}

function He() {
  return (
    <div className="absolute h-[20px] left-[59.13px] top-[4px] w-[105.741px]" data-name="He13">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-zinc-200 top-[0.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        November 2025
      </p>
    </div>
  );
}

function Jn() {
  return <div className="absolute left-[164.87px] size-0 top-[14px]" data-name="jn8" />;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button42() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] box-border content-stretch flex items-center justify-center left-[4px] opacity-50 p-[0.571px] rounded-[8px] size-[28px] top-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.571px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #E4E4E7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button43() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] box-border content-stretch flex items-center justify-center left-[192px] opacity-50 p-[0.571px] rounded-[8px] size-[28px] top-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.571px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon1 />
    </div>
  );
}

function Hn() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[224px]" data-name="Hn8">
      <He />
      <Jn />
      <Button42 />
      <Button43 />
    </div>
  );
}

function Ea() {
  return (
    <div className="h-[299.205px] relative shrink-0 w-full" data-name="Ea10">
      <Wa />
      <Hn />
    </div>
  );
}

function Ra() {
  return (
    <div className="h-[323.205px] relative rounded-[8px] shrink-0 w-full" data-name="Ra8">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[323.205px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Ea />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[351.205px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Ra />
    </div>
  );
}

function Button44() {
  return (
    <div className="basis-0 bg-zinc-800 grow h-[36px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-full">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[60.36px] text-[14px] text-center text-nowrap text-zinc-300 top-[8.57px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cancel
        </p>
      </div>
    </div>
  );
}

function Button45() {
  return (
    <div className="basis-0 bg-[#1b5ba5] grow h-[36px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-full">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[60.12px] text-[14px] text-center text-nowrap text-white top-[8.57px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Confirm
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Button44 />
      <Button45 />
    </div>
  );
}

function WalletManagement() {
  return (
    <div className="h-[435.205px] relative shrink-0 w-full" data-name="WalletManagement">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[435.205px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Container />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

export default function PrimitiveDiv() {
  return (
    <div className="bg-zinc-900 relative rounded-[8px] size-full" data-name="Primitive.div">
      <div aria-hidden="true" className="absolute border-[0.571px] border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[0.571px] relative size-full">
          <WalletManagement />
        </div>
      </div>
    </div>
  );
}