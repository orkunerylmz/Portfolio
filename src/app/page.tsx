"use client";

import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";
import InteractiveGrid from "@/components/InteractiveGrid";
import ProjectCarousel from "@/components/ProjectCarousel";

// SVG Icons
const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324A4.162 4.162 0 0112 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
};

const skills = [
  { name: "Python", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" /></svg> },
  { name: "TensorFlow", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.416 0L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603l6.153 3.564.015-5.31z" /></svg> },
  { name: "Pandas", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.456zm4.213 2.559h2.623v2.57H8.669zm0 4.151h2.623v5.447H8.669zm0-11.187h2.623v5.446H8.669z" /></svg> },
  { name: "NumPy", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.315 4.876L6.3 2.834l-4.248 2.31 3.926 2.015zm.052 1.1l-4.07 2.09v8.31l4.07-2.09zm1.1.047v8.167l3.964 2.075v-8.195zm4.116 10.39l-4.07 2.09v3.443l4.07-2.09zm4.864-10.39v-.001l-3.764-1.92-4.015 2.06 3.854 2.02zm-8.93-4.438l3.966 2.022 4.12-2.115L15.5.459z" /></svg> },
  { name: "SQL", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4m0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z" /></svg> },
  { name: "Scikit-learn", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> },
  { name: "Streamlit", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525 2.138a.95.95 0 0 0-1.05 0L0 9.06l11.476 6.924a.95.95 0 0 0 1.05 0L24 9.06zM0 11.94v2.12L11.476 21a.95.95 0 0 0 1.05 0L24 14.06v-2.12l-11.476 6.924a.95.95 0 0 1-1.05 0z" /></svg> },
  { name: "PyQt", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
  { name: "Matplotlib", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 17l3-4 2 2.5 3-4 4 5H7z" /></svg> },
  { name: "PostgreSQL", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-61162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" /></svg> },
  { name: "Microsoft SQL Server", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.058 15.858A21.159 21.159 0 0 0 16 16.449a21.159 21.159 0 0 0-7.438-1.194c-1.864-.727-2.525-1.535-2.525-2V9.7A10.357 10.357 0 0 1 8.121 10.776A22.293 22.293 0 0 1 16 12.078a22.293 22.293 0 0 1 7.879-1.302A10.357 10.357 0 0 1 26 9.7V13.262c0 .465-.342.923-1.036 1.206-.843.348-1.968.618-3.313.805a.774.774 0 0 0-.767-.714V8.538a.774.774 0 0 0 .767.714c1.345-.187 2.47-.457 3.313-.805.694-.283 1.036-.741 1.036-1.206V9.7c-5.11 3.513-11.238 3.513-16 0V6.138c0-.465.342-.923 1.036-1.206.843-.348 1.968-.618 3.313-.805a.774.774 0 0 0 .767.714v4.062a.774.774 0 0 0-.767.714c-1.345.187-2.47.457-3.313.805-.694.283-1.036.741-1.036 1.206v.931c0 .465.342.923 1.036 1.206.843.348 1.968.618 3.313.805a.774.774 0 0 0 .767-.714v4.062a.774.774 0 0 0-.767.714c-1.345.187-2.47.457-3.313.805-.694.283-1.036.741-1.036 1.206v.931c0-.465-.342-.923-1.036-1.206-.843-.348-1.968-.618-3.313-.805a.774.774 0 0 0-.767.714v4.062a.774.774 0 0 0 .767.714c1.345-.187 2.47-.457 3.313-.805C5.658 5.141 6 4.682 6 4.217v3.562a10.357 10.357 0 0 1-2.084-1.076A22.293 22.293 0 0 1 12 1.922a22.36 22.36 0 0 1 7.916 1.302A10.357 10.357 0 0 1 22 9.7V6.138c0-.465-.342-.923-1.036-1.206-.843-.348-1.968-.618-3.313-.805a.774.774 0 0 0-.767.714v4.062a.774.774 0 0 0 .767.714c1.345-.187 2.47-.457 3.313-.805.694-.283 1.036-.741 1.036-1.206V8.186a.774.774 0 0 0-.767-.714c-1.345.187-2.47.457-3.313.805-.694.283-1.036.741-1.036 1.206V9.426a1.1 1.1 0 0 0-.259.938c-.167.218-.259.544-.259.938v3.025c-.167-.218-.259-.544-.259-.938V9.426a1.1 1.1 0 0 0-.259-.938z" /></svg> },
  { name: "Git", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" /></svg> },
  { name: "LangChain", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.0988 5.9175C2.7359 5.9175 0 8.6462 0 12s2.736 6.0825 6.0988 6.0825h11.8024C21.2641 18.0825 24 15.3538 24 12s-2.736-6.0825-6.0988-6.0825ZM5.9774 7.851c.493.0124 1.02.2496 1.273.6228.3673.4592.4778 1.0668.8944 1.4932.5604.6118 1.199 1.1505 1.7161 1.802.4892.5954.8386 1.2937 1.1436 1.9975.1244.2335.1257.5202.31.7197.0908.1204.5346.4483.4383.5645.0555.1204.4702.286.3263.4027-.1944.04-.4129.0476-.5616-.1074-.0549.126-.183.0596-.2819.0432a4 4 0 0 0-.025.0736c-.3288.0219-.5754-.3126-.732-.565-.3111-.168-.6642-.2702-.982-.446-.0182.2895.0452.6485-.231.8353-.014.5565.8436.0656.9222.4804-.061.0067-.1286-.0095-.1774.0373-.2239.2172-.4805-.1645-.7385-.007-.3464.174-.3808.3161-.8096.352-.0237-.0359-.0143-.0592.0059-.0811.1207-.1399.1295-.3046.3356-.3643-.2122-.0334-.3899.0833-.5686.1757-.2323.095-.2304-.2141-.5878.0164-.0396-.0322-.0208-.0615.0018-.0864.0908-.1107.2102-.127.345-.1208-.663-.3686-.9751.4507-1.2813.0432-.092.0243-.1265.1068-.1845.1652-.05-.0548-.0123-.1212-.0099-.1857-.0598-.028-.1356-.041-.1179-.1366-.1171-.0395-.1988.0295-.286.0952-.0787-.0608.0532-.1492.0776-.2125.0702-.1216.23-.025.3111-.1126.2306-.1308.552.0814.8155.0455.203.0255.4544-.1825.3526-.39-.2171-.2767-.179-.6386-.1839-.9695-.0268-.1929-.491-.4382-.6252-.6462-.1659-.1873-.295-.4047-.4243-.6182-.4666-.9008-.3198-2.0584-.9077-2.8947-.266.1466-.6125.0774-.8418-.119-.1238.1125-.1292.2598-.139.4161-.297-.2962-.2593-.8559-.022-1.1855.0969-.1302.2127-.2373.342-.3316.0292-.0213.0391-.0419.0385-.0747.1174-.5267.5764-.7391 1.0694-.7267m12.4071.46c.5575 0 1.0806.2159 1.474.6082s.61.9145.61 1.4704c0 .556-.2167 1.078-.61 1.4698v.0006l-.902.8995a2.08 2.08 0 0 1-.8597.5166l-.0164.0047-.0058.0164a2.05 2.05 0 0 1-.474.7308l-.9018.8995c-.3934.3924-.917.6083-1.4745.6083s-1.0806-.216-1.474-.6083c-.813-.8107-.813-2.1294 0-2.9402l.9019-.8995a2.056 2.056 0 0 1 .858-.5143l.017-.0053.0058-.0158a2.07 2.07 0 0 1 .4752-.7337l.9018-.8995c.3934-.3924.9171-.6083 1.4745-.6083zm0 .8965a1.18 1.18 0 0 0-.8388.3462l-.9018.8995a1.181 1.181 0 0 0-.3427.9252l.0053.0572c.0323.2652.149.5044.3374.6917.13.1296.2733.2114.4471.2686a.9.9 0 0 1 .014.1582.884.884 0 0 1-.2609.6304l-.0554.0554c-.3013-.1028-.5525-.253-.7794-.4792a2.06 2.06 0 0 1-.5761-1.0968l-.0099-.0578-.0461.0368a1.1 1.1 0 0 0-.0876.0794l-.9024.8995c-.4623.461-.4623 1.212 0 1.673.2311.2305.535.346.8394.3461.3043 0 .6077-.1156.8388-.3462l.9019-.8995c.4623-.461.4623-1.2113 0-1.673a1.17 1.17 0 0 0-.4367-.2749 1 1 0 0 1-.014-.1611c0-.2591.1023-.505.2901-.6923.3019.1028.57.2694.7962.495.3007.2999.4994.679.5756 1.0968l.0105.0578.0455-.0373a1.1 1.1 0 0 0 .0887-.0794l.902-.8996c.4622-.461.4628-1.2124 0-1.6735a1.18 1.18 0 0 0-.8395-.3462Zm-9.973 5.1567-.0006.0006c-.0793.3078-.1048.8318-.506.847-.033.1776.1228.2445.2655.1874.141-.0645.2081.0508.2557.1657.2177.0317.5394-.0725.5516-.3298-.325-.1867-.4253-.5418-.5662-.8709" /></svg> },
  { name: "Docker", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" /></svg> },
  { name: "TypeScript", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" /></svg> },
  { name: "Next.js", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" /></svg> },
];

const projects = [
  {
    name: "Grafiker",
    desc: "Anket verilerini görselleştirmek için özel olarak geliştirilmiş profesyonel bir grafik oluşturma uygulaması.",
    fullDesc: "Grafiker, anket verilerini analiz etmek ve görselleştirmek için tasarlanmış güçlü bir masaüstü uygulamasıdır. CSV ve Excel formatlarındaki verileri okuyabilir; sonuçları profesyonel grafikler ile Word, PDF ve PNG formatlarında dışa aktarabilirsiniz. Tamamen anket verilerine özel olarak geliştirilmiş görselleştirme araçları ve özelleştirilebilir tema seçenekleri sunar.",
    lang: "Python / PyQt6",
    url: "https://github.com/orkunerylmz/Grafiker",
    images: [
      "/images/grafiker/grafiker1.png",
      "/images/grafiker/grafiker2.png",
      "/images/grafiker/grafiker3.png",
      "/images/grafiker/grafiker4.png",
      "/images/grafiker/grafiker5.png",
      "/images/grafiker/grafiker6.png",
      "/images/grafiker/grafiker7.png",
      "/images/grafiker/grafiker8.png",
    ]
  },
  {
    name: "ISTRedMap",
    desc: "İstanbul trafik kazası verilerini Folium heatmap'ler ve kümeleme algoritmaları ile görselleştiren analiz sistemi.",
    fullDesc: "ISTRedMap, İstanbul'daki trafik kazalarını analiz eden kapsamlı bir veri bilimi projesidir. Açık kaynak veri setlerinden toplanan kaza verileri, coğrafi koordinatlarla eşleştirilerek interaktif haritalar üzerinde görselleştirilir. K-Means kümeleme algoritması ile tehlikeli bölgeler tespit edilir, Folium kütüphanesi ile ısı haritaları oluşturulur.",
    lang: "Python",
    url: "https://github.com/orkunerylmz/ISTRedMap",
    images: [
      "/images/istredmap/istredmap1.png",
      "/images/istredmap/istredmap2.png",
      "/images/istredmap/istredmap3.png",
    ]
  },
  {
    name: "IstanbulDash",
    desc: "İstanbul'un tüm ilçelerine ait verilerin elle toplanıp haritalandırılması, grafikleştirilmesi ve bu verilerle çalışan bir chatbot entegrasyonu.",
    fullDesc: "IstanbulDash, İstanbul'un 39 ilçesine ait demografik, ekonomik ve sosyal verileri bir araya getiren kapsamlı bir dashboard projesidir. Nüfus, gelir dağılımı, eğitim istatistikleri gibi veriler interaktif grafikler ve haritalarla sunulur. LangChain tabanlı yapay zeka chatbot entegrasyonu sayesinde kullanıcılar doğal dil ile sorgulama yapabilir.",
    lang: "Python / Data Analysis",
    url: "https://github.com/orkunerylmz/istanbuldash",
    images: [
      "/images/istanbuldash/istanbuldash1.png",
      "/images/istanbuldash/istanbuldash2.png",
    ]
  },
  {
    name: "Z Value Calculator",
    desc: "Z-skoru hesaplamaları için Streamlit tabanlı web uygulaması. İnteraktif görselleştirmeler sunar.",
    fullDesc: "Z Value Calculator, istatistik öğrencileri ve araştırmacılar için geliştirilmiş kullanıcı dostu bir web uygulamasıdır. Normal dağılım üzerinde z-skor hesaplamaları, olasılık dağılımları ve güven aralığı analizleri yapabilirsiniz. Streamlit ile geliştirilmiş interaktif arayüzü sayesinde parametreleri gerçek zamanlı değiştirip sonuçları anında görebilirsiniz.",
    lang: "Python",
    url: "https://github.com/orkunerylmz/Z-Value-Calculator",
    images: [
      "/images/calculator/calculator1.png",
      "/images/calculator/calculator2.png",
      "/images/calculator/calculator3.png",
      "/images/calculator/calculator4.png",
      "/images/calculator/calculator5.png",
      "/images/calculator/calculator6.png",
    ]
  },
  {
    name: "Orkun Eryılmaz (Portfolio)",
    desc: "Next.js ve modern web teknolojileri ile geliştirilmiş interaktif portfolyo sitesi.",
    fullDesc: "Bu web sitesi, projelerimi sergilemek ve profesyonel kimliğimi yansıtmak amacıyla geliştirildi. Next.js 15 (App Router), interaktif grafikler, karmaşık animasyonlar ve Nodemailer tabanlı bir iletişim formu gibi özellikleri barındırır. SEO dostu yapısı ve yüksek performans odaklı tasarımı ile kullanıcı dostu bir deneyim sunar.",
    lang: "Next.js / TypeScript",
    url: "https://github.com/orkunerylmz/Portfolio",
    images: [
      "/images/portfolio/portfolio1.png",
      "/images/portfolio/portfolio2.png",
    ]
  },
];

const pricing = [
  {
    name: "Başlangıç",
    desc: "Küçük projeler için ideal",
    price: "5.000",
    features: [
      "Veri analizi raporu",
      "Temel görselleştirmeler",
      "1 revizyon hakkı",
      "3 günde teslimat",
    ],
  },
  {
    name: "Profesyonel",
    desc: "Orta ölçekli projeler için",
    price: "15.000",
    featured: true,
    features: [
      "Kapsamlı veri analizi",
      "ML model geliştirme",
      "Interaktif dashboard",
      "3 revizyon hakkı",
      "7 günde teslimat",
      "Teknik dokümantasyon",
    ],
  },
  {
    name: "Kurumsal",
    desc: "Büyük ölçekli projeler",
    price: "35.000+",
    features: [
      "End-to-end ML pipeline",
      "Özel model eğitimi",
      "API entegrasyonu",
      "Sınırsız revizyon",
      "Öncelikli destek",
      "Kaynak kod teslimi",
    ],
  },
];

const contacts = [
  { label: "GitHub", value: "github.com/orkunerylmz", icon: "github", url: "https://github.com/orkunerylmz" },
  { label: "LinkedIn", value: "linkedin.com/in/orkunerylmz", icon: "linkedin", url: "https://linkedin.com/in/orkunerylmz" },
  { label: "Email", value: "orkunerylmz@gmail.com", icon: "email", url: "mailto:orkunerylmz@gmail.com" },
  { label: "Instagram", value: "instagram.com/orkunerylmz", icon: "instagram", url: "https://instagram.com/orkunerylmz" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [skillsReady, setSkillsReady] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    setTimeout(() => setSkillsReady(true), 500);
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', privacy: false });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="aurora" />
        <div className="gradient-mesh" />
        <div className="pulse-wave" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
      </div>
      <InteractiveGrid />

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="nav-logo">Orkun <span>ERYILMAZ</span></a>
        <ul className="nav-links">
          <li><a href="#hakkimda">Hakkımda</a></li>
          <li><a href="#yetenekler">Yetenekler</a></li>
          <li><a href="#projeler">Projeler</a></li>
          <li><a href="#fiyatlandirma">Fiyatlandırma</a></li>
          <li><a href="#iletisim">İletişim</a></li>
        </ul>
        <a href="#iletisim" className="nav-cta">Bana Ulaşın</a>

        {/* Hamburger Button */}
        <button
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#hakkimda" onClick={() => setIsMenuOpen(false)}>Hakkımda</a></li>
          <li><a href="#yetenekler" onClick={() => setIsMenuOpen(false)}>Yetenekler</a></li>
          <li><a href="#projeler" onClick={() => setIsMenuOpen(false)}>Projeler</a></li>
          <li><a href="#fiyatlandirma" onClick={() => setIsMenuOpen(false)}>Fiyatlandırma</a></li>
          <li><a href="#iletisim" onClick={() => setIsMenuOpen(false)}>İletişim</a></li>
        </ul>
      </div>

      {/* Main */}
      <main>
        {/* Hero Section */}
        <section className="hero" id="hakkimda">
          <div className="hero-content">
            <div className="hero-text animate">
              <div className="availability-badge">
                <div className="availability-dot" />
                <span className="availability-text">Yeni Projeler & İş Birliği İçin Müsait</span>
              </div>
              <h1>Merhaba, ben <span>Orkun</span></h1>
              <p>
                Veri bilimi ve makine öğrenmesi alanında tutkulu bir geliştiriciyim.
                Karmaşık verileri anlamlı içgörülere dönüştürüyorum.
              </p>
              <div className="hero-buttons">
                <a href="#projeler" className="btn-primary">Projelerimi Gör</a>
                <a href="#iletisim" className="btn-secondary">İletişime Geç</a>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <div className="hero-image-border" />
              <div className="hero-image">
                <div className="hero-image-shine" />

                {/* Hero Card Overlay Info Bar 2.0 */}
                <div className="hero-card-overlay">
                  <div className="overlay-items">
                    <div className="overlay-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                      <span className="overlay-text">AI ENGINEER</span>
                    </div>
                    <div className="overlay-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                      <span className="overlay-text">DATA SCIENTIST</span>
                    </div>
                    <div className="overlay-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                      <span className="overlay-text">ML OPS</span>
                    </div>
                  </div>
                </div>

                <Image
                  src="/images/me.jpeg"
                  alt="Orkun Eryılmaz"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>

        </section>

        {/* Terminal Section - Hakkımda */}
        <div className="terminal-section animate delay-1" id="hakkimda-terminal">
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span className="terminal-title">~/orkun/hakkimda</span>
          </div>
          <div className="terminal-body" style={{ padding: '40px' }}>
            {/* İsim ve Başlık */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '8px',
                fontFamily: 'inherit'
              }}>
                Orkun Eryılmaz
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--accent)',
                fontWeight: 500
              }}>
                Data Scientist & AI Developer
              </p>
            </div>

            {/* Açıklama */}
            <p style={{
              fontSize: '15px',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '600px'
            }}>
              Verinin gücüne inanan, onu anlamlı çözümlere dönüştüren bir geliştiriciyim.
              Makine öğrenmesi ve yapay zeka projelerinde aktif olarak çalışıyor,
              açık kaynak topluluğuna katkıda bulunuyorum. Hedefim: teknolojiyle
              gerçek dünya problemlerini çözmek.
            </p>

            {/* Info Grid */}
            <div className="terminal-info-grid">
              <div className="terminal-info-item">
                <div className="info-label">Eğitim</div>
                <div className="info-value">Bursa Teknik Üniversitesi</div>
                <div className="info-subtext">Veri Bilimi ve Analitiği — 2. Sınıf</div>
              </div>
              <div className="terminal-info-item">
                <div className="info-label">Konum</div>
                <div className="info-value">Bursa, Türkiye</div>
              </div>
              <div className="terminal-info-item">
                <div className="info-label">Odak Alanı</div>
                <div className="info-value">Data Science & AI</div>
              </div>
              <div className="terminal-info-item">
                <div className="info-label">Durum</div>
                <div className="info-value" style={{ color: '#10b981' }}>● Yeni Projelere Müsait</div>
              </div>
            </div>

            {/* Sosyal Linkler */}
            <div className="terminal-social-grid">
              <a href="https://github.com/orkunerylmz" target="_blank" rel="noopener noreferrer" className="terminal-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/orkunerylmz" target="_blank" rel="noopener noreferrer" className="terminal-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                LinkedIn
              </a>
              <a href="mailto:orkunerylmz@gmail.com" className="terminal-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                Email
              </a>
              <a href="https://instagram.com/orkunerylmz" target="_blank" rel="noopener noreferrer" className="terminal-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="section animate delay-2" id="yetenekler">
          <div className="section-title">Yeteneklerim</div>
          <h2 className="section-heading">Teknik Beceriler</h2>
          <p className="section-desc">
            Veri bilimi ve makine öğrenmesi alanında edindiğim teknik yetkinlikler.
          </p>
          <div className="skills-marquee">
            <div className="skills-track">
              {[...skills, ...skills].map((skill, index) => (
                <div key={`${skill.name}-${index}`} className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-name">{skill.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section animate delay-3" id="projeler">
          <div className="section-title">Projelerim</div>
          <h2 className="section-heading">GitHub Projeleri</h2>
          <p className="section-desc">
            Açık kaynak olarak geliştirdiğim yazılım ve veri odaklı projelerim.
          </p>
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.name}
                className="project-card group"
              >
                <div className="project-image-container">
                  <ProjectCarousel images={project.images} name={project.name} />
                  <div className="project-image-overlay" />
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-name hover:text-[var(--accent)] transition-colors"
                    >
                      {project.name}
                    </a>
                    <span className="project-lang">{project.lang}</span>
                  </div>
                  <p className="project-desc">{project.fullDesc}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-details-btn"
                  >
                    <span>GitHub&apos;da Gör</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}

            {/* See More Card */}
            <a
              href="https://github.com/orkunerylmz"
              target="_blank"
              rel="noopener noreferrer"
              className="project-see-more"
            >
              <div className="see-more-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="see-more-text">Daha Fazlası</div>
              <p className="see-more-desc">Tüm projelerimi GitHub üzerinde inceleyin</p>
            </a>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section" id="fiyatlandirma">
          <div className="section-title">Fiyatlandırma</div>
          <h2 className="section-heading">Hizmet Paketleri</h2>
          <p className="section-desc">
            Özel yazılım çözümleri ve veri projeleri için freelance hizmet paketleri.
          </p>
          <div className="pricing-grid">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card ${plan.featured ? "featured" : ""}`}
              >
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-desc">{plan.desc}</div>
                <div className="pricing-price">
                  ₺{plan.price}<span>/proje</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <a href="#iletisim" className="pricing-btn">
                  {plan.featured ? "Hemen Başlayalım" : "Teklif Al"}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="iletisim">
          <div className="section-title">İletişim</div>
          <h2 className="section-heading">Bana Ulaşın</h2>
          <p className="section-desc">
            Proje teklifleri veya işbirliği için benimle iletişime geçebilirsiniz.
          </p>
          <div className="contact-container">
            <div className="contact-info-card">
              <div className="info-header">
                <h3>İletişim Bilgileri</h3>
                <p>Aşağıdaki kanallar üzerinden bana doğrudan ulaşabilir veya formu doldurabilirsiniz.</p>
              </div>
              <div className="info-list">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-item"
                  >
                    <div className="info-icon">
                      {icons[contact.icon as keyof typeof icons]}
                    </div>
                    <div className="info-content">
                      <span className="info-label">{contact.label}</span>
                      <span className="info-value">{contact.value}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="info-footer">
                <p>Genellikle 24 saat içinde yanıt veririm.</p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <div className="hero-image-border" />
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Ad Soyad</label>
                    <input
                      type="text"
                      placeholder="Orkun Eryılmaz"
                      required
                      className="form-input"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>E-posta</label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      required
                      className="form-input"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Telefon</label>
                    <input
                      type="tel"
                      placeholder="0 (5XX) XXX XX XX"
                      className="form-input"
                      value={formData.phone || ''}
                      pattern="0 \([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2}"
                      minLength={17}
                      title="Geçerli bir telefon numarası girin: 0 (5XX) XXX XX XX"
                      onChange={(e) => {
                        // Format phone number: 0 (5XX) XXX XX XX
                        const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                        let formatted = '';
                        if (value.length > 0) formatted = '0';
                        if (value.length > 1) formatted += ' (' + value.slice(1, 4);
                        if (value.length >= 4) formatted += ')';
                        if (value.length > 4) formatted += ' ' + value.slice(4, 7);
                        if (value.length > 7) formatted += ' ' + value.slice(7, 9);
                        if (value.length > 9) formatted += ' ' + value.slice(9, 11);
                        setFormData({ ...formData, phone: formatted });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Konu</label>
                    <input
                      type="text"
                      placeholder="Proje Hakkında"
                      required
                      className="form-input"
                      value={formData.subject || ''}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mesajınız</label>
                  <textarea
                    placeholder="Projenizden kısaca bahsedin..."
                    required
                    className="form-textarea"
                    rows={4}
                    value={formData.message || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    checked={formData.privacy || false}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                  />
                  <label htmlFor="privacy">Kişisel verilerimin işlenmesini kabul ediyorum.</label>
                </div>

                <button type="submit" className={`form-submit ${formStatus === 'error' ? 'error' : ''}`} disabled={formStatus === 'sending'}>
                  <span>{formStatus === 'sending' ? 'Gönderiliyor...' : formStatus === 'sent' ? '✓ Gönderildi!' : formStatus === 'error' ? '✕ Hata Oluştu' : 'Mesaj Gönder'}</span>
                  <div className="btn-glow" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main >

      {/* Footer */}
      < footer className="footer" >
        <div className="footer-content">
          <div className="footer-logo">Orkun<span> ERYILMAZ</span></div>
          <div className="footer-socials">
            {contacts.map((contact) => (
              <a
                key={contact.icon}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title={contact.label}
              >
                {icons[contact.icon as keyof typeof icons]}
              </a>
            ))}
          </div>
          <div className="footer-links">
            <a href="#hakkimda">Hakkımda</a>
            <a href="#yetenekler">Yetenekler</a>
            <a href="#projeler">Projeler</a>
            <a href="#fiyatlandirma">Fiyatlandırma</a>
            <a href="#iletisim">İletişim</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Orkun Eryılmaz. Tüm hakları saklıdır.</div>
        </div>
      </footer >
    </>
  );
}
