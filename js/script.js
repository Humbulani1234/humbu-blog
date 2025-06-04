document.addEventListener('DOMContentLoaded', () => {
    // Get all dropdown toggle links
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const parentItem = toggle.closest('.nav-item');
            const dropdownMenu = parentItem.querySelector('.dropdown-menu');

            // Close all other dropdowns first
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.style.display = 'none';
                    const otherToggle = menu.closest('.nav-item').querySelector('.dropdown-toggle');
                    if (otherToggle) {
                        otherToggle.classList.remove('active');
                    }
                }
            });

            // Toggle current dropdown
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                toggle.classList.remove('active');
            } else {
                // Calculate position for fixed positioning
                const rect = toggle.getBoundingClientRect();
                dropdownMenu.style.top = (rect.bottom + window.scrollY) + 'px';
                dropdownMenu.style.left = (rect.left + window.scrollX) + 'px';
                
                // Show the dropdown
                dropdownMenu.style.display = 'block';
                toggle.classList.add('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-item')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
                const toggle = menu.closest('.nav-item').querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.classList.remove('active');
                }
            });
        }
    });

    // Close dropdowns on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
                const toggle = menu.closest('.nav-item').querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.classList.remove('active');
                }
            });
        }
    });

    // Reposition dropdowns on window resize
    window.addEventListener('resize', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu.style.display === 'block') {
                const toggle = menu.closest('.nav-item').querySelector('.dropdown-toggle');
                if (toggle) {
                    const rect = toggle.getBoundingClientRect();
                    menu.style.top = (rect.bottom + window.scrollY) + 'px';
                    menu.style.left = (rect.left + window.scrollX) + 'px';
                }
            }
        });
    });
});