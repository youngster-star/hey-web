# Hey-Web页面UI建议

添加或修改建议

所有代码均为实例代码

**注：文章提及的组件`……`中组件未必全用**

## HERO

- ✅ 删除浏览文章按钮

- ✅ 在【关于我】中添加一个下载本项目（从GitHub上）并在自己电脑运行的流程使用`https://magicui.design/docs/components/terminal`组件`import {  AnimatedSpan,  Terminal,  TypingAnimation,} from "@/registry/magicui/terminal"`下载`npx shadcn@latest add @magicui/terminal`
  ```html
  import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
  } from "@/registry/magicui/terminal"
  
  export function TerminalDemo() {
    return (
      <Terminal>
        <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>
  
        <AnimatedSpan className="text-green-500">
          ✔ Preflight checks.
        </AnimatedSpan>
  
        <AnimatedSpan className="text-green-500">
          ✔ Verifying framework. Found Next.js.
        </AnimatedSpan>
  
        <AnimatedSpan className="text-green-500">
          ✔ Validating Tailwind CSS.
        </AnimatedSpan>
  
        <AnimatedSpan className="text-green-500">
          ✔ Validating import alias.
        </AnimatedSpan>
  
        <AnimatedSpan className="text-green-500">
          ✔ Writing components.json.
        </AnimatedSpan>
  
        <AnimatedSpan className="text-green-500">
          ✔ Checking registry.
        </AnimatedSpan>
  
        <AnimatedSpan className="text-green-500">
          ✔ Updating tailwind.config.ts
        </AnimatedSpan>
  
        <AnimatedSpan className="text-green-500">
          ✔ Updating app/globals.css
        </AnimatedSpan>
  
        <AnimatedSpan className="text-green-500">
          ✔ Installing dependencies.
        </AnimatedSpan>
  
        <AnimatedSpan className="text-blue-500">
          <span>ℹ Updated 1 file:</span>
          <span className="pl-2">- lib/utils.ts</span>
        </AnimatedSpan>
  
        <TypingAnimation className="text-muted-foreground">
          Success! Project initialization completed.
        </TypingAnimation>
  
        <TypingAnimation className="text-muted-foreground">
          You may now add components.
        </TypingAnimation>
      </Terminal>
    )
  }
  ```

  
- ✅ hero区的头像（不是关于我里面）外可以套上`https://magicui.design/docs/components/orbiting-circles`中组件`import { OrbitingCircles } from "@/registry/magicui/orbiting-circles"`下载`npx shadcn@latest add @magicui/orbiting-circles`
  ```html
  import { OrbitingCircles } from "@/registry/magicui/orbiting-circles"
  
  export function OrbitingCirclesDemo() {
    return (
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
        <OrbitingCircles iconSize={40}>
          <Icons.whatsapp />
          <Icons.notion />
          <Icons.openai />
          <Icons.googleDrive />
          <Icons.whatsapp />
        </OrbitingCircles>
        <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
          <Icons.whatsapp />
          <Icons.notion />
          <Icons.openai />
          <Icons.googleDrive />
        </OrbitingCircles>
      </div>
    )
  }
  
  const Icons = {
    gitHub: () => (
      <svg width="100" height="100" viewBox="0 0 438.549 438.549">
        <path
          fill="currentColor"
          d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
        />
      </svg>
    ),
    notion: () => (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
          fill="#ffffff"
        />
        <path
          d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
          fill="#000000"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    ),
    openai: () => (
      <svg
        width="100"
        height="100"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-black dark:fill-white"
      >
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    ),
    googleDrive: () => (
      <svg
        width="100"
        height="100"
        viewBox="0 0 87.3 78"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
          fill="#0066da"
        />
        <path
          d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
          fill="#00ac47"
        />
        <path
          d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
          fill="#ea4335"
        />
        <path
          d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
          fill="#00832d"
        />
        <path
          d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
          fill="#2684fc"
        />
        <path
          d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
          fill="#ffba00"
        />
      </svg>
    ),
    whatsapp: () => (
      <svg
        width="100"
        height="100"
        viewBox="0 0 175.216 175.552"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="b"
            x1="85.915"
            x2="86.535"
            y1="32.567"
            y2="137.092"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#57d163" />
            <stop offset="1" stopColor="#23b33a" />
          </linearGradient>
          <filter
            id="a"
            width="1.115"
            height="1.114"
            x="-.057"
            y="-.057"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="3.531" />
          </filter>
        </defs>
        <path
          d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
          fill="#b3b3b3"
          filter="url(#a)"
        />
        <path
          d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
          fill="#ffffff"
        />
        <path
          d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
          fill="url(#linearGradient1780)"
        />
        <path
          d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
          fill="url(#b)"
        />
        <path
          d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
          fill="#ffffff"
          fillRule="evenodd"
        />
      </svg>
    ),
  }
  
  ```

  
