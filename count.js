document.addEventListener('DOMContentLoaded', function() {
    // Custom count up function
    
    function countUp(element, target, duration) {
     let start = 0; // Start from 0
 
     element.textContent = `${start}`;
 
     // Calculate total number of frames (assuming 60 FPS)
     const totalFrames = Math.floor((duration / 1000) * 60);
     const increment = target / totalFrames; // Calculate increment per frame
 
     const step = () => {
         start += increment;
         if (start < target) {
             element.textContent = Math.ceil(start); // Update the displayed number
             requestAnimationFrame(step); // Continue animating
         } else {
             element.textContent = target; // Ensure the final value is displayed
         }
     };
     
     requestAnimationFrame(step); // Start the animation
 }


     const countUpElements = document.querySelectorAll('.count-animation');

     // Create an intersection observer to trigger the count-up animation when in view
     const observer = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 // Get the element and target number
                 const targetElement = entry.target;
                 const targetNumber = Number(targetElement.getAttribute('data-target'));
                 
                 // Trigger the count-up animation
                 setTimeout(() => {
                     countUp(targetElement, targetNumber, 1500); // 2000ms for the animation duration
                 },Number(targetElement.getAttribute('data-delay') || 100));

                 // Unobserve the element once the animation starts to avoid multiple triggers
                 observer.unobserve(targetElement);
             }
         });
     }, {
         threshold: 0.1 // Trigger when 10% of the element is visible
     });

     // Observe each count-up element
     countUpElements.forEach(element => {
         observer.observe(element);
     });

});
