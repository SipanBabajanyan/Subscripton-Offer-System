// JavaScript для горизонтального скролл timeline

document.addEventListener('DOMContentLoaded', function() {
    const timelineFill = document.getElementById('timelineFill');
    const timelineBlocked = document.getElementById('timelineBlocked');
    const deliveryGate = document.getElementById('deliveryGate');
    const gateIcon = document.getElementById('gateIcon');
    
    let isDelivered = false;

    // Анимация начального прогресса (первые 3 месяца)
    // 3 этапа разработки из 15 общих этапов = 20%
    setTimeout(() => {
        timelineFill.style.width = '20%';
        timelineBlocked.style.width = '80%';
    }, 500);

    // Обработка клика на Gate
    deliveryGate.addEventListener('click', function() {
        if (!isDelivered) {
            isDelivered = true;
            
            // Анимация открытия Gate
            deliveryGate.classList.add('delivered');
            
            // Меняем иконку на галочку
            gateIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                      d="M5 13l4 4L19 7"/>
            `;
            
            // Обновляем подпись Gate
            const gateLabel = deliveryGate.closest('.timeline-stage').querySelector('.gate-label');
            if (gateLabel) {
                gateLabel.style.color = '#10B981';
                gateLabel.textContent = 'Проект сдан ✅';
            }
            
            // Активируем все этапы обслуживания (4-12)
            setTimeout(() => {
                // Активируем месяцы 4-12
                for (let i = 4; i <= 12; i++) {
                    const point = document.getElementById(`point${i}`);
                    const card = document.getElementById(`card${i}`);
                    
                    if (point) {
                        point.style.backgroundColor = '#10B981';
                        point.classList.add('active');
                        point.classList.remove('blocked');
                    }
                    
                    if (card) {
                        card.classList.remove('blocked');
                    }
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
                timelineFill.classList.add('delivered');
                timelineFill.style.width = '100%';
                timelineBlocked.classList.add('hidden');
                
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

    // Изначально блокируем этапы обслуживания
    for (let i = 4; i <= 12; i++) {
        const point = document.getElementById(`point${i}`);
        const card = document.getElementById(`card${i}`);
        
        if (point) {
            point.classList.add('blocked');
        }
        
        if (card) {
            card.classList.add('blocked');
        }
    }
    
    const maintenancePoint = document.getElementById('pointMaintenance');
    const maintenanceCard = document.getElementById('cardMaintenance');
    
    if (maintenancePoint) {
        maintenancePoint.classList.add('blocked');
    }
    
    if (maintenanceCard) {
        maintenanceCard.classList.add('blocked');
    }

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

    // Плавный скролл при загрузке (показываем начало)
    const scrollWrapper = document.querySelector('.timeline-scroll-wrapper');
    if (scrollWrapper) {
        setTimeout(() => {
            scrollWrapper.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }, 100);
    }
});
