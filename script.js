const movedCircles = [],
  expandedPositions = [
    { x: 200, y: -575 }, { x: -260, y: -400 }, { x: 170, y: -150 },
    { x: -100, y: -620 }, { x: -200, y: -150 }, { x: 250, y: -350 }
  ],
  positions = [
    { x: 180, y: -500 }, { x: -210, y: -400 }, { x: 120, y: -200 },
    { x: -50, y: -570 }, { x: -150, y: -200 }, { x: 200, y: -350 }
  ],
  originalPositions = [
    { x: -75, y: -30 }, { x: -225, y: -30 }, { x: -375, y: -30 },
    { x: 75, y: -30 }, { x: 225, y: -30 }, { x: 375, y: -30 }
  ],
  imageCatalog = [
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7072.jpeg?v=1731171328890', 
      keyword: 'Empty-Astronaut-Suit', 
      displayText: 'Astronaut' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7067.jpeg?v=1731170966366', 
      keyword: 'Friendly-Looking-Alien', 
      displayText: 'Alien' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7075.jpeg?v=1731171636118', 
      keyword: 'Person-Hiking', 
      displayText: 'Hiker' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7065.jpeg?v=1731170861664', 
      keyword: 'Adventure-Themed-Landscape', 
      displayText: 'Adventure' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7066.jpeg?v=1731170919193', 
      keyword: 'At-Night', 
      displayText: 'Starry-Night' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7073.jpeg?v=1731171381332', 
      keyword: 'Disco-Themed-Surroundings', 
      displayText: 'Disco' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7070.jpeg?v=1731171217613', 
      keyword: 'Beret-Accessory', 
      displayText: 'Beret' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7069.jpeg?v=1731171098010', 
      keyword: 'Flower Crown-Accessory', 
      displayText: 'Flower Crown' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7074.jpeg?v=1731171585783', 
      keyword: 'One+pair+of+sunglasses+on', 
      displayText: 'Sunglasses' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7071.jpeg?v=1731171286497', 
      keyword: 'Beach-Surrounding', 
      displayText: 'Beach' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7064.jpeg?v=1731170810043', 
      keyword: 'Desert-Landscape', 
      displayText: 'Desert' 
    },
    { 
      src: 'https://cdn.glitch.global/183b7b5d-2aaf-4a73-b187-fa6c48ffe928/IMG_7068.jpeg?v=1731171054965', 
      keyword: 'Empty-City', 
      displayText: 'City' 
    }
  ].sort(() => Math.random() - 0.5);

function distributeCircles() {
  const containerWidth = window.innerWidth; // Get the screen width
  const numCircles = originalPositions.length; // Number of circles
  const minSpacing = 20; // Minimum spacing between circles (increased for more space)
  let maxCircleSize = 70; // Initial maximum circle size

  // Check if the screen width is small enough to hide the 6th circle
  const isSmallScreen = containerWidth < 768; // You can adjust this value based on your design

  // If it's a small screen, hide the 6th circle (circle at index 5)
  const visibleCircles = isSmallScreen ? numCircles - 1 : numCircles;

  // Calculate available space for circles and spacing
  const totalMinSpacing = (visibleCircles - 1) * minSpacing;
  const maxTotalCircleSize = containerWidth - totalMinSpacing;

  // Adjust maxCircleSize based on available space
  const actualSpacing = Math.max(
    minSpacing,
    Math.floor((containerWidth - maxCircleSize * visibleCircles) / (visibleCircles - 1))
  );

  // If the screen is small, increase spacing to spread out circles
  const adjustedSpacing = isSmallScreen ? actualSpacing * 1.8 : actualSpacing; // Increase spacing on small screens

  // Calculate the center of the container
  const centerX = containerWidth / 2;

  // Adjust the originalPositions array based on dynamic spacing
  let currentPosition = -((visibleCircles - 1) * (maxCircleSize + adjustedSpacing)) / 2; // Start from the left side of the center

  for (let i = 0; i < visibleCircles; i++) {
    // Set the new x position in the originalPositions based on dynamic spacing
    originalPositions[i].x = currentPosition;
    currentPosition += maxCircleSize + adjustedSpacing;
  }

  // Adjust circles' positions and sizes based on the calculated values
  document.querySelectorAll('.circle').forEach((circle, index) => {
    if (index < visibleCircles) {
      // Set the circle's width and height based on calculated values
      const xPosition = originalPositions[index].x + centerX - maxCircleSize / 2; // Offset by the container's center and adjust for circle size
      circle.style.width = `${maxCircleSize}px`;
      circle.style.height = `${maxCircleSize}px`;
      circle.style.transform = `translate(${xPosition}px, 0px)`; // Apply updated x position
      circle.style.display = 'block'; // Ensure the circle is visible
    } else {
      // Hide the 6th circle if it's beyond the visible circle count
      circle.style.display = 'none';
    }
  });
}

// Call distributeCircles on page load and resize
distributeCircles();
window.addEventListener('resize', distributeCircles);