- ✅ 【关于我】中可添加一个技术栈介绍，然后可添加`https://magicui.design/docs/components/icon-cloud`中组件`import { IconCloud } from "@/registry/magicui/icon-cloud"`下载`npx shadcn@latest add @magicui/icon-cloud`
  ```html
  import { IconCloud } from "@/registry/magicui/icon-cloud"
  
  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ]
  
  export function IconCloudDemo() {
    const images = slugs.map(
      (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
    )
  
    return (
      <div className="relative flex size-full items-center justify-center overflow-hidden">
        <IconCloud images={images} />
      </div>
    )
  }
  
  ```

  
- ✅ 【关于我】按钮样式`https://magicui.design/docs/components/interactive-hover-button`组件`import { InteractiveHoverButton } from "@/registry/magicui/interactive-hover-button"`下载`npx shadcn@latest add @magicui/interactive-hover-button`
  ```html
  import { InteractiveHoverButton } from "@/registry/magicui/interactive-hover-button"
  
  export function InteractiveHoverButtonDemo() {
    return <InteractiveHoverButton>Hover Me</InteractiveHoverButton>
  }
  ```

  

## Scroll Indicator

下面1、2、3等是滑动顺序

1. ✅ `https://magicui.design/docs/components/video-text`组件`import { VideoText } from "@/registry/magicui/video-text""`下载`npx shadcn@latest add @magicui/video-text`内容显示欢迎访问此网站
   ```html
   import { VideoText } from "@/registry/magicui/video-text"
   
   export function VideoTextDemo() {
     return (
       <div className="relative h-[200px] w-full overflow-hidden">
         <VideoText src="https://cdn.magicui.design/ocean-small.webm">
           OCEAN
         </VideoText>
       </div>
     )
   }
   ```

   
