// 平滑滚动功能
const arrowButton = document.querySelector('.hero__arrow');

if (arrowButton) {
    const targetSelector = arrowButton.dataset.scrollTarget;
    const target = document.querySelector(targetSelector);

    arrowButton.addEventListener('click', () => {
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// 水印视差效果优化
const watermarks = Array.from(document.querySelectorAll('.hero__watermark'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (watermarks.length && !reduceMotion) {
    const speeds = watermarks.map((_, index) => 0.06 + index * 0.02);
    let ticking = false;
    let lastScrollY = 0;

    const update = () => {
        const scrollY = window.scrollY;

        // 仅在滚动距离变化时更新
        if (Math.abs(scrollY - lastScrollY) > 0.5) {
            watermarks.forEach((mark, index) => {
                const offset = scrollY * speeds[index];
                mark.style.setProperty('--watermark-shift', `${offset}px`);
            });
            lastScrollY = scrollY;
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // 初始化
    update();
}

// 卡片入场动画观察器
const card = document.querySelector('.hero__card');
if (card && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        }
    );

    observer.observe(card);
}

// 性能监控(仅在开发环境)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`页面加载时间: ${pageLoadTime}ms`);
            }, 0);
        });
    }
}

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && arrowButton) {
        arrowButton.click();
    }
});

// 卡片鼠标跟随光泽效果
if (card && !reduceMotion) {
    let mouseX = 0;
    let mouseY = 0;
    let cardRect = card.getBoundingClientRect();

    const updateCardSheen = () => {
        cardRect = card.getBoundingClientRect();
    };

    window.addEventListener('resize', updateCardSheen);
    window.addEventListener('scroll', updateCardSheen, { passive: true });

    card.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - cardRect.left;
        mouseY = e.clientY - cardRect.top;

        const xPercent = (mouseX / cardRect.width) * 100;
        const yPercent = (mouseY / cardRect.height) * 100;

        const sheen = card.querySelector('.hero__card-sheen');
        if (sheen) {
            sheen.style.background = `
                radial-gradient(
                    circle at ${xPercent}% ${yPercent}%,
                    rgba(255, 255, 255, 0.6) 0%,
                    rgba(255, 255, 255, 0.3) 30%,
                    rgba(255, 255, 255, 0.05) 60%,
                    rgba(255, 255, 255, 0.05) 100%
                )
            `;
        }
    });

    card.addEventListener('mouseleave', () => {
        const sheen = card.querySelector('.hero__card-sheen');
        if (sheen) {
            sheen.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.05) 100%)';
        }
    });
}

// 添加爱心粒子效果
const createHeartParticles = () => {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 20 + 10}px;
        left: ${Math.random() * 100}vw;
        bottom: -50px;
        pointer-events: none;
        z-index: 9999;
        animation: float-up ${Math.random() * 3 + 3}s linear forwards;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
};

// 添加爱心粒子动画样式
if (!document.getElementById('heart-particle-style')) {
    const style = document.createElement('style');
    style.id = 'heart-particle-style';
    style.textContent = `
        @keyframes float-up {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 每隔一段时间创建爱心粒子
if (!reduceMotion) {
    setInterval(createHeartParticles, 3000);
}