// Initialize circles with their original positions and assign random images and keywords
document.querySelectorAll('.circle').forEach((circle, i) => {
  circle.style.transform = `translate(${originalPositions[i].x}%, ${originalPositions[i].y}px)`;
  const { src, keyword, displayText } = imageCatalog[i];
  circle.style.backgroundImage = `url(${src})`;
  circle.style.backgroundSize = 'cover';
  
  const keywordDiv = document.createElement('div');
  keywordDiv.classList.add('keyword');
  keywordDiv.textContent = displayText; // Show the display text to the user
  keywordDiv.dataset.keyword = keyword; // Store the actual keyword as a data attribute
  circle.appendChild(keywordDiv);

  circle.addEventListener('click', () => {
    if (!movedCircles.includes(circle)) {
      if (movedCircles.length >= 6) {
        alert("You cannot add more than 6 circles.");
        return;
      }
      movedCircles.unshift(circle);
      updateCirclePositions(isRoundedSquare ? expandedPositions : positions);
    } else {
      movedCircles.splice(movedCircles.indexOf(circle), 1);
      circle.style.transform = `translate(${originalPositions[i].x}%, ${originalPositions[i].y}px)`;
      circle.style.width = '70px';
      circle.style.height = '70px';
      circle.style.filter = 'none';
      keywordDiv.style.opacity = '1.0';
    }
    updateApiUrl();
  });
});

function updateCirclePositions(positions) {
  movedCircles.forEach((circle, i) => {
    if (positions[i]) {
      circle.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
      circle.style.width = '150px';
      circle.style.height = '150px';
      circle.style.filter = 'grayscale(100%)';
      circle.querySelector('.keyword').style.opacity = '0.0';
    }
  });
}

// Initial circle positions when loaded
function updateApiUrl() {
  const apiUrl = new URL(window.location.href);
  const selectedKeywords = movedCircles.map((circle) => circle.querySelector('.keyword').dataset.keyword);
  apiUrl.searchParams.set('selectedKeywords', selectedKeywords.join(','));
  window.history.pushState({}, '', apiUrl);
}
// Modify the `updateCirclePositions` function to ensure text-circle size is independent of normal circle size
function updateCirclePositions(positions) {
  movedCircles.forEach((circle, i) => {
    if (positions[i]) {
      // Normal circle position update
      circle.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;

      // Ensure the circle is styled with no clipping
      circle.style.overflow = 'visible'; // Allow the blur to overflow

      // Check if the circle is not in the original position
      if (positions[i].x !== originalPositions[i].x || positions[i].y !== originalPositions[i].y) {
        circle.style.width = '80px'; // Default size for image circles
        circle.style.height = '80px'; // Default size for image circles
        circle.style.filter = 'none'; // Apply blur when not in expanded position
      } else {
        circle.style.width = '60px'; // Original size
        circle.style.height = '60px'; // Original size
        circle.style.filter = 'none'; // No blur when back to original position
      }

      // Apply blur when the bubble is expanded
      if (isRoundedSquare) {
        circle.style.width = '30px'; // New size for expanded position
        circle.style.height = '30px'; // New size for expanded position
        circle.style.padding = '0px'
        circle.style.filter = 'blur(10px)'; // Add blur effect when expanded

        // Remove the keyword when the circle is expanded
        const keywordDiv = circle.querySelector('.keyword');
        if (keywordDiv) {
          keywordDiv.style.opacity = '0.0'; // Hide the keyword when expanded
        }
      } else {
        // Add the keyword back when the circle returns to its normal size
        const keywordDiv = circle.querySelector('.keyword');
        if (keywordDiv) {
          keywordDiv.style.opacity = '1.0'; // Show the keyword when the circle returns
        }
      }
    }
  });

  // In the updateCirclePositions function
document.querySelectorAll('.text-circle').forEach((textCircle) => {
  const textContent = textCircle.querySelector('.text-content'); // Select the text element inside the text-circle

  // Save the original width and height the first time the element is initialized
  if (!textCircle.dataset.initialized) {
    textCircle.dataset.originalWidth = textCircle.offsetWidth; // Save the initial width
    textCircle.dataset.originalHeight = textCircle.offsetHeight; // Save the initial height
    textCircle.dataset.initialized = true; // Flag as initialized
  }

  const originalWidth = textCircle.dataset.originalWidth;
  const originalHeight = textCircle.dataset.originalHeight;

  if (isRoundedSquare) {
    // When it's in the "rounded square" state, shrink to 30x30
    textCircle.style.filter = 'blur(10px)';
    textCircle.style.width = '30px';
    textCircle.style.height = '30px';
    textCircle.style.padding = '0px'; // Remove padding if needed
    textContent.style.opacity = '0.0'; // Hide the text when the circle is small
    
  } else {
    // When scaling back to the original state, restore the original dimensions
    textCircle.style.filter = 'none'; // Remove blur
    textCircle.style.width = `${originalWidth - 18}px`; // Set to saved original width
    textCircle.style.height = `${originalHeight - 20}px`; // Set to saved original height
    textCircle.style.padding = '10px'; // Restore padding if needed
    textCircle.style.whiteSpace = 'normal';
    textContent.style.opacity = '1.0'; // Show the text again
  }
});
}

