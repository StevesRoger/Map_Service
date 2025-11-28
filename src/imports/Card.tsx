import svgPaths from "./svg-r8jc2x3o9f";
import imgImageRokTenhMapLogo from "figma:asset/a9065e552bc3c9fa34735d604394f06d7713a9fd.png";

function ImageRokTenhMapLogo() {
  return (
    <div className="relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Image (RokTenh Map Logo)">
      <div aria-hidden="true" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 pointer-events-none rounded-[14px]">
        <div className="absolute bg-[rgba(255,255,255,0)] bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 rounded-[14px]" />
        <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border max-w-none object-50%-50% object-cover rounded-[14px] size-full" src={imgImageRokTenhMapLogo} />
      </div>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[40px]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[119.241px]" data-name="Heading 1">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-zinc-100 top-[0.14px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        RokTenh Map
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[24px] w-[119.241px]" data-name="Paragraph">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#9f9fa9] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Map Service Platform
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[40px] relative shrink-0 w-[119.241px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-[119.241px]">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[167.241px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[40px] items-center relative w-[167.241px]">
        <ImageRokTenhMapLogo />
        <Container />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2026_2620)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p14d10c00} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 8H14.6667" id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2026_2620">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SignUp() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.179px]" data-name="SignUp">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[19.179px]">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#9f9fa9] text-[14px] text-nowrap top-[0.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          KH
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[63.179px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center justify-center relative w-[63.179px]">
        <Icon />
        <SignUp />
      </div>
    </div>
  );
}

function SignUp1() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-center justify-between left-[40.57px] top-[20.57px] w-[280px]" data-name="SignUp">
      <Container1 />
      <Button />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-zinc-100 top-[-0.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Create your account
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#9f9fa9] text-[14px] text-nowrap top-[0.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Get started with your free account today
      </p>
    </div>
  );
}

function SignUp2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[56px] items-start left-[40.57px] top-[94.57px] w-[280px]" data-name="SignUp">
      <Heading1 />
      <Paragraph1 />
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-nowrap text-zinc-100 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Full name *
      </p>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-zinc-900 h-[36px] left-0 rounded-[8px] top-0 w-[280px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip pl-[40px] pr-[12px] py-[4px] relative rounded-[inherit] w-[280px]">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-zinc-400 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          John Smith
        </p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.571px] border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1beb9580} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p32ab0300} id="Vector_2" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <Input />
      <Icon1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <Container2 />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-nowrap text-zinc-100 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Email address *
      </p>
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute bg-zinc-900 h-[36px] left-0 rounded-[8px] top-0 w-[280px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip pl-[40px] pr-[12px] py-[4px] relative rounded-[inherit] w-[280px]">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-zinc-400 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          you@company.com
        </p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.571px] border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p24d83580} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd919a80} id="Vector_2" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Icon2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel1 />
      <Container4 />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-nowrap text-zinc-100 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Password *
      </p>
    </div>
  );
}

function Input2() {
  return (
    <div className="absolute bg-zinc-900 h-[36px] left-0 rounded-[8px] top-0 w-[280px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip px-[40px] py-[4px] relative rounded-[inherit] w-[280px]">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-zinc-400 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Create a strong password
        </p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.571px] border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2566d000} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1bf79e00} id="Vector_2" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 14">
            <path d={svgPaths.pcb0000} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[248px] size-[20px] top-[8px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <Input2 />
      <Icon3 />
      <Button1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel2 />
      <Container6 />
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-nowrap text-zinc-100 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Confirm password *
      </p>
    </div>
  );
}

function Input3() {
  return (
    <div className="absolute bg-zinc-900 h-[36px] left-0 rounded-[8px] top-0 w-[280px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip px-[40px] py-[4px] relative rounded-[inherit] w-[280px]">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-zinc-400 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Re-enter your password
        </p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.571px] border-solid border-zinc-800 inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2566d000} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1bf79e00} id="Vector_2" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 14">
            <path d={svgPaths.pcb0000} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[248px] size-[20px] top-[8px]" data-name="Button">
      <Icon6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <Input3 />
      <Icon5 />
      <Button2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel3 />
      <Container8 />
    </div>
  );
}

function Checkbox() {
  return <div className="absolute bg-[#71717b] left-0 rounded-[3px] size-[16px] top-[14px]" data-name="Checkbox" />;
}

function SignUp3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="SignUp">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9f9fa9] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        I agree to the
      </p>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Link">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#51a2ff] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Privacy Policy
      </p>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-[93.848px]" data-name="Link">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#51a2ff] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Terms of Service
      </p>
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="absolute content-start flex flex-wrap gap-[8px] items-start left-[28px] top-[12px] w-[286.098px]" data-name="Primitive.label">
      <SignUp3 />
      <Link />
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9f9fa9] text-[12px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        and
      </p>
      <Link1 />
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[-84.57px] text-[#9f9fa9] text-[12px] top-[-537.71px] w-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Checkbox />
      <PrimitiveLabel4 />
    </div>
  );
}

function SignUp4() {
  return (
    <div className="absolute h-[20px] left-[73.82px] top-[8px] w-[100.348px]" data-name="SignUp">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-nowrap text-white top-[0.57px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Create account
      </p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[190.17px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#155dfc] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <SignUp4 />
      <Icon7 />
    </div>
  );
}

function SignUp5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[412px] items-start left-[40.57px] top-[174.57px] w-[280px]" data-name="SignUp">
      <Container3 />
      <Container5 />
      <Container7 />
      <Container9 />
      <Container10 />
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[24px] left-[187.46px] top-0 w-[50.196px]" data-name="Button">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#51a2ff] text-[16px] text-nowrap top-[0.14px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sign in
      </p>
    </div>
  );
}

function SignUp6() {
  return (
    <div className="absolute h-[24px] left-[40.57px] top-[634.57px] w-[280px]" data-name="SignUp">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[115.35px] text-[#9f9fa9] text-[12px] text-center top-[5.71px] translate-x-[-50%] w-[146px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Already have an account?
      </p>
      <Button4 />
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[145.64px] top-0 w-[96.196px]" data-name="Link">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#51a2ff] text-[12px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        sales@roktenh.io
      </p>
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[120.84px] top-[16px] w-[93.75px]" data-name="Link">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#51a2ff] text-[12px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        @RokTenh_Sales
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[75.1px] text-[#71717b] text-[12px] text-center top-0 translate-x-[-50%] w-[142px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Questions? Contact us at
      </p>
      <Link2 />
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[170.9px] text-[#71717b] text-[12px] text-center top-0 translate-x-[-50%] w-[211px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        or via Telegram
      </p>
      <Link3 />
    </div>
  );
}

function SignUp7() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[42.571px] items-start left-[40.57px] pb-0 pt-[10.571px] px-0 top-[682.57px] w-[280px]" data-name="SignUp">
      <div aria-hidden="true" className="absolute border-[0.571px_0px_0px] border-solid border-zinc-800 inset-0 pointer-events-none" />
      <Paragraph2 />
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-zinc-900 relative rounded-[14px] size-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-[0.571px] border-solid border-zinc-800 inset-0 pointer-events-none rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
      <SignUp1 />
      <SignUp2 />
      <SignUp5 />
      <SignUp6 />
      <SignUp7 />
    </div>
  );
}