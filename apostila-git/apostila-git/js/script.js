// Barra de progresso de leitura
const barra = document.getElementById('progresso');
const botaoTopo = document.getElementById('topo');

function aoRolar() {
  const h = document.documentElement;
  const total = h.scrollHeight - h.clientHeight;
  const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
  barra.style.width = pct + '%';
  botaoTopo.classList.toggle('show', h.scrollTop > 500);
}
window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

// Voltar ao topo
botaoTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Revelar seções ao rolar
const obs = new IntersectionObserver((entradas) => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
