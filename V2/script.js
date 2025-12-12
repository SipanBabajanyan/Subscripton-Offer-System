// JavaScript для горизонтального скролл timeline

document.addEventListener('DOMContentLoaded', function() {
    const timelineFill = document.getElementById('timelineFill');
    const timelineBlocked = document.getElementById('timelineBlocked');
    const deliveryGate = document.getElementById('deliveryGate');
    const gateIcon = document.getElementById('gateIcon');
    
    if (!timelineFill || !timelineBlocked || !deliveryGate || !gateIcon) {
        console.error('Не найдены необходимые элементы DOM');
        return;
    }
    
    let isDelivered = false;

    // Анимация начального прогресса (первые 3 месяца)
    // 3 этапа разработки из 5 общих этапов (1-3, Gate, 4, переход, 12, 12+) = ~43%
    setTimeout(() => {
        if (timelineFill) timelineFill.style.width = '43%';
        if (timelineBlocked) timelineBlocked.style.width = '57%';
    }, 500);

    // Обработка клика на Gate
    deliveryGate.addEventListener('click', function() {
        if (!isDelivered) {
            isDelivered = true;
            
            // Анимация открытия Gate
            deliveryGate.classList.add('delivered');
            const gateStage = deliveryGate.closest('.timeline-stage');
            if (gateStage) {
                gateStage.classList.add('delivered');
            }
            
            // Меняем иконку на галочку
            gateIcon.setAttribute('viewBox', '0 0 24 24');
            gateIcon.setAttribute('fill', 'none');
            gateIcon.innerHTML = `
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            `;
            
            // Обновляем текст кнопки
            const gateText = deliveryGate.querySelector('.gate-text');
            const gateSubtitle = deliveryGate.querySelector('.gate-subtitle');
            if (gateText) {
                gateText.textContent = 'Проект сдан ✅';
            }
            if (gateSubtitle) {
                gateSubtitle.textContent = 'Клиент получил проект';
            }
            
            // Активируем все этапы обслуживания (4 и 12)
            setTimeout(() => {
                // Активируем месяц 4
                const point4 = document.getElementById('point4');
                const card4 = document.getElementById('card4');
                
                if (point4) {
                    point4.style.backgroundColor = '#10B981';
                    point4.classList.add('active');
                    point4.classList.remove('blocked');
                }
                
                if (card4) {
                    card4.classList.remove('blocked');
                }
                
                // Активируем месяц 12
                const point12 = document.getElementById('point12');
                const card12 = document.getElementById('card12');
                
                if (point12) {
                    point12.style.backgroundColor = '#10B981';
                    point12.classList.add('active');
                    point12.classList.remove('blocked');
                }
                
                if (card12) {
                    card12.classList.remove('blocked');
                }
                
                // Активируем Maintenance
                const maintenancePoint = document.getElementById('pointMaintenance');
                const maintenanceCard = document.getElementById('cardMaintenance');
                
                if (maintenancePoint) {
                    maintenancePoint.style.backgroundColor = '#8B5CF6';
                    maintenancePoint.classList.add('active');
                    maintenancePoint.classList.remove('blocked');
                }
                
                if (maintenanceCard) {
                    maintenanceCard.classList.remove('blocked');
                }
                
                // Анимация прогресса после Gate
                if (timelineFill) {
                    timelineFill.classList.add('delivered');
                    timelineFill.style.width = '100%';
                }
                if (timelineBlocked) {
                    timelineBlocked.classList.add('hidden');
                }
                
                // Ripple эффект
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(16, 185, 129, 0.3);
                    animation: ripple 0.8s ease-out;
                    pointer-events: none;
                    z-index: 20;
                `;
                deliveryGate.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 800);
            }, 300);
        }
    });

    // Добавляем CSS для ripple анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

});
