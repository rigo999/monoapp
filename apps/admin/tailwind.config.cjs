/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  // 用于手动切换暗黑模式
  darkMode: 'class',
  // 设置扫描的文件。在编译时，tailwind会扫描这些文件中的tailwind类来生成css。请不要加入.css作为扫描对象，这样会无限循环扫描而导致进程卡死，因为tailwind会自动扫描content中设置的文件中加载的所有css
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
    },
    extend: {},
  },
  plugins: [],
}
