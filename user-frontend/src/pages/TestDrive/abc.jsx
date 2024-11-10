// <!DOCTYPE html>
// <!-- Created By SanikaCoder -->
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>ScrollTrigger Image Zoom | SanikaCoder</title>
//     <link rel="stylesheet" href="style.css">
//     <!-- Font awesome import -->
// </head>
// <body>
//     <div class="wrapper">
//         <div class="content">
//             <section class="section hero"></section>
//             <section class="section gradient-purple"></section>
//             <section class="section gradient-blue"></section>
//         </div>
//         <div class="image-container">
//             <img src="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp" alt="Image">
//         </div>
//     </div>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" integrity="sha512-onMTRKJBKz8M1TnqqDuGBlowlH0ohFzMXYRNebz+yOcc5TQr/zAKsthzhuv0hiyUKEiQEQXEynnXCvNTOk50dg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
//     <script src="style.js"></script>
// </body>
// </html>



// css



// * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
// }

// .wrapper,
// .content {
//     position: relative;
//     width: 100%;
//     z-index: 1;
// }

// .content {
//     overflow-x: hidden;
// }

// .content .section {
//     width: 100%;
//     height: 100vh;
// }

// .content .section.hero {
//     background-image: url(https://images.unsplash.com/photo-1589848315097-ba7b903cc1cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3);
//     background-position: center center;
//     background-repeat: no-repeat;
//     background-size: cover;
// }
// .image-container {
//     width: 100%;
//     height: 100vh;
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     z-index: 2;
//     perspective: 500px;
//     overflow: hidden;
// }

// .image-container img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     object-position: center center;
// }





// js


// console.clear();

// gsap.registerPlugin(ScrollTrigger);

// window.addEventListener("load", () => {
//     gsap
//     .timeline({
//         ScrollTrigger: {
//             trigger: ".wrapper",
//             start: "top top",
//             end: "+=150%",
//             pin: true,
//             scrub: true,
//             markers: true
//         }
//     })
//     .to("img", {
//         scale: 2,
//         z: 350,
//         transformOrigin: "center center",
//         ease: "power1.inOut"
//     })
//     .to(
//         ".section.hero",
//          {
//         scale: 1.1,
//         transformOrigin: "center center",
//         ease "power1.inOut"
//     }
//     "<"
// );
// });