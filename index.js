//Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Add a delay of 1 second before hiding the preloader
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});
//Preloader END

// Page Up and Page Down with exception for specific elements
window.addEventListener('DOMContentLoaded', (event) => {
    const pages = document.querySelectorAll('.page');
    const contentContainer = document.querySelector('.contentContainer');
    const lastPage = document.body.scrollHeight / window.innerHeight - 1;

    // Scroll to the correct page on load
    const scrollOffset = window.scrollY;
    const currentPage = Math.round(scrollOffset / window.innerHeight);
    window.scrollTo(0, currentPage * window.innerHeight);

    // Smooth scrolling on page change
    document.addEventListener('wheel', (event) => {
        const delta = event.deltaY;
        const currentPageIndex = Math.round(window.scrollY / window.innerHeight);
        let nextPageIndex;

        // Check if the mouse is inside .contentContainer or .C3subcon1
        const isInsideContentContainer = event.target.closest('.contentContainer');
        const isInsideC3subcon1 = event.target.closest('.C3subcon1');

        if (isInsideContentContainer) {
            // Allow default horizontal scrolling behavior
            return;
        }

        if (isInsideC3subcon1) {
            // Allow default scrolling behavior for .C3subcon1
            return;
        }

        if (delta > 0) {
            nextPageIndex = Math.min(currentPageIndex + 1, lastPage); // Move to the next page
        } else {
            nextPageIndex = Math.max(currentPageIndex - 1, 0); // Move to the previous page
        }

        window.scrollTo({
            top: nextPageIndex * window.innerHeight,
            behavior: 'smooth'
        });

        event.preventDefault(); // Prevent the default scroll behavior
    }, { passive: false }); // Set the passive attribute to false to prevent the default behavior
});
// Page Up and Page Down with exception for specific elements END

// Horizontal Scroll Mouse Wheel Control //
const horizontalScrollContainer = document.querySelector('.contentContainer');

horizontalScrollContainer.addEventListener('wheel', function(event) {
    event.preventDefault(); // Prevent default scrolling behavior

    // Calculate the amount to scroll
    const delta = event.deltaX || event.detail || event.wheelDelta;

    // Scroll the element horizontally
    horizontalScrollContainer.scrollLeft += delta;
});
// Horizontal Scroll Mouse Wheel Control - END //

//Parallax on Member Intro
document.querySelector('.memberPRX').addEventListener('mousemove', memberParallax);

function memberParallax(e) {
    const members = document.querySelectorAll('.member');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const parallaxX = (window.innerWidth / 2 - mouseX) / 100;
    const parallaxY = (window.innerHeight / 2 - mouseY) / 100;

    members.forEach(member => {
        const speed = parseFloat(member.dataset.speed);
        const x = parallaxX * speed;
        const y = parallaxY * speed;
        member.style.transform = `translate(${x}px, ${y}px)`;
    });
}
//Parallax on Member Intro END

//Tap Anywhere to Start
document.querySelector('.start').addEventListener('click', function() {
    const nextPageOffset = window.pageYOffset + window.innerHeight;
    window.scrollTo({
        top: nextPageOffset,
        behavior: 'smooth'
    });
});

//Tap Anywhere to Start END

//Fullscreen
// Call restoreFullscreenState() in response to a user action, such as a click event
document.querySelector('.f11').addEventListener('click', toggleFullscreen);

// Check if fullscreen state is stored in localStorage
const isFullscreen = localStorage.getItem('fullscreen');

// Apply fullscreen if necessary
if (isFullscreen === 'true') {
    document.documentElement.requestFullscreen();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        localStorage.setItem('fullscreen', 'true'); // Store fullscreen state in localStorage
    } else {
        document.exitFullscreen();
        localStorage.setItem('fullscreen', 'false'); // Store fullscreen state in localStorage
    }
}
//Fullscreen END

