document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    toggle.onclick = function() {
        sidebar.classList.toggle('active');
    }
    sidebar.addEventListener('click', function(event) {
        if (event.target.tagName !== 'A') {
            sidebar.classList.remove('active');
        }
    });

    const slider = document.querySelector('#sliderContainer .slider');
    if (slider) {
        const items = slider.querySelectorAll('.slider-item');
        let current = 0;
        let interval;

        // Buat dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        items.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
        slider.appendChild(dotsContainer);

        function showSlide(idx, prevIdx = null) {
            items.forEach((item, i) => {
                item.classList.remove('active', 'prev');
                if (i === idx) {
                    item.classList.add('active');
                } else if (i === prevIdx) {
                    item.classList.add('prev');
                }
            });
            const dots = slider.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === idx);
            });
        }

        function nextSlide() {
            let prev = current;
            current = (current + 1) % items.length;
            showSlide(current, prev);
        }

        function goToSlide(idx) {
            let prev = current;
            current = idx;
            showSlide(current, prev);
        }

        function resetInterval() {
            clearInterval(interval);
            interval = setInterval(nextSlide, 5000);
        }

        showSlide(current);
        resetInterval();
    }
});
