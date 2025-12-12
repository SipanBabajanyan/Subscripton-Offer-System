// Простой JavaScript без зависимостей

document.addEventListener('DOMContentLoaded', function() {
    const progressFill = document.getElementById('progressFill');
    const progressBlocked = document.getElementById('progressBlocked');
    const deliveryGate = document.getElementById('deliveryGate');
    const gateIcon = document.getElementById('gateIcon');
    const gateStatus = document.getElementById('gateStatus');
    const payment4Point = document.getElementById('payment4Point');
    const payment4Card = document.getElementById('payment4Card');
    const maintenancePoint = document.getElementById('maintenancePoint');
    const maintenanceCard = document.getElementById('maintenanceCard');

    let isDelivered = false;

    // Анимация начального прогресса (первые 3 оплаты)
    setTimeout(() => {
        progressFill.style.width = '60%'; // 3 оплаты из 5 этапов = 60%
        progressBlocked.style.width = '40%'; // Остальное заблокировано
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
            
            // Обновляем статус
            gateStatus.innerHTML = '✅ <strong>Проект сдан</strong>';
            gateStatus.style.color = '#10B981';
            
            // Обновляем подпись Gate
            const gateLabel = deliveryGate.closest('.stage').querySelector('.gate-label');
            const gateSubtitle = deliveryGate.closest('.stage').querySelector('.gate-subtitle');
            if (gateLabel) {
                gateLabel.style.color = '#10B981';
                gateLabel.textContent = 'Проект сдан ✅';
            }
            if (gateSubtitle) {
                gateSubtitle.textContent = 'Клиент получил проект';
            }
            
            // Активируем следующие этапы
            setTimeout(() => {
                // 4+ оплата
                payment4Point.style.backgroundColor = '#10B981';
                payment4Point.classList.add('active');
                payment4Card.classList.remove('blocked');
                payment4Card.classList.add('subscription');
                
                // Maintenance
                maintenancePoint.style.backgroundColor = '#8B5CF6';
                maintenancePoint.classList.add('active');
                maintenanceCard.classList.remove('blocked');
                maintenanceCard.classList.add('maintenance');
                
                // Анимация прогресса после Gate
                progressFill.classList.add('delivered');
                progressFill.style.width = '100%';
                progressBlocked.classList.add('hidden');
                
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