function updateApiUrl() {
  const keywords = movedCircles.map(c => 
    c.querySelector('.keyword')?.dataset.keyword || c.textContent.trim()
  ).join(' ');

  document.querySelector('.blob').style.backgroundImage = `url(https://image.pollinations.ai/prompt/3d+realistic+Cartoon-scene+of+${encodeURIComponent(keywords)},+featuring+a+vibrant+color+palette,+dynamic+lighting,+and+sharp+detailing+to+create+a+visually+appealing+composition.+The+scene+should+have+a+clean,+minimalistic+background+that+does+not+distract,+allowing+the+main+elements+to+stand+out+clearly+with+emphasis+on+balance+and+depth.?width=1024&height=1024&model=flux&nologo=true&private=false)`;
}

function downloadImage(url) {
  const link = document.createElement('a');
  link.href = url;
  link.download = 'image.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const bubble = document.getElementById('bubble');
let isRoundedSquare = false; // Track the current state of bubble's shape
let selectedKeywords = []; // Array to store selected keywords
let isSmall = false; // Track if the bubble is in small mode

// Bubble shape toggle functionality and circle position update
bubble.addEventListener('click', () => {
    // Capture the current computed styles
    const computedStyle = window.getComputedStyle(bubble);
    const currentBorderRadius = computedStyle.borderRadius;

    // Temporarily stop only the border radius animation
    bubble.style.animation = 'innerShadowAnimation 8s infinite linear';

    // Apply the current border-radius to freeze the shape
    bubble.style.borderRadius = currentBorderRadius;

    // Transition between rounded square and bubble state
    setTimeout(() => {
        if (!isRoundedSquare) {
            // Transition to a rounded square and move circles to expanded positions
            bubble.style.width = "300px";
            bubble.style.height = "300px";
            bubble.style.borderRadius = '20%'; // Rounded square shape
            bubble.style.boxShadow = 'inset 0 -10px 10px rgba(220, 186, 115, 0.7), \
                                       inset 10px 0 10px rgba(159, 48, 91, 0.7), \
                                       inset 0 10px 10px rgba(45, 74, 131, 0.7), \
                                       inset -10px 0 10px rgba(167, 97, 185, 0.7)';
            isRoundedSquare = true; // Update the state to rounded square

            // Move circles to expanded positions
            updateCirclePositions(expandedPositions);
        } else {
            // Transition back to the original bubble state and reset circles
            bubble.style.borderRadius = '50%';
            bubble.style.width = "200px";
            bubble.style.height = "200px"; // Original circular shape
            
            // Reapply both animations after the transition
            setTimeout(() => {
                bubble.style.animation = 'borderRadiusAnimation 8s infinite ease-in-out, innerShadowAnimation 8s infinite linear';
            }, 500); // Ensure the transition completes before resuming animation
            isRoundedSquare = false; // Update the state back to bubble

            // Move circles back to original positions
            updateCirclePositions(positions);
        }
    }, 0); // Ensure the transition happens smoothly
});

document.getElementById('inputText').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    let inputValue = event.target.value.trim();
    if (inputValue === '') {
      alert("You cannot add a text-circle with no letters.");
      return;
    }

    if (movedCircles.length >= 6) {
      alert("You cannot add more than 6 circles.");
      return;
    }

    // Create the main circle
    let displayBox = document.createElement('div');
    displayBox.classList.add('text-circle');

    // Create a wrapper for the text to control opacity
    let textContent = document.createElement('div');
    textContent.classList.add('text-content');
    textContent.textContent = inputValue;

    // Append the text to the displayBox (text circle)
    displayBox.appendChild(textContent);
    document.querySelector('.circles').appendChild(displayBox);

    // Allow the browser to calculate its dimensions dynamically
    const tempWidth = displayBox.offsetWidth;
    const tempHeight = displayBox.offsetHeight;

    // Set the calculated dimensions as fixed/static
    displayBox.style.width = `${tempWidth - 18}px`;
    displayBox.style.height = `${tempHeight - 20}px`;
    displayBox.style.opacity = '1.0';

    // Set the initial position for the main circle
    let positionIndex = 0;
    let currentPositions = isRoundedSquare ? expandedPositions : positions;

    // Ensure previous circles are positioned correctly
    movedCircles.forEach((circle, index) => {
      if (currentPositions[index + 1]) {
        circle.style.transform = `translate(${currentPositions[index + 1].x}px, ${currentPositions[index + 1].y}px)`;
      }
    });

    // Adjust position for the new text circle
    const xPosition = currentPositions[positionIndex].x;
    const yPosition = currentPositions[positionIndex].y - 0;  // Moving 200px higher as requested

    // Define the position for the text circle (displayBox)
    displayBox.style.transform = `translate(${xPosition}px, ${yPosition}px)`;

    movedCircles.unshift(displayBox);

    // Save the fixed dimensions for reference
    displayBox.dataset.originalWidth = tempWidth;
    displayBox.dataset.originalHeight = tempHeight;
    displayBox.dataset.initialized = true;

    event.target.value = '';
    updateApiUrl();
  }
});
