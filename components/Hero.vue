<template>
  <section class="relative overflow-hidden m-[50px] min-h-[85dvh] border-4 rounded-3xl ">
    <div id="hero-bg" >
      <div class="w-3/4 h-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(87,118,255,0.5)_0%,rgba(255,100,255,0)_70%)]"></div>
    </div>
    <div id="hero-container" class="relative flex flex-col justify-center items-center h-[85vh]">
      <div id="hero-nav" class="absolute top-0 left-0 w-full flex justify-between items-center px-[43px] py-[30px]">
        <img src="/assets/logos/imath-logo-light.webp" class="h-[60px]">
        <button class="flex gap-[10px] justify-center items-center  py-[15px] px-[20px] text-[#192764] rounded-[10px]">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 8.5L8.5 5M5.5 8.5L8.5 12M5.5 8.5H16M14 5V2.64286C14 2.01167 13.4883 1.5 12.8571 1.5H2.57764C1.94646 1.5 1.43478 2.01167 1.43478 2.64286V14.3571C1.43478 14.9883 1.94646 15.5 2.57764 15.5H12.8571C13.4883 15.5 14 14.9883 14 14.3571V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Login
        </button>
      </div>
      <div id="hero-content" class="flex flex-grow flex-col justify-center items-center">
        <h1 id="hero-heading" class="font-fredoko font-[800] text-6xl text-[#192764] w-[60%] text-center">Learning Math Sucks So Watch Video’s Instead </h1>
        <div id="hero-buttons" class="w-full p-[50px] flex justify-center gap-[20px]   ">
          <button class="flex gap-[10px] justify-center items-center  py-[15px] px-[20px] bg-[#192764] text-white rounded-[10px]">
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 4V5.5V7M9 5.5H12M6.26048 7.28145L7.99858 12.4957C8.24526 13.2358 7.69444 14 6.91437 14H2.08563C1.30556 14 0.754741 13.2358 1.00142 12.4957L2.73952 7.28145C2.89507 6.81478 3.3318 6.5 3.82372 6.5H5.17628C5.6682 6.5 6.10493 6.81478 6.26048 7.28145ZM5.71793 3.82121L5.32166 4.20474C4.86794 4.64388 4.14408 4.63186 3.7052 4.1779L3.3344 3.79437C2.90612 3.35138 2.90612 2.64862 3.3344 2.20563L3.7052 1.8221C4.14408 1.36814 4.86794 1.35612 5.32166 1.79526L5.71793 2.17879C6.18198 2.62793 6.18198 3.37207 5.71793 3.82121Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Sign Up
          </button>
          <button class="flex gap-[10px] justify-center items-center  py-[15px] px-[20px] bg-[#FF5787] text-white rounded-[10px]">
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4236 1H2.14404C1.51286 1 1.00122 1.51167 1.00122 2.14285V13.8571C1.00122 14.4883 1.51286 15 2.14404 15H12.4236C13.0548 15 13.5664 14.4883 13.5664 13.8571V8V2.14285C13.5664 1.51167 13.0548 1 12.4236 1ZM7.33428 5.75931L9.19854 7.06427C9.8485 7.51924 9.8485 8.48182 9.19854 8.9368L7.33428 10.2418C6.57682 10.772 5.53594 10.2301 5.53594 9.3055V6.69557C5.53594 5.77097 6.57682 5.22909 7.33428 5.75931Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M9.19854 7.06427L7.33428 5.75931C6.57682 5.22909 5.53594 5.77097 5.53594 6.69557V9.3055C5.53594 10.2301 6.57682 10.772 7.33428 10.2418L9.19854 8.9368C9.8485 8.48182 9.8485 7.51924 9.19854 7.06427Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Watch Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>