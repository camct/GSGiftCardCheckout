function createPopup(targetElementSelector) {
    console.log('Creating popup for selector:', targetElementSelector);

    const targetElement = document.querySelector(targetElementSelector);
    if (targetElement) {
        console.log('Target element found:', targetElement);
        
        const popup = document.createElement('div');
        popup.className = 'custom-popup';

        const closeButton = document.createElement('button');
        closeButton.className = 'custom-popup-close';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => popup.remove();

        popup.innerHTML = `
        <div>
            <h3>NOTICE!</h3>
            <p>You pay shipping so your recipient pays nothing when they order</p>
        </div>
        `;
        popup.appendChild(closeButton);

        document.body.appendChild(popup);

        function positionPopup() {
            const rect = targetElement.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const popupRect = popup.getBoundingClientRect();

            // Set max-width based on window size
            popup.style.maxWidth = `${Math.min(windowWidth * 0.9, 400)}px`;

            // Position the popup
            let left = rect.left;
            let top = rect.bottom + 10; // 10px gap

            // Adjust horizontal position if it overflows the window
            if (left + popupRect.width > windowWidth) {
                left = Math.max(0, windowWidth - popupRect.width);
            }

            // If popup overflows vertically, position it above the target element
            if (top + popupRect.height > windowHeight) {
                top = Math.max(0, rect.top - popupRect.height - 10);
            }

            popup.style.left = `${left}px`;
            popup.style.top = `${top}px`;
        }

        positionPopup();
        window.addEventListener('resize', positionPopup);

        console.log('Popup appended to body');
    } else {
        console.log('Target element not found');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Call createPopup with the correct selector
    document.getElementById('someTargetElementId').addEventListener('click', function(event) {
        createPopup('#someTargetElementId');
    });
});