//Page Controller
document.querySelector('.pageDown').addEventListener('click', function() {
    const nextPageOffset = window.pageYOffset + window.innerHeight;
    window.scrollTo({
        top: nextPageOffset,
        behavior: 'smooth'
    });
});
document.querySelector('.pageUp').addEventListener('click', function() {
    const previousPageOffset = window.pageYOffset - window.innerHeight;
    window.scrollTo({
        top: Math.max(previousPageOffset, 0), // Ensure scroll position doesn't go below 0
        behavior: 'smooth'
    });
});
window.addEventListener('scroll', function() {
    const startPage = document.querySelector('.start');
    const pageToggle = document.querySelector('.pageToggle');
    const startPageRect = startPage.getBoundingClientRect();
    
    // Calculate the bottom-center position of the start page
    const bottomCenter = startPageRect.bottom - (startPageRect.height / 2);
    
    // Check if the bottom-center position of the start page is in the viewport
    if (bottomCenter >= 0 && bottomCenter <= window.innerHeight) {
        pageToggle.classList.remove('visible');
    } else {
        pageToggle.classList.add('visible');
    }
});
document.getElementById('f11-2').addEventListener('click', function() {
    // Set stroke color
    this.setAttribute('stroke', '#F7F6ED');
    
    // Set drop-shadow
    this.style.filter = "drop-shadow(0 0 10px rgba(247, 246, 237, 0.4))";
    
    // Enter fullscreen mode
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
});

// Listen for fullscreen change event
document.addEventListener('fullscreenchange', function() {
    const f11Element = document.getElementById('f11-2');
    
    // If fullscreen mode is exited, reset styles
    if (!document.fullscreenElement) {
        f11Element.setAttribute('stroke', '#363636');
        f11Element.style.filter = '';
    }
});
//Page Controller

//Border Slide
window.addEventListener('scroll', function() {
    const startPage = document.querySelector('.start');
    const onePage = document.querySelector('#XX');
    const borderLeft = document.querySelector('.borderLeft');
    const borderRight = document.querySelector('.borderRight');

    // Function to check if the bottom-center of the viewport is aligned with the element
    function isBottomCenterAligned(element) {
        const elementRect = element.getBoundingClientRect();
        const bottomCenterPosition = window.innerHeight - (elementRect.bottom - elementRect.height / 2);
        return bottomCenterPosition >= 0 && bottomCenterPosition <= window.innerHeight;
    }

    // Check if the bottom-center of the viewport is aligned with the target elements
    const isOnStartOrOne = (startPage && isBottomCenterAligned(startPage)) || (onePage && isBottomCenterAligned(onePage));

    // Toggle slide-out class based on alignment for borderLeft
    if (isOnStartOrOne) {
        borderLeft.classList.add('slide-out');
    } else {
        borderLeft.classList.remove('slide-out');
    }

    // Toggle slide-out class based on alignment for borderRight
    if (isOnStartOrOne) {
        borderRight.classList.add('slide-out-right');
    } else {
        borderRight.classList.remove('slide-out-right');
    }
});
//Border Slide END

//Carousel 1
document.addEventListener('DOMContentLoaded', function() {
    const definitions = document.querySelectorAll('.definition');
    const prevButton = document.querySelector('.navPrev');
    const nextButton = document.querySelector('.navNext');
    let currentIndex = 0;
    let transitioning = false;

    function showSlide(index) {
        if (transitioning) return;

        // Prevent rapid clicking during transition
        transitioning = true;

        // Remove .active class from all slides
        definitions.forEach((definition) => {
            definition.classList.remove('active');
            definition.style.zIndex = ''; // Reset z-index
        });

        // Add .active class to the target slide after a delay
        setTimeout(() => {
            definitions[index].classList.add('active');
            currentIndex = index;

            // Delay the z-index change
            setTimeout(() => {
                definitions[index].style.zIndex = '1';
                transitioning = false;
            }, 200); // Same delay as opacity transition
        }, 200); // Same delay as opacity transition
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % definitions.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + definitions.length) % definitions.length;
        showSlide(prevIndex);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Start the slideshow with the first slide initially active
    showSlide(currentIndex);
});
// Carousel 1 END