2. ✅ `https://www.cult-ui.com/docs/components/shader-lens-blur`组件`import ShaderLensBlur from "@/components/ui/shader-lens-blur"`下载`npx shadcn@latest add https://cult-ui.com/r/shader-lens-blur.json`，你决定展示什么
   ```html
   "use client"
   
   import { useCallback, useId } from "react"
   import { useAtom } from "jotai"
   import { Circle, CircleOff, Sliders, Square, Triangle } from "lucide-react"
   import { motion } from "motion/react"
   
   import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
   import { Label } from "@/components/ui/label"
   import {
     Popover,
     PopoverContent,
     PopoverTrigger,
   } from "@/components/ui/popover"
   import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
   } from "@/components/ui/select"
   import { Separator } from "@/components/ui/separator"
   import { Slider } from "@/components/ui/slider"
   import { Switch } from "@/components/ui/switch"
   
   import ColorPicker from "../ui/color-picker"
   import ShaderLensBlur, { configAtom } from "../ui/shader-lens-blur"
   
   function ShaderLensBlurDemo() {
     return (
       <div className="grid grid-cols-1  gap-8   ">
         <ShaderLensBlur />
         <ShaderBlurConfig />
       </div>
     )
   }
   
   function ShaderBlurConfig() {
     const [config, setConfig] = useAtom(configAtom)
     const id = useId()
     const variationId = `${id}-variation`
     const enableHoverId = `${id}-enable-hover`
     const invertMouseId = `${id}-invert-mouse`
     const widthId = `${id}-width`
     const heightId = `${id}-height`
   
     const handleVariationChange = useCallback(
       (value: string) => {
         setConfig((prev) => ({ ...prev, variation: parseInt(value) }))
       },
       [setConfig]
     )
   
     const handleColorChange = useCallback(
       (key: "color1" | "color2" | "color3" | "color4", value: string) => {
         setConfig((prev) => ({ ...prev, [key]: value }))
       },
       [setConfig]
     )
   
     const handleDimensionChange = useCallback(
       (key: "width" | "height", value: number) => {
         setConfig((prev) => ({ ...prev, [key]: value }))
       },
       [setConfig]
     )
   
     const variationIcons = [
       { icon: Square, label: "Square" },
       { icon: Circle, label: "Solid Circle" },
       { icon: CircleOff, label: "Hollow Circle" },
       { icon: Triangle, label: "Triangle" },
     ]
   
     return (
       <Card className="border-border bg-card text-card-foreground">
         <CardHeader className="border-b border-border">
           <CardTitle className="flex items-center text-lg font-semibold">
             <Sliders className="w-5 h-5 mr-2" />
             Shader Configuration
           </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6 p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-6">
               <div className="space-y-4">
                 <Label
                   htmlFor={variationId}
                   className="text-sm font-medium text-muted-foreground"
                 >
                   Variation
                 </Label>
                 <Select
                   value={config.variation.toString()}
                   onValueChange={handleVariationChange}
                 >
                   <SelectTrigger
                     id={variationId}
                     className="w-full border-border bg-background"
                   >
                     <SelectValue placeholder="Select variation" />
                   </SelectTrigger>
                   <SelectContent className="border-border bg-popover text-popover-foreground">
                     {variationIcons.map((variation, index) => (
                       <SelectItem
                         key={variation.label}
                         value={index.toString()}
                         className="cursor-pointer"
                       >
                         <div className="flex items-center space-x-2">
                           <variation.icon className="w-5 h-5" />
                           <span>- {variation.label}</span>
                         </div>
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
   
               <Separator />
   
               <div className="space-y-4">
                 <h3 className="text-sm font-medium">Colors</h3>
                 <div className="grid grid-cols-2 gap-4">
                   {(["color1", "color2", "color3", "color4"] as const).map(
                     (color) => (
                       <div key={color} className="space-y-2">
                         <Label
                           htmlFor={color}
                           className="block text-sm font-medium text-muted-foreground"
                         >
                           {color}
                         </Label>
                         <Popover>
                           <PopoverTrigger asChild>
                             <motion.button
                               whileHover={{ scale: 1.05 }}
                               whileTap={{ scale: 0.95 }}
                               className="h-10 w-full rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                               style={{ backgroundColor: config[color] }}
                             />
                           </PopoverTrigger>
                           <PopoverContent className="w-64 border-border p-3">
                             <ColorPicker
                               color={config[color]}
                               onChange={(value) =>
                                 handleColorChange(color, value)
                               }
                             />
                           </PopoverContent>
                         </Popover>
                       </div>
                     )
                   )}
                 </div>
               </div>
             </div>
   
             <div className="space-y-6">
               <div className="space-y-4">
                 <h3 className="text-sm font-medium">Options</h3>
                 <div className="flex flex-col space-y-4">
                   <div className="flex items-center justify-between">
                     <Label
                       htmlFor={enableHoverId}
                       className="text-sm font-medium text-muted-foreground"
                     >
                       Enable Hover
                     </Label>
                     <Switch
                       id={enableHoverId}
                       checked={config.enableHover}
                       onCheckedChange={(checked) =>
                         setConfig((prev) => ({ ...prev, enableHover: checked }))
                       }
                     />
                   </div>
                   <div className="flex items-center justify-between">
                     <Label
                       htmlFor={invertMouseId}
                       className="text-sm font-medium text-muted-foreground"
                     >
                       Invert Mouse
                     </Label>
                     <Switch
                       id={invertMouseId}
                       checked={config.invertMouse}
                       onCheckedChange={(checked) =>
                         setConfig((prev) => ({ ...prev, invertMouse: checked }))
                       }
                     />
                   </div>
                 </div>
               </div>
   
               <Separator />
   
               <div className="space-y-4">
                 <h3 className="text-sm font-medium">Dimensions</h3>
                 <div className="space-y-6">
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                       <Label
                         htmlFor={widthId}
                         className="text-sm font-medium text-muted-foreground"
                       >
                         Width
                       </Label>
                       <span className="text-sm text-muted-foreground">
                         {config.width}px
                       </span>
                     </div>
                     <Slider
                       id={widthId}
                       min={100}
                       max={1000}
                       step={10}
                       value={[parseInt(config.width.toString())]}
                       onValueChange={([value]) =>
                         handleDimensionChange("width", value)
                       }
                     />
                   </div>
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                       <Label
                         htmlFor={heightId}
                         className="text-sm font-medium text-muted-foreground"
                       >
                         Height
                       </Label>
                       <span className="text-sm text-muted-foreground">
                         {config.height}px
                       </span>
                     </div>
                     <Slider
                       id={heightId}
                       min={100}
                       max={1000}
                       step={10}
                       value={[parseInt(config.height.toString())]}
                       onValueChange={([value]) =>
                         handleDimensionChange("height", value)
                       }
                     />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>
     )
   }
   export default ShaderLensBlurDemo
   
   ```

   
