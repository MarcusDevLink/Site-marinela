        // Menu mobile toggle
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');

        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });

        // Animação suave para links de navegação
        document.querySelectorAll('nav a, .btn').forEach(link => {
            link.addEventListener('click', function (e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Fechar menu mobile após clique
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                    }
                }
            });
        });

        // Formulário de agendamento
        document.getElementById('booking-form').addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const service = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').options[document.getElementById('time').selectedIndex].text;

            alert(`Obrigada, ${name}!\n\nSeu agendamento foi registrado com sucesso:\n\nServiço: ${service}\nData: ${formatDate(date)}\nHorário: ${time}\n\nEntraremos em contato para confirmação.`);

            // Resetar o formulário
            this.reset();
        });

        // Função para formatar a data
        function formatDate(dateString) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('pt-BR', options);
        }

        // Modal para galeria de imagens
        function openModal(imageSrc) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');

            modalImg.src = imageSrc;
            modal.classList.add('active');

            // Prevenir scroll quando o modal estiver aberto
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('imageModal');
            modal.classList.remove('active');

            // Restaurar scroll após um pequeno delay para a animação
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Fechar modal ao clicar fora da imagem
        window.addEventListener('click', function (e) {
            const modal = document.getElementById('imageModal');
            if (e.target === modal) {
                closeModal();
            }
        });

        // Fechar modal com tecla ESC
        window.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Definir data mínima no formulário como hoje
        document.getElementById('date').min = new Date().toISOString().split('T')[0];

        // Adicionar efeito de scroll para elementos aparecerem gradualmente
        function handleScrollAnimation() {
            const elements = document.querySelectorAll('.service-card, .gallery-item, .about-content, .about-img, .booking-container, .contact-info, .map');

            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;

                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Inicializar elementos com opacidade 0 e posição
        document.querySelectorAll('.service-card, .gallery-item, .about-content, .about-img, .booking-container, .contact-info, .map').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Chamar a função ao rolar a página
        window.addEventListener('scroll', handleScrollAnimation);

        // Chamar uma vez ao carregar a página
        window.addEventListener('load', handleScrollAnimation);