// Carousel REDOX 1
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.imgCaro1');
    const prevButton = document.querySelector('.imgPrev');
    const nextButton = document.querySelector('.imgNext');
    let currentIndex = 0;
    let transitioning = false;
    let intervalId; // Variable to hold the interval ID

    function showSlide(index) {
        if (transitioning) return;

        // Prevent rapid clicking during transition
        transitioning = true;

        // Remove .active class from all slides
        slides.forEach((slide) => {
            slide.classList.remove('active');
            slide.style.zIndex = ''; // Reset z-index
        });

        // Add .active class to the target slide after a delay
        setTimeout(() => {
            slides[index].classList.add('active');
            currentIndex = index;

            // Delay the z-index change
            setTimeout(() => {
                slides[index].style.zIndex = '1';
                transitioning = false;
            }, 200); // Same delay as opacity transition
        }, 200); // Same delay as opacity transition

        // Reset the interval when manually navigating
        resetInterval();
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    function startCarousel() {
        intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopCarousel() {
        clearInterval(intervalId); // Clear the interval
    }

    function resetInterval() {
        stopCarousel(); // Stop the carousel
        startCarousel(); // Restart the carousel
    }

    prevButton.addEventListener('click', () => {
        prevSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
    });

    // Start the slideshow with the first slide initially active
    showSlide(currentIndex);
    startCarousel(); // Start the automatic carousel
});

//Carousel REDOX 1 END