3. ✅ 热门文章`https://www.cult-ui.com/docs/components/loading-carousel`组件`import { LoadingCarousel } from "../ui/loading-carousel"`下载`npx shadcn@latest add https://cult-ui.com/r/loading-carousel.json`
   ```html
   "use client"
   
   import React from "react"
   
   import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
   
   import { LoadingCarousel } from "../ui/loading-carousel"
   
   export default function LoadingCarouselDemo() {
     return (
       <div className="space-y-8 p-4 w-full">
         <div className="w-full">
           <CardHeader>
             <CardTitle>Default LoadingCarousel</CardTitle>
           </CardHeader>
           <CardContent>
             <LoadingCarousel />
           </CardContent>
         </div>
   
         <div className="w-full">
           <CardHeader>
             <CardTitle>Wide Aspect Ratio with Top Text</CardTitle>
           </CardHeader>
           <CardContent>
             <LoadingCarousel
               aspectRatio="wide"
               textPosition="top"
               showIndicators={false}
             />
           </CardContent>
         </div>
   
         <div className="w-full">
           <CardHeader>
             <CardTitle>Background Tips + Gradient</CardTitle>
           </CardHeader>
           <CardContent>
             <LoadingCarousel
               aspectRatio="wide"
               backgroundTips={true}
               backgroundGradient={true}
             />
           </CardContent>
         </div>
   
         <div className="w-full">
           <CardHeader>
             <CardTitle>Custom Interval and Navigation</CardTitle>
           </CardHeader>
           <CardContent>
             <LoadingCarousel autoplayInterval={2000} showNavigation={true} />
           </CardContent>
         </div>
   
         <div className="w-full">
           <CardHeader>
             <CardTitle>Shuffled Tips with Custom Interval</CardTitle>
           </CardHeader>
           <CardContent>
             <LoadingCarousel
               shuffleTips={true}
               autoplayInterval={3000}
               showProgress={false}
             />
           </CardContent>
         </div>
   
         <div className="w-full">
           <CardHeader>
             <CardTitle>Square Aspect Ratio with Background Tips</CardTitle>
           </CardHeader>
           <CardContent>
             <LoadingCarousel
               aspectRatio="square"
               backgroundTips={true}
               backgroundGradient={true}
             />
           </CardContent>
         </div>
       </div>
     )
   }
   
   ```

   
4. ✅ 推荐照片展示`https://www.cult-ui.com/docs/components/three-d-carousel`组件`import ThreeDPhotoCarousel from "../ui/three-d-carousel"`下载`npx shadcn@latest add https://cult-ui.com/r/three-d-carousel.json`
   ```html
   import ThreeDPhotoCarousel from "../ui/three-d-carousel"
   
   export default function ThreeDPhotoCarouselDemo() {
     return (
       <div className="w-full max-w-4xl">
         <div className="min-h-[500px]  flex flex-col justify-center border border-dashed rounded-lg space-y-4">
           <div className="p-2">
             <ThreeDPhotoCarousel />
           </div>
         </div>
       </div>
     )
   }
   
   ```

   

## EXPLORE

