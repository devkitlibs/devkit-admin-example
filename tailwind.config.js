import tailwindcssPrimeui from "tailwindcss-primeui";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{vue,js,ts,html}",
    "./src/**/*.{vue,js,ts,html}",
    "./src/app/**/**/**/*.{vue,js,ts,html}",
    "./node_modules/@devkitvue/datalist/dist/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@devkitvue/filemanager//dist/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@devkitvue/form/dist/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@devkitvue/base-components/dist/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@devkitvue/admin/dist/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@devkitvue/dataview/dist/**/*.{vue,js,ts,jsx,tsx}",
    "./formkit.theme.ts",
    "./index.html",
  ],
  safelist: [
    "flex",
    "flex-wrap",
    "grid",
    "block",
    {
      pattern: /^columns-(?:[1-9]|1[0-2])$/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /^basis-(?:[1-9]|1[0-2])$/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /^grid-cols-(?:[1-9]|1[0-2])$/,
      variants: ["sm", "md", "lg", "xl"],
    },
    {
      pattern: /^gap-(?:0|0\.5|1(?:\.5)?|2(?:\.5)?|3(?:\.5)?|4|5|6|7|8)$/,
      variants: ["sm", "md", "lg", "xl"],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssPrimeui],
};