//Slide Vertical Carousel
document.addEventListener("DOMContentLoaded", function() {
  const subNames = document.querySelectorAll('.subName1');
  const slides = document.querySelectorAll('.sc');

  // Initially show sc1
  document.getElementById('sc1').style.opacity = '1';
  document.getElementById('sc1').style.zIndex = '1';

  subNames.forEach(function(subName) {
    subName.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      slides.forEach(function(slide) {
        if (slide.id === targetId) {
          setTimeout(function() {
            slide.style.opacity = '1';
            slide.style.zIndex = '1';
          }, 200); // Delay for 200ms
        } else {
          slide.style.opacity = '0';
          slide.style.zIndex = '0';
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
    const subNames = document.querySelectorAll('.subName1');
    const autoPoint = document.querySelector('.autoPoint');
    const slides = document.querySelectorAll('.sc');
    let translateY; // Translation for sc2
    let translateY2; // Translation for sc3

    // Initially show sc1 and set active class for the corresponding subName1
    const initialTargetId = 'sc1';
    const initialSlide = document.getElementById(initialTargetId);
    initialSlide.style.opacity = '1';
    initialSlide.style.zIndex = '1';
    document.querySelector(`[data-target="${initialTargetId}"]`).classList.add('active1');

    // Function to calculate translation values based on viewport height
    function calculateTranslationValues() {
        const viewportHeight = window.innerHeight;

        if (viewportHeight >= 1080) {
            translateY = 360; // Translation for sc2 (1080p)
            translateY2 = 2 * translateY; // Translation for sc3 (1080p)
        } else if (viewportHeight >= 929) {
            translateY = 293.5; // Translation for sc2 (929p)
            translateY2 = 2 * translateY; // Translation for sc3 (929p)
        } else {
            // Default values if resolution not matched
            translateY = 360; // Translation for sc2 (default)
            translateY2 = 716; // Translation for sc3 (default)
        }
    }

    // Initially calculate translation values and set pointer position
    calculateTranslationValues();
    setPointerPosition(initialTargetId);

    // Event listener for viewport resize
    window.addEventListener('resize', function() {
        // Recalculate translation values and update pointer position
        calculateTranslationValues();
        const activeSubName = document.querySelector('.subName1.active1');
        if (activeSubName) {
            const targetId = activeSubName.getAttribute('data-target');
            setPointerPosition(targetId);
        }
    });

    // Function to set pointer position
    function setPointerPosition(targetId) {
        let pointerTranslateY = 0;
        if (targetId === 'sc1') {
            pointerTranslateY = 0;
        } else if (targetId === 'sc2') {
            pointerTranslateY = translateY;
        } else if (targetId === 'sc3') {
            pointerTranslateY = translateY2;
        }
        autoPoint.style.transform = `translateY(${pointerTranslateY}px)`;
    }

    // Add click event listeners to subName1 elements
    subNames.forEach(function(subName) {
        subName.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            // Remove active class from all subName1 elements
            subNames.forEach(function(subName) {
                subName.classList.remove('active1');
            });
            // Add active class to the clicked subName1 element with a delay for the fade effect
            setTimeout(() => {
                this.classList.add('active1');
            }, 10);
            // Set pointer position based on the clicked subName1
            setPointerPosition(targetId);
            // Toggle opacity for slides
            slides.forEach(function(slide) {
                if (slide.id === targetId) {
                    setTimeout(function() {
                        slide.style.opacity = '1';
                        slide.style.zIndex = '1';
                    }, 200); // Delay for 200ms
                } else {
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';
                }
            });
        });
    });
});
//Slide Vertical Carousel END

//SC Carousel 1
document.addEventListener('DOMContentLoaded', function() {
    const scGroups = document.querySelectorAll('.scGroup');
    const scPrevs = document.querySelectorAll('.scPrev');
    const scNexts = document.querySelectorAll('.scNext');
    let currentIndex = 0;
    let transitioning = false;

    function showSlide(index) {
        if (transitioning) return;
        transitioning = true;

        // Set opacity and z-index for all slides
        scGroups.forEach((group, i) => {
            if (i === index) {
                group.style.opacity = '1';
                group.style.zIndex = '1';
            } else {
                group.style.opacity = '0';
                group.style.zIndex = '0';
            }
        });

        // Delay for fade-out before transitioning to the next slide
        setTimeout(() => {
            transitioning = false;
            currentIndex = index;
        }, 300); // Delay before fade-out transition ends
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % scGroups.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + scGroups.length) % scGroups.length;
        showSlide(prevIndex);
    }

    scPrevs.forEach((prev) => {
        prev.addEventListener('click', () => {
            prevSlide();
        });
    });

    scNexts.forEach((next) => {
        next.addEventListener('click', () => {
            nextSlide();
        });
    });

    // Show the first slide initially
    showSlide(currentIndex);
});
//SC Carousel 1 END

//C3 Carousel
document.addEventListener('DOMContentLoaded', function() {
    const contentContainer = document.querySelector('.C3Cluster');
    const prevButton = document.querySelector('.C3prev');
    const nextButton = document.querySelector('.C3next');
    const contents = document.querySelectorAll('.C3content');
    let currentIndex = 0;

    function showSlide(index) {
        // Hide all slides
        contents.forEach(content => {
            content.style.transition = 'opacity 0.3s ease-in-out';
            content.style.opacity = '0';
            content.style.zIndex = '0';
        });

        // Show the slide at the given index after a delay
        setTimeout(() => {
            contents[index].style.opacity = '1';
            contents[index].style.zIndex = '1';
        }, 300); // Delay before showing the next slide

        currentIndex = index;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % contents.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + contents.length) % contents.length;
        showSlide(currentIndex);
    }

    // Event listeners for previous and next buttons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Show the first slide initially
    showSlide(currentIndex);
});
//C3 Carousel END

//Parallax 2
// Parallax
document.querySelector('.C3ContentBox').addEventListener('mousemove', C3Parallax);

function C3Parallax(e) {
    const elements = document.querySelectorAll('.c3par');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;
    const parallaxX = (mouseX - midX) / 100;
    const parallaxY = (mouseY - midY) / 100;
    const parallaxXY = (parallaxX + parallaxY) / 2;

    elements.forEach(element => {
        const speed = parseFloat(element.dataset.speed);
        const x = parallaxX * speed;
        const y = parallaxY * speed;
        const z = parallaxXY * speed;
        const rotationYPx = parallaxY * speed;
        element.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotationYPx}deg)`;
    });
}

// Parallax END

//Page Counter
document.addEventListener('DOMContentLoaded', function() {
    // Get the page indicator elements
    const currentPageText = document.querySelector('.pgCounterText');
    const totalPagesText = document.querySelector('.totalPagesText');

    // Function to update the page indicator with transition effect
    function updatePageIndicator() {
        // Get the current page ID and total pages
        const currentPageId = getCurrentPageId();
        const totalPages = getTotalPages();

        // Apply transition class to initiate the fade-in and fade-out effect
        currentPageText.classList.add('fader');

        // Update text content after a brief delay to allow the transition to play
        setTimeout(() => {
            currentPageText.textContent = currentPageId ? currentPageId : 'Unknown';
            totalPagesText.textContent = totalPages;

            // Remove the fade class to allow for the next transition
            setTimeout(() => {
                currentPageText.classList.remove('fader');
            }, 300); // Adjust as needed for your desired transition duration
        }, 50); // Adjust as needed to allow for the fade class to take effect
    }

    // Function to get the current page ID
    function getCurrentPageId() {
        // Get all the .page elements
        const pages = document.querySelectorAll('.page');

        // Get the current scroll position and viewport height
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;

        // Calculate the center of the viewport
        const viewportCenter = scrollTop + viewportHeight / 2;

        // Iterate over the .page elements
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const pageTop = page.offsetTop;
            const pageBottom = pageTop + page.offsetHeight;

            // Check if the viewport center is within the bounds of the current page
            if (viewportCenter >= pageTop && viewportCenter <= pageBottom) {
                // Return the current page index
                return i + 1;
            }
        }

        // Return an empty string if no page is found
        return '';
    }

    // Function to get the total number of pages
    function getTotalPages() {
        return document.querySelectorAll('.page').length;
    }

    // Update the page indicator when the page scrolls
    window.addEventListener('scroll', updatePageIndicator);

    // Initial page indicator update
    updatePageIndicator();
});

document.addEventListener('DOMContentLoaded', function() {
    const pageCounter = document.querySelector('.pageCounter');
    const startElement = document.querySelector('.start');

    // Function to hide the pageCounter element immediately
    function hidePageCounter() {
        pageCounter.classList.add('hidden1');
    }

    // Function to show the pageCounter element
    function showPageCounter() {
        pageCounter.classList.remove('hidden1');
    }

    // Event listener for when the user enters the start element
    startElement.addEventListener('mouseenter', hidePageCounter);

    // Event listener for when the user leaves the start element
    startElement.addEventListener('mouseleave', showPageCounter);
});
//Page Counter END

//Carousel C5
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.c52');
    const prevButton = document.querySelector('.c5Prev');
    const nextButton = document.querySelector('.c5Next');
    let currentIndex = 0;

    // Function to show the current slide with fade-in-out transition
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.transition = 'opacity 400ms ease-in-out';
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        });

        // Display the current slide with fade-in transition
        setTimeout(() => {
            slides[index].style.opacity = '1';
            slides[index].style.zIndex = '1';
        }, 300); // Delay for fade-in transition
    }

    // Show the initial slide
    showSlide(currentIndex);

    // Event listener for the previous button
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    // Event listener for the next button
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const headTitles = document.querySelectorAll('.headTitle');
    const cf5Elements = document.querySelectorAll('.cf5');
    const htPoint = document.querySelector('.htPoint');
    const pointerMoveDistance = 476; // Distance to move the pointer to the right for each headTitle

    // Function to show the corresponding cf5 element based on the clicked headTitle
    function showCF5Element(id) {
        // Hide all cf5 elements with fade-out transition
        cf5Elements.forEach(cf5 => {
            cf5.style.transition = 'opacity 350ms ease';
            cf5.style.opacity = '0';
            cf5.style.zIndex = '-2';
        });

        // Remove active class from all headTitle elements
        headTitles.forEach(headTitle => {
            headTitle.classList.remove('active2');
        });

        // Show the corresponding cf5 element with fade-in transition after a delay
        const cf5Element = document.getElementById(`cf5${id}`);
        if (cf5Element) {
            setTimeout(() => {
                cf5Element.style.transition = 'opacity 350ms ease';
                cf5Element.style.opacity = '1';
                cf5Element.style.zIndex = '1';
            }, 200); // Delay of 200ms between fade-in and fade-out

            // Add active class to the clicked headTitle
            const headTitle = document.getElementById(`F${id}`);
            if (headTitle) {
                headTitle.classList.add('active2');
                // Calculate and set the position of the pointer
                const pointerPosition = (id - 1) * pointerMoveDistance + 120    ; // Initial position + distance to move for each headTitle
                htPoint.style.left = `${pointerPosition}px`;
            }
        }
    }

    // Add click event listeners to each headTitle
    headTitles.forEach(headTitle => {
        headTitle.addEventListener('click', function() {
            const id = this.id.replace('F', '');
            showCF5Element(id);
        });
    });

    // Show the first cf5 element initially
    showCF5Element('1');
});
//Carousel C5 END

//Carousel Balancing Slideshow
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.cfr5ct');
    const dots = document.querySelectorAll('.rcf5R_SQ');
    const cf5R = document.querySelector('.cf5R');

    // Initialize the first slide as active
    slides[0].classList.add('active4');
    slides[0].style.zIndex = '1';

    // Add event listener to cf5R container for slide-by-tap functionality
    cf5R.addEventListener('click', function() {
        // Find the index of the current active slide
        const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active4'));

        // Calculate the index of the next slide
        const nextIndex = (currentIndex + 1) % slides.length;

        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active4');
            slide.style.zIndex = '-1';
        });

        // Show the next slide
        slides[nextIndex].classList.add('active4');
        slides[nextIndex].style.zIndex = '1';

        // Update the dot indicator
        dots.forEach(dot => dot.classList.remove('active3'));
        dots[nextIndex].classList.add('active3');
    });

    // Add event listener to dot indicators for slide navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active3'));

            // Add active class to the clicked dot
            this.classList.add('active3');

            // Remove active class from all slides
            slides.forEach(slide => {
                slide.classList.remove('active4');
                slide.style.zIndex = '-1';
            });

            // Show the corresponding slide
            slides[index].classList.add('active4');
            slides[index].style.zIndex = '1';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cf5Container = document.getElementById('cf52');
    const slides = cf5Container.querySelectorAll('.cfr51ct');
    const dots = cf5Container.querySelectorAll('.rcf5R_SQ2');

    // Initialize the first slide as active
    slides[0].classList.add('active4');
    slides[0].style.zIndex = '1';

    // Add event listener to cf5Container for slide-by-tap functionality
    cf5Container.addEventListener('click', function() {
        // Find the index of the current active slide
        const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active4'));

        // Calculate the index of the next slide
        const nextIndex = (currentIndex + 1) % slides.length;

        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active4');
            slide.style.zIndex = '-1';
        });

        // Show the next slide
        slides[nextIndex].classList.add('active4');
        slides[nextIndex].style.zIndex = '1';

        // Update the dot indicator
        dots.forEach(dot => dot.classList.remove('active3'));
        dots[nextIndex].classList.add('active3');
    });

    // Add event listener to dot indicators for slide navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active3'));

            // Add active class to the clicked dot
            this.classList.add('active3');

            // Remove active class from all slides
            slides.forEach(slide => {
                slide.classList.remove('active4');
                slide.style.zIndex = '-1';
            });

            // Show the corresponding slide
            slides[index].classList.add('active4');
            slides[index].style.zIndex = '1';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cf5Container = document.getElementById('cf53');
    const slides = cf5Container.querySelectorAll('.cfr52ct');
    const dots = cf5Container.querySelectorAll('.rcf5R_SQ3');

    // Initialize the first slide as active
    slides[0].classList.add('active4');
    slides[0].style.zIndex = '1';

    // Add event listener to cf5Container for slide-by-tap functionality
    cf5Container.addEventListener('click', function() {
        // Find the index of the current active slide
        const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active4'));

        // Calculate the index of the next slide
        const nextIndex = (currentIndex + 1) % slides.length;

        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active4');
            slide.style.zIndex = '-1';
        });

        // Show the next slide
        slides[nextIndex].classList.add('active4');
        slides[nextIndex].style.zIndex = '1';

        // Update the dot indicator
        dots.forEach(dot => dot.classList.remove('active3'));
        dots[nextIndex].classList.add('active3');
    });

    // Add event listener to dot indicators for slide navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active3'));

            // Add active class to the clicked dot
            this.classList.add('active3');

            // Remove active class from all slides
            slides.forEach(slide => {
                slide.classList.remove('active4');
                slide.style.zIndex = '-1';
            });

            // Show the corresponding slide
            slides[index].classList.add('active4');
            slides[index].style.zIndex = '1';
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.cf6Box');
    const menus = document.querySelectorAll('.c6menu');

    // Add event listener to each menu item
    menus.forEach((menu, index) => {
        menu.addEventListener('click', function() {
            // Remove .show class from all boxes
            boxes.forEach(box => {
                box.classList.remove('show');
            });

            // Remove .select class from all menu items
            menus.forEach(menu => {
                menu.classList.remove('select');
            });

            // Add .show class to the corresponding box
            boxes[index].classList.add('show');

            // Add .select class to the clicked menu item
            this.classList.add('select');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const c6menus = document.querySelectorAll('.c6menu');
    const c6menuABSes = document.querySelectorAll('.c6menuABS');

    c6menus.forEach((c6menu, index) => {
        c6menu.addEventListener('click', function() {
            // Remove ABSactive class from all c6menuABSes
            c6menuABSes.forEach(c6menuABS => {
                c6menuABS.classList.remove('ABSactive');
            });

            // Add ABSactive class to the corresponding c6menuABS
            c6menuABSes[index].classList.add('ABSactive');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const c6menuItems = document.querySelectorAll('.c6menu');
    const c6slider = document.querySelector('.c6slider');
  
    c6menuItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        const translateYValue = index * 100.1; // Calculate translateY value
        c6slider.style.transform = `translateY(${translateYValue}%)`; // Apply translateY to slider
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const contentPorts = document.querySelectorAll('.contentPort');
  
    contentPorts.forEach(port => {
      port.addEventListener('click', function() {
        const contentId = this.id;
        const pageId = getPageId(contentId);
        if (pageId) {
          const page = document.getElementById(pageId);
          if (page) {
            page.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  
    function getPageId(contentId) {
      // Define the mapping between contentPort id and page id
      const mapping = {
        '1': 'two',
        '2': 'three',
        '3': 'four',
        '4': 'five',
        '5': 'six',
        '6': 'seven',
        '7': 'eight',
        '8': 'nine',
        '9': 'ten',
        '10': 'eleven',
        '11': 'twelve',
        '12': 'end',
        // Add more mappings here
      };
      return mapping[contentId];
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    const cf7Left = document.querySelector('.cf7Left');

    // Add event listener to cf7Left element
    cf7Left.addEventListener('wheel', function(event) {
        // Prevent the default behavior of scrolling
        event.preventDefault();
        // Stop the propagation of the scroll event
        event.stopPropagation();
        
        // Calculate the amount to scroll
        const delta = event.deltaY || event.detail || event.wheelDelta;

        // Scroll the cf7Left element smoothly
        cf7Left.scrollTo({
            top: cf7Left.scrollTop + delta,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all slides
    const slides = document.querySelectorAll('.cf7image');
    let currentIndex = 0;
    let slideshowInterval;

    // Function to show the next slide
    function showNextSlide() {
        // Hide the current slide
        slides[currentIndex].classList.remove('show1');
        // Move to the next slide
        currentIndex = (currentIndex + 1) % slides.length;
        // Show the next slide
        slides[currentIndex].classList.add('show1');
    }

    // Function to start the slideshow timer
    function startSlideshow() {
        slideshowInterval = setInterval(showNextSlide, 5000);
    }

    // Start the slideshow timer
    startSlideshow();

    // Event listener to advance the slideshow when tapping on cf7Right
    document.querySelector('.cf7Right').addEventListener('click', function() {
        // Clear the interval to pause the slideshow timer
        clearInterval(slideshowInterval);
        // Show the next slide
        showNextSlide();
        // Restart the slideshow timer
        startSlideshow();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.c9BoxContainer');
    let currentIndex = 0;

    // Function to show the current slide
    function showSlide(index) {
        // Hide all slides after a delay
        containers.forEach((container, idx) => {
            setTimeout(() => {
                container.classList.remove('open');
            }, idx * 50); // Adjust delay here
        });

        // Show the slide at the given index after a delay
        setTimeout(() => {
            containers[index].classList.add('open');
        }, containers.length * 50); // Adjust delay here
    }

    // Show the initial slide
    showSlide(currentIndex);

    // Event listener for the previous button
    document.querySelector('.c9Prev').addEventListener('click', function() {
        // Decrement the index
        currentIndex = (currentIndex === 0) ? containers.length - 1 : currentIndex - 1;
        // Show the previous slide
        showSlide(currentIndex);
    });

    // Event listener for the next button
    document.querySelector('.c9Next').addEventListener('click', function() {
        // Increment the index
        currentIndex = (currentIndex === containers.length - 1) ? 0 : currentIndex + 1;
        // Show the next slide
        showSlide(currentIndex);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('enlargeImage');

    // Add click event listener to the image
    image.addEventListener('click', function() {
        // Check if the image is already enlarged
        const isEnlarged = this.classList.contains('enlarged');

        if (isEnlarged) {
            // If already enlarged, revert to original size
            this.classList.remove('enlarged');
        } else {
            // If not enlarged, enlarge the image
            this.classList.add('enlarged');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const c10content = document.querySelector('.c10content');

    // Add event listener to cf7Left element
    c10content.addEventListener('wheel', function(event) {
        // Prevent the default behavior of scrolling
        event.preventDefault();
        // Stop the propagation of the scroll event
        event.stopPropagation();
        
        // Calculate the amount to scroll
        const delta = event.deltaY || event.detail || event.wheelDelta;

        // Scroll the cf7Left element smoothly
        c10content.scrollTo({
            top: c10content.scrollTop + delta,
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const c11content = document.querySelector('.c11content');

    // Add event listener to cf7Left element
    c11content.addEventListener('wheel', function(event) {
        // Prevent the default behavior of scrolling
        event.preventDefault();
        // Stop the propagation of the scroll event
        event.stopPropagation();
        
        // Calculate the amount to scroll
        const delta = event.deltaY || event.detail || event.wheelDelta;

        // Scroll the cf7Left element smoothly
        c11content.scrollTo({
            top: c11content.scrollTop + delta,
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const c10content = document.querySelector('.c10content');

    // Add event listener to cf7Left element
    c10content.addEventListener('wheel', function(event) {
        // Prevent the default behavior of scrolling
        event.preventDefault();
        // Stop the propagation of the scroll event
        event.stopPropagation();
        
        // Calculate the amount to scroll
        const delta = event.deltaY || event.detail || event.wheelDelta;

        // Scroll the cf7Left element smoothly
        c10content.scrollTo({
            top: c10content.scrollTop + delta,
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const c12footer = document.querySelector('.c12footer');

    // Add event listener to cf7Left element
    c12footer.addEventListener('wheel', function(event) {
        // Prevent the default behavior of scrolling
        event.preventDefault();
        // Stop the propagation of the scroll event
        event.stopPropagation();
        
        // Calculate the amount to scroll
        const delta = event.deltaY || event.detail || event.wheelDelta;

        // Scroll the cf7Left element smoothly
        c12footer.scrollTo({
            top: c12footer.scrollTop + delta,
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const recallButton = document.getElementById('container');

    recallButton.addEventListener('click', function() {
        const targetPage = document.getElementById('one');
        if (targetPage) {
            targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