- ✅ 功能展示图标模式使用`https://magicui.design/docs/components/bento-grid`组件`import {  BellIcon,  CalendarIcon,  FileTextIcon,  GlobeIcon,  InputIcon,} from "@radix-ui/react-icons"`下载`import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"`
  ```html
  import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
  } from "@radix-ui/react-icons"
  
  import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid"
  
  const features = [
    {
      Icon: FileTextIcon,
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "/",
      cta: "Learn more",
      background: (
        <img alt="" className="absolute -top-20 -right-20 opacity-60" />
      ),
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: InputIcon,
      name: "Full text search",
      description: "Search through all your files in one place.",
      href: "/",
      cta: "Learn more",
      background: (
        <img alt="" className="absolute -top-20 -right-20 opacity-60" />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: "Multilingual",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
      background: (
        <img alt="" className="absolute -top-20 -right-20 opacity-60" />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: CalendarIcon,
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      href: "/",
      cta: "Learn more",
      background: (
        <img alt="" className="absolute -top-20 -right-20 opacity-60" />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BellIcon,
      name: "Notifications",
      description:
        "Get notified when someone shares a file or mentions you in a comment.",
      href: "/",
      cta: "Learn more",
      background: (
        <img alt="" className="absolute -top-20 -right-20 opacity-60" />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ]
  
  export function BentoDemo() {
    return (
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    )
  }
  
  ```

  

## LATEST

- ✅ 这里不写最新文章，展示最新的说说、备忘录、日记内容：使用`https://magicui.design/docs/components/marquee`组件`import { Marquee } from "@/registry/magicui/marquee"`下载方法`npx shadcn@latest add @magicui/marquee`
  ```html
  import { cn } from "@/lib/utils"
  import { Marquee } from "@/registry/magicui/marquee"
  
  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
  ]
  
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)
  const thirdRow = reviews.slice(0, reviews.length / 2)
  const fourthRow = reviews.slice(reviews.length / 2)
  
  const ReviewCard = ({
    img,
    name,
    username,
    body,
  }: {
    img: string
    name: string
    username: string
    body: string
  }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-36",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    )
  }
  
  export function Marquee3D() {
    return (
      <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform:
              "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
            {thirdRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:20s]" vertical>
            {fourthRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
  
        <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    )
  }
  
  ```

  

- ✅ 删除原有的LATEST最新文章

## STATS

## 相册

- ✅ 相册中相册分类可采用`https://magicui.design/docs/components/lens`组件`import {  Card,  CardContent,  CardDescription,  CardFooter,  CardHeader,  CardTitle,} from "@/components/ui/card"import { Lens } from "@/registry/magicui/lens"`下载`npx shadcn@latest add @magicui/lens`，其中的图片（是相册分类图片不是相册里的内容图片）预览采用`https://magicui.design/docs/components/pixel-image`组件`import { PixelImage } from "@/registry/magicui/pixel-image"`下载`npx shadcn@latest add @magicui/pixel-image`
  ```html
  "use client"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Lens } from "@/registry/magicui/lens"
  
  export function LensDemo() {
    return (
      <Card className="relative max-w-md shadow-none">
        <CardHeader>
          <Lens
            zoomFactor={2}
            lensSize={150}
            isStatic={false}
            ariaLabel="Zoom Area"
          >
            <img
              src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image placeholder"
              width={500}
              height={500}
            />
          </Lens>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl">Your next camp</CardTitle>
          <CardDescription>
            See our latest and best camp destinations all across the five
            continents of the globe.
          </CardDescription>
        </CardContent>
        <CardFooter className="space-x-4">
          <Button>Let&apos;s go</Button>
          <Button variant="secondary">Another time</Button>
        </CardFooter>
      </Card>
    )
  }
  
  ```

  ```html
  import { PixelImage } from "@/registry/magicui/pixel-image"
  
  export function Home() {
    return (
      <PixelImage
        src="/pixel-image-demo.jpg"
        customGrid={{ rows: 4, cols: 6 }}
        grayscaleAnimation
      />
    )
  }
  ```

  

## 夜间模式

