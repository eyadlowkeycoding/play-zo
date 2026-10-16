const v=n=>`rgb(var(--${n}) / <alpha-value>)`
export default {content:['./index.html','./src/**/*.{ts,tsx}'],theme:{extend:{colors:{bg:v('bg'),fg:v('fg'),card:v('card')},fontFamily:{sans:['Cairo','system-ui','sans-serif']}}},plugins:[]}