- ✅ 项目添加一个夜间模式按钮`https://magicui.design/docs/components/animated-theme-toggler`组件`import { AnimatedThemeToggler } from "@/registry/magicui/animated-theme-toggler"`下载`npx shadcn@latest add @magicui/animated-theme-toggler`
  ```html
  import { AnimatedThemeToggler } from "@/registry/magicui/animated-theme-toggler"
  
  export function AnimatedThemeTogglerDemo() {
    return (
      <div className="flex justify-center p-6">
        <AnimatedThemeToggler />
      </div>
    )
  }
  
  ```

  

## 文章

- ✅ 卡片预览显示`https://www.cult-ui.com/docs/components/cutout-card`中组件`import {  CutoutCard,  CutoutCardAction,  CutoutCardContent,  CutoutCardFooter,  CutoutCardImage,  CutoutCardInsetLabel,  CutoutCardMedia,  CutoutCardOverlay,  CutoutCardPin,  cutoutCardSurfaceClassName,  CutoutCorner,  useCutoutContentStaggerVariants,} from "@/components/ui/cutout-card"`下载`npx shadcn@latest add https://cult-ui.com/r/cutout-card.json`
  ```html
  "use client"
  
  import { motion } from "motion/react"
  
  import {
    CutoutCard,
    CutoutCardAction,
    CutoutCardContent,
    CutoutCardFooter,
    CutoutCardImage,
    CutoutCardInsetLabel,
    CutoutCardMedia,
    CutoutCardOverlay,
    CutoutCardPin,
    cutoutCardSurfaceClassName,
    CutoutCorner,
    useCutoutContentStaggerVariants,
  } from "@/components/ui/cutout-card"
  
  // ============================================================================
  // Demo — full-page showcase matching the original single-component layout
  // ============================================================================
  
  function CutoutCardDemo() {
    const stagger = useCutoutContentStaggerVariants()
  
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <div className="relative w-full max-w-md">
          <CutoutCard className={cutoutCardSurfaceClassName}>
            <CutoutCardMedia className="h-72">
              <CutoutCardImage
                alt="Mountain landscape"
                sizes="(max-width: 768px) 100vw, 448px"
                src="/placeholders/apple-wallpaper.jpg"
              />
              <CutoutCardOverlay />
              <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-card px-5 py-3">
                <span className="font-semibold text-[11px] text-muted-foreground uppercase tracking-widest">
                  Featured
                </span>
                <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-card" />
                <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-card" />
              </CutoutCardInsetLabel>
              <CutoutCardPin className="top-0 right-0 rounded-bl-[16px] bg-primary px-4 py-2 font-semibold text-primary-foreground text-sm shadow-foreground/10 shadow-md ring-1 ring-border/30">
                New
                <CutoutCorner
                  className="absolute top-0 -left-[23px] -rotate-90 text-primary"
                  size={24}
                />
                <CutoutCorner
                  className="absolute right-0 -bottom-[23px] -rotate-90 text-primary"
                  size={24}
                />
              </CutoutCardPin>
            </CutoutCardMedia>
            <CutoutCardContent>
              <motion.div
                animate="show"
                className="contents"
                initial="hidden"
                variants={stagger.container}
              >
                <motion.h2
                  className="mb-2 text-balance font-semibold text-card-foreground text-xl leading-snug"
                  variants={stagger.item}
                >
                  Alpine Adventures
                </motion.h2>
                <motion.p
                  className="mb-4 text-pretty text-muted-foreground text-sm leading-relaxed"
                  variants={stagger.item}
                >
                  Discover breathtaking mountain landscapes and experience the
                  serenity of nature at its finest.
                </motion.p>
                <motion.div variants={stagger.item}>
                  <CutoutCardFooter className="border-border/80 border-t pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-chart-4 to-chart-5 shadow-sm ring-2 ring-card" />
                      <span className="font-medium text-card-foreground text-sm">
                        Sarah Chen
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      5 min read
                    </span>
                  </CutoutCardFooter>
                </motion.div>
              </motion.div>
            </CutoutCardContent>
            <CutoutCardAction className="right-5 bottom-5">
              <button
                className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-md transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
                type="button"
              >
                Read More
              </button>
            </CutoutCardAction>
          </CutoutCard>
        </div>
      </div>
    )
  }
  
  export default CutoutCardDemo
  
  ```

  
