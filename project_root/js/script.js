// script.js
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('sobrenos.html')) return 'sobre';
  if (path.includes('cardapio.html')) return 'cardapio';
  if (path.includes('unidades.html')) return 'unidades';
  if (path.includes('contato.html')) return 'contato';
  return 'home'; // index.html ou raiz
}


// Elementos do painel inferior
const bottomPanel = document.getElementById('bottomPanel');
const expandButton = document.getElementById('expandButton');
let isPanelOpen = false;




function animarContadores() {
  document.querySelectorAll('.contador').forEach((contador) => {
    const valorFinal = parseInt(contador.getAttribute('data-target'));
    if (!isNaN(valorFinal)) {
      contador.textContent = '0';
      
      const duracao = 2000;
      const inicioAnimacao = Date.now();
      
      function atualizarContador() {
        const tempoDecorrido = Date.now() - inicioAnimacao;
        const progresso = Math.min(tempoDecorrido / duracao, 1);
        const valorAtual = Math.floor(progresso * valorFinal);
        
        contador.textContent = valorAtual;
        
        if (progresso < 1) {
          requestAnimationFrame(atualizarContador);
        } else {
          contador.textContent = valorFinal;
        }
      }
      
      requestAnimationFrame(atualizarContador);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (getCurrentPage() === 'home') {
    // Aguardar um pouco e então animar
    setTimeout(() => {
      animarContadores();
    }, 1000);
  }
});



// Função para inicializar contadores da home quando a seção fica visível
function initContadoresHome() {
  const currentPage = getCurrentPage();
  if (currentPage !== 'home') return;
  
  console.log('Inicializando contadores da home...');
  
  const estatisticasSection = document.querySelector('.estatisticas-home');
  if (!estatisticasSection) {
    console.log('Seção de estatísticas não encontrada');
    return;
  }
  
  // Criar um observer para detectar quando a seção entra na viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Seção de estatísticas entrou na viewport');
        // Pequeno delay para dar tempo da seção aparecer completamente
        setTimeout(() => {
          animarContadoresHome();
        }, 300);
        // Parar de observar após a primeira animação
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2, // Animar quando 20% da seção estiver visível
    rootMargin: '0px 0px -100px 0px' // Margem para começar a animação um pouco antes
  });
  
  observer.observe(estatisticasSection);
}

// Função para verificar se os contadores já estão visíveis ao carregar a página
function verificarContadoresVisiveis() {
  const currentPage = getCurrentPage();
  if (currentPage !== 'home') return;
  
  // Aguardar um pouco para garantir que a página carregou completamente
  setTimeout(() => {
    const estatisticasSection = document.querySelector('.estatisticas-home');
    if (!estatisticasSection) {
      console.log('Seção de estatísticas não encontrada ao verificar visibilidade');
      return;
    }
    
    // Verificar se a seção já está visível na tela
    const rect = estatisticasSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    console.log('Seção visível ao carregar:', isVisible);
    
    if (isVisible) {
      // Se já estiver visível, animar imediatamente
      setTimeout(() => {
        animarContadoresHome();
      }, 500);
    } else {
      // Se não estiver visível, usar o observer
      initContadoresHome();
    }
  }, 1000); // Aguardar 1 segundo após o carregamento da página
}

// Função para alternar o modo escuro
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.top-bar')?.classList.toggle('dark-mode');
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM carregado, página:', getCurrentPage());
  
  // Inicializar contadores da home
  if (getCurrentPage() === 'home') {
    verificarContadoresVisiveis();
  }
});

// Também inicializar quando a janela carrega completamente
window.addEventListener('load', function() {
  console.log('Janela carregada completamente, página:', getCurrentPage());
  
  // Backup: tentar inicializar contadores novamente se for a home
  if (getCurrentPage() === 'home') {
    setTimeout(() => {
      const estatisticasSection = document.querySelector('.estatisticas-home');
      if (estatisticasSection) {
        const contadores = estatisticasSection.querySelectorAll('.contador');
        // Se os contadores ainda estão em 0, animar
        const precisaAnimar = Array.from(contadores).some(contador => 
          contador.textContent === '0' || contador.textContent === ''
        );
        
        if (precisaAnimar) {
          console.log('Executando animação de backup dos contadores');
          animarContadoresHome();
        }
      }
    }, 2000);
  }
});
function testarContadores() {
  console.log('=== TESTE DE CONTADORES ===');
  console.log('Página atual:', getCurrentPage());
  
  const contadoresGeral = document.querySelectorAll('.contador');
  console.log('Contadores encontrados:', contadoresGeral.length);
  
  contadoresGeral.forEach((contador, index) => {
    console.log(`Contador ${index + 1}:`, {
      elemento: contador,
      dataTarget: contador.getAttribute('data-target'),
      textoAtual: contador.textContent
    });
  });
  
  // Forçar animação
  contadoresGeral.forEach((contador) => {
    const valorFinal = parseInt(contador.getAttribute('data-target'));
    if (!isNaN(valorFinal)) {
      contador.textContent = '0';
      
      const duracao = 2000;
      const inicioAnimacao = Date.now();
      
      function atualizarContador() {
        const tempoDecorrido = Date.now() - inicioAnimacao;
        const progresso = Math.min(tempoDecorrido / duracao, 1);
        const valorAtual = Math.floor(progresso * valorFinal);
        
        contador.textContent = valorAtual;
        
        if (progresso < 1) {
          requestAnimationFrame(atualizarContador);
        } else {
          contador.textContent = valorFinal;
        }
      }
      
      requestAnimationFrame(atualizarContador);
    }
  });
}

window.testarContadores = testarContadores;
// Função para reinicializar contadores (caso necessário)
function reiniciarContadores() {
  if (getCurrentPage() === 'home') {
    animarContadoresHome();
  }
}

// Expor função globalmente para debug
window.reiniciarContadores = reiniciarContadores;
window.animarContadoresHome = animarContadoresHome;

// Função para testar contadores manualmente
// Também inicializar quando a janela carrega completamente
window.addEventListener('load', function() {
  console.log('Janela carregada completamente, página:', getCurrentPage());
  
  // Backup: tentar inicializar contadores novamente se for a home
  if (getCurrentPage() === 'home') {
    setTimeout(() => {
      const estatisticasSection = document.querySelector('.estatisticas-home');
      if (estatisticasSection) {
        const contadores = estatisticasSection.querySelectorAll('.contador');
        // Se os contadores ainda estão em 0, animar
        const precisaAnimar = Array.from(contadores).some(contador => 
          contador.textContent === '0' || contador.textContent === ''
        );
        
        if (precisaAnimar) {
          console.log('Executando animação de backup dos contadores');
          animarContadoresHome();
        }
      }
    }, 2000);
  }
});





// Solução simplificada com CSS
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
}

// Versão nativa (fallback)
function initAccordionNative() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    const body = header.nextElementSibling;
    
    // Inicializa fechado
    if (body && !header.classList.contains('active')) {
      body.style.display = 'none';
    }
    
    header.addEventListener('click', function() {
      this.classList.toggle('active');
      
      if (body) {
        if (this.classList.contains('active')) {
          body.style.display = 'block';
        } else {
          body.style.display = 'none';
        }
      }
    });
  });
}

// Inicialização do Swiper


// Função para carregar o conteúdo apropriado para cada página
function carregarConteudoEspecifico() {
  const currentPage = getCurrentPage();
  console.log('Página atual:', currentPage);
  
  // Se o painel de conteúdo não existir, não faça nada
  const panelContent = document.getElementById('panelContent');
  if (!panelContent) return;
  
  // Limpar o conteúdo atual
  panelContent.innerHTML = '';
  
  // Carregar o conteúdo apropriado para cada página
  switch (currentPage) {
    case 'home':
      panelContent.innerHTML = `
        <h2 class="headline-central">Bem-vindo à Nostra Massa</h2>
      `;
      break;
    case 'sobre':
      if (sobreNosEnhancementsLoaded) {
        console.log('Melhorias do Sobre Nós já carregadas, pulando carregamento básico');
        // Apenas inicializar componentes
        setTimeout(() => {
          initAccordion();
          
          
          // Adicionar classe 'visible' aos elementos fade-in
          document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
          });
          
          // Corrigir visibilidade e estilos
          corrigirVisibilidadeConteudo();
           aplicarEstiloItalianoPainel();
        }, 300);
        return;
      }
      
    case 'cardapio':
      panelContent.innerHTML = `
        <div class="menu-columns">
          <!-- Coluna de pizzas salgadas -->
          <div class="menu-column salgadas">
            <h2 class="headline-central">Pizzas Salgadas</h2>
          </div>
          <!-- Coluna de pizzas doces -->
          <div class="menu-column doces">
            <h2 class="headline-central">Pizzas Doces</h2>
          </div>
        </div>
      `;
      break;
      case 'unidades':
        
        corrigirVisibilidadeConteudo();
        break;      
    case 'contato':
      panelContent.innerHTML = `
        <!-- PAINEL CONTATO -->
  <div class="bottom-panel open" id="bottomPanel" style="position: fixed; z-index: -1;">
    <div class="bottom-panel-header">
      ▲ Envie uma mensagem para nós
    </div>
  
    <div class="bottom-panel-content">
      <section class="contato fade-in">
        <h2 class="headline-central">Fale Conosco</h2>
  
        <form class="contato-form">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Enter your Name" required />
          </div>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter a valid email address" required />
          </div>
  
          <button type="submit" class="btn-enviar">Enviar Mensagem</button>
        </form>
      </section>
    </div>
  </div>
  
  <div class="loading-spinner" id="loadingSpinner"></div>

  <!-- Scripts -->
  <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
  
</body>
</html>
      `;
      break;
  }
  
  // Após carregar o conteúdo, inicialize os componentes
  initAccordion();
  
  
  // Adicionar classe 'visible' aos elementos fade-in
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add('visible');
  });
  
  // Corrigir visibilidade e estilos
  corrigirVisibilidadeConteudo();
}

// Lista completa de pizzas (salgadas e doces)
const pizzas = [
  // — SALGADAS —
  { category:'salgada', title:'ABOBRINHA', desc:'Molho tomates frescos, muçarela, abobrinha em rodelas temperadas, parmesão, mais molho de tomate, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'ALCATRA (CHARMOSA)', desc:'Molho de tomates frescos, muçarela, Alcatra, gorgonzola, cebola roxa marinada no balsâmico e mel, orégano e azeitonas', price:'R$ 87,90' },
  { category:'salgada', title:'ALHO PORÓ', desc:'Molho tomates frescos, muçarela, cream cheese, alho poró puxado na manteiga e vinho branco, azeitonas', price:'R$ 84,90' },
  { category:'salgada', title:'ALICHE', desc:'Molho tomates frescos, muçarela, aliche, azeitonas', price:'R$ 84,90' },
  { category:'salgada', title:'AMERICANA', desc:'Molho tomates frescos, muçarela, calabresa, bacon, cebola, molho barbecue, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'AMOROSA', desc:'Molho de tomates frescos, muçarela, peito de peru, cream cheese, geleia de amora, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'ATUM', desc:'Molho tomate, muçarela, atum em pedaços, rodelas de tomate, cebola, azeitonas', price:'R$ 87,90' },
  { category:'salgada', title:'ATUM DO CHEF', desc:'Molho tomates frescos, muçarela, atum em pedaços, brócolis, rodelas de tomate, cebola, azeitonas', price:'R$ 89,90' },
  { category:'salgada', title:'ATUM HOLL', desc:'Molho tomates frescos, muçarela, atum em pedaços, cream cheese, molho tare, cheiro verde, azeitonas', price:'R$ 87,90' },
  { category:'salgada', title:'À MODA DA CASA', desc:'Molho tomates frescos, muçarela, calabresa, lombinho defumado, milho, bacon, rodelas de tomate, requeijão cremoso, azeitonas', price:'R$ 84,90' },
  { category:'salgada', title:'BACALHAU', desc:'Molho tomates frescos, muçarela, bacalhau em lascas, ovo, tomates frescos, cebola, pimentão, azeitonas', price:'R$ 89,90' },
  { category:'salgada', title:'BAIANA ESPECIAL', desc:'Molho tomates frescos, muçarela, calabresa, pimenta, tomate seco, creme de espinafre, rodelas de tomate, manjericão, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'BOLONHESA', desc:'Molho tomates frescos, muçarela, calabresa, bacon, palmito, requeijão, azeitonas', price:'R$ 82,90' },
  { category:'salgada', title:'BRÓCOLIS COM REQU', desc:'Molho tomates frescos, muçarela, brócolis, requeijão cremoso, azeitonas', price:'R$ 78,90' },
  { category:'salgada', title:'BRÓCOLIS DO CHEF', desc:'Molho tomates frescos, muçarela, brócolis, palmito, tomate seco, creme de espinafre, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'CALABRESA', desc:'Molho tomates frescos, muçarela, calabresa, cebola, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'CALABRIA', desc:'Molho tomates frescos, muçarela, calabresa, tomates selecionados, requeijão, cebola selecionada fatiada, pimenta, azeitonas', price:'R$ 82,90' },
  { category:'salgada', title:'CALIFÓRINA', desc:'Molho tomates frescos, muçarela, lombinho, pêssego, abacaxi, figo, ameixa e cereja', price:'R$ 86,90' },
  { category:'salgada', title:'CAMARÃO', desc:'Molho tomates frescos, muçarela, camarão ao molho de tomate fresco, requeijão, azeitonas', price:'R$ 108,90' },
  { category:'salgada', title:'CAPRESE', desc:'Molho tomates frescos, muçarela, rodelas de tomates selecionados, pesto de azeitonas pretas, muçarela de búfala, manjericão fresco, azeitonas', price:'R$ 82,90' },
  { category:'salgada', title:'CARIJÓ', desc:'Molho tomates frescos, muçarela, frango, milho, requeijão, ovo, bacon, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'CINCO QUEIJOS', desc:'Molho tomates frescos, muçarela, parmesão, gorgonzola, requeijão, cheddar, azeitonas', price:'R$ 83,90' },
  { category:'salgada', title:'DIVINA', desc:'Molho de tomates frescos, muçarela, pepperoni, pimentão amarelo e vermelho, champignon, cebolas, orégano e azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'DOG (CACHORRO QUENTE)', desc:'Molho tomates frescos, muçarela, molho de tomate com salsichas, requeijão, milho, batata palha, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'DORITOS', desc:'Molho tomates frescos, muçarela, bacon, cheddar, doritos, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'ESCAROLA', desc:'Molho tomates frescos, muçarela, escarola, bacon, tomate, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'ESPECIAL DO CLIENTE (06 INGREDIENTES)', desc:'Escolha até 6 ingredientes: Muçarela, calabresa, lombinho, peito de peru, pepperoni, bacon, parmesão, gorgonzola, requeijão, cheddar, cream cheese, palmito, tomate, cebola, milho, ervilha, ovo, brócolis, pimenta, tomate seco, champignon, frango', price:'R$ 89,90' },
  { category:'salgada', title:'ESTROGONOFE DE CARNE', desc:'Molho tomates frescos, muçarela, estrogonofe de carne com champignon, requeijão cremoso, azeitonas', price:'R$ 87,90' },
  { category:'salgada', title:'ESTROGONOFE DE FRANGO', desc:'Molho tomates frescos, muçarela, estrogonofe de frango com champignon, requeijão cremoso, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'FIGO COM 3 QUEIJOS', desc:'Molho tomates frescos, muçarela, gorgonzola, requeijão cremoso e figo caramelizado', price:'R$ 76,90' },
  { category:'salgada', title:'FILÉ MIGNON', desc:'Molho tomates frescos, muçarela, Filé mignon em cubos, gotas de requeijão, azeitonas', price:'R$ 118,90' },
  { category:'salgada', title:'FIORENTINI', desc:'Molho tomates frescos, muçarela, peito de peru defumado, milho, requeijão cremoso, parmesão, azeitonas', price:'R$ 83,90' },
  { category:'salgada', title:'FRANGO COM REQUEIJÃO', desc:'Molho tomates frescos, muçarela, frango desfiado, requeijão cremoso, azeitonas', price:'R$ 77,90' },
  { category:'salgada', title:'HOT HOLL (SALMÃO)', desc:'Molho tomates frescos, muçarela, salmão, cream cheese, cebolinha, molho tare, azeitonas', price:'R$ 108,90' },
  { category:'salgada', title:'IMPERIAL', desc:'Molho tomates frescos, muçarela, cream cheese, geleia de pimenta, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'INGLESA', desc:'Molho tomates frescos, muçarela, lombinho defumado, ovo, cebola, requeijão, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'ITALIANA', desc:'Molho tomates frescos, muçarela, molho carne moída, palmito, requeijão, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'LIGHT ESPECIAL', desc:'Molho tomates frescos, queijo branco, peito de peru, brócolis, rodelas de tomate, azeitonas', price:'R$ 77,90' },
  { category:'salgada', title:'LINGUIÇA ARTESANAL', desc:'Molho de tomates frescos, muçarela, linguiça artesanal, requeijão, pimentão, pimenta biquinho, queijo coalho, cheiro verde, orégano e azeitonas', price:'R$ 91,90' },
  { category:'salgada', title:'LOMBINHO COM REQU', desc:'Molho tomates frescos, muçarela, lombinho canadense, requeijão cremoso, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'LOMBINHO DO CHEF', desc:'Molho tomates frescos, muçarela, lombinho canadense, tomate seco, bacon, requeijão cremoso, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'MARGUERITA', desc:'Molho tomates frescos, muçarela, manjericão fresco, e mais molho de tomates, azeitonas', price:'R$ 69,90' },
  { category:'salgada', title:'MILHO', desc:'Molho tomates frescos, muçarela, milho, requeijão, bacon, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'MUÇARELA', desc:'Molho tomates frescos, muçarela, rodelas de tomate, azeitonas', price:'R$ 63,90' },
  { category:'salgada', title:'NAPOLITANA', desc:'Molho tomates frescos, muçarela, parmesão, rodelas de tomate, manjericão fresco, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'NORDESTINA COM REQU', desc:'Molho tomates frescos, muçarela, carne seca desfiada, rodelas de tomates frescos, cebola, requeijão, azeitonas', price:'R$ 94,90' },
  { category:'salgada', title:'PALMITO', desc:'Molho tomates frescos, muçarela, palmito, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'PALMITO DO CHEF', desc:'Molho tomates frescos, palmito, champignon, tomate seco, bacon, requeijão cremoso, azeitonas', price:'R$ 83,90' },
  { category:'salgada', title:'PÃO DE ALHO', desc:'Muçarela, creme de alho temperado, requeijão, bacon, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'PAULISTA', desc:'Molho tomates frescos, muçarela, presunto picado, ervilha, palmito, bacon, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'PEITO PERU', desc:'Molho tomates frescos, muçarela, peito de peru picado, alho poró temperado, cream cheese, azeitonas', price:'R$ 85,90' },
  { category:'salgada', title:'PEPPERONI', desc:'Molho tomates frescos, muçarela, pepperoni, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'PIZZAIOLO', desc:'Molho tomates frescos, muçarela, pepperoni, palmito, tomate seco, bacon, azeitonas', price:'R$ 81,90' },
  { category:'salgada', title:'PORTUGUESA', desc:'Molho tomates frescos, muçarela, presunto, palmito, ervilha, ovo, cebola, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'PRECIOSA', desc:'Molho tomates frescos, muçarela, pepperoni, cream cheese, gorgonzola, tomate cereja, manjericão, azeitonas', price:'R$ 88,90' },
  { category:'salgada', title:'PRESUNTO E MUÇARELA', desc:'Molho tomates frescos, muçarela, presunto, tomates, azeitonas', price:'R$ 78,90' },
  { category:'salgada', title:'PRESUNTO PARMA', desc:'Molho tomates frescos, muçarela, rúcula, tomate cereja, presunto parma, parmesão, azeitonas', price:'R$ 89,90' },
  { category:'salgada', title:'PRIMAVERA', desc:'Molho tomates frescos, muçarela, palmito, brócolis, manjericão fresco, rodelas de tomate, requeijão cremoso, azeitonas', price:'R$ 78,90' },
  { category:'salgada', title:'QUATRO QUEIJOS', desc:'Molho tomates frescos, muçarela, parmesão, gorgonzola, requeijão cremoso, azeitonas', price:'R$ 81,80' },
  { category:'salgada', title:'ROMANA', desc:'Molho tomates frescos, muçarela, lombinho canadense, champignon, rodelas tomates, manjericão, requeijão cremoso, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'RÚCULA DO CHEF', desc:'Molho tomates frescos, muçarela, rúcula, molho a base de mostarda, acceto balsâmico, mel, tomate seco, creme de queijo branco, azeitonas', price:'R$ 79,90' },
  { category:'salgada', title:'SHIMEJI', desc:'Molho tomates frescos, muçarela, shimeji na manteiga, cream cheese, cebolinha', price:'R$ 86,90' },
  { category:'salgada', title:'SUPREMA', desc:'Molho tomates frescos, muçarela, carne bovina em cubos, pepperoni, champignon, pimentão, azeitonas', price:'R$ 89,90' },

  // — DOCES —
  { category:'doce', title:'ABACAXI C/ CHOC BRANCO', desc:'Massa fina, abacaxi, chocolate branco, leite condensado e coco', price:'R$ 74,90' },
  { category:'doce', title:'BANANA C/ CHOC BRANCO', desc:'Massa fina, banana, chocolate branco e canela', price:'R$ 74,90' },
  { category:'doce', title:'BOMBOM DE KITKAT', desc:'Massa fina, brigadeiro artesanal, creme de leite ninho, Kit Kat, morango', price:'R$ 74,90' },
  { category:'doce', title:'BOMBOM DE UVA', desc:'Massa fina, brigadeiro artesanal, creme de leite ninho, uva', price:'R$ 74,90' },
  { category:'doce', title:'BRIGADEIRO', desc:'Massa fina, Brigadeiro artesanal e chocolate granulado', price:'R$ 74,90' },
  { category:'doce', title:'CASADINHO', desc:'Massa fina, chocolate ao leite com chocolate branco', price:'R$ 74,90' },
  { category:'doce', title:'CHOCOLATE BRANCO', desc:'Massa fina, chocolate branco', price:'R$ 74,90' },
  { category:'doce', title:'NUTELLA C/ MORANGO', desc:'Massa fina, Nutella, creme de leite e morango', price:'R$ 77,90' },
  { category:'doce', title:'PAÇOQUINHA NOVIDADE', desc:'Massa fina, chocolate ao leite, paçoquinha', price:'R$ 70,90' },
  { category:'doce', title:'PISTACHE', desc:'Massa fina, Ganache de pistache e amêndoas de pistache', price:'R$ 85,90' },
  { category:'doce', title:'PRESTÍGIO', desc:'Massa fina, Brigadeiro artesanal com doce de coco', price:'R$ 74,90' },
  { category:'doce', title:'ROMEU E JULIETA', desc:'Massa fina, muçarela, goiabada cremosa', price:'R$ 73,90' },

  // — FONDUE —
  { category: 'fondue', title: 'FONDUE - chocolate', desc: '5 acompanhamentos disponíveis no dia', price: 'R$ 39,90' },

  // — CALDOS —
  { category:'caldo', title:'Cabotia c/ carne seca', desc:'Caldo de cabotia com carne seca desfiada', price:'R$ 26,90' },
  { category:'caldo', title:'Feijão', desc:'Caldo de feijão, calabresa e bacon', price:'R$ 26,90' },
  { category:'caldo', title:'Legumes', desc:'Cabotia, cenoura, mandioquinha, chuchu, mandioca e abobrinha', price:'R$ 26,90' },
  { category:'caldo', title:'Mandioca com bacon', desc:'Caldo de mandioca com bacon', price:'R$ 26,90' },

  // — SALADAS —
  { category:'salada', title:'Completa', desc:'Rúcula, alface, tomate, cebola, ervilha, muçarela, ovo, palmito, azeitonas', price:'R$ 29,90' },

  // — MASSAS —
  { category:'massa', title:'Lasanha 4 Queijos', desc:'Molho branco', price:'R$ 29,90' },
  { category:'massa', title:'Lasanha Presunto e Muçarela', desc:'Molho bolonhesa ou ao sugo. Escolher em adicionais', price:'R$ 29,90' },
  { category:'massa', title:'Mac & Cheese', desc:'Massa caracolina com creme de cheddar finalizado com bacon e farofa panko temperada', price:'R$ 34,90' },
  { category:'massa', title:'Nhoque c/ Muçarela', desc:'Recheado com muçarela. Escolher 1 molho em adicionais', price:'R$ 29,90' },
  { category:'massa', title:'Rondeli Presunto e Muçarela', desc:'Presunto e muçarela. Escolher 1 molho em adicionais', price:'R$ 29,90' },

  // — MASSAS – TALHARIM —
  { category:'talharim', title:'Talharim ao Molho Bolonhesa', desc:'Talharim ao molho bolonhesa, queijo parmesão', price:'R$ 29,90' },
  { category:'talharim', title:'Talharim ao Molho Branco', desc:'Talharim ao molho branco, queijo parmesão', price:'R$ 29,90' },
  { category:'talharim', title:'Talharim ao Molho Camarão', desc:'Talharim ao molho branco com camarões, queijo parmesão', price:'R$ 39,90' },
  { category:'talharim', title:'Talharim ao Molho Sugo', desc:'Talharim ao molho sugo, queijo parmesão', price:'R$ 29,90' },
  { category:'talharim', title:'Talharim c/ Brócolis e Bacon', desc:'Talharim ao molho branco, brócolis e bacon, queijo parmesão', price:'R$ 29,90' },

  // — PORÇÕES —
  { category:'porcao', title:'Batata Frita Completa', desc:'Muçarela, bacon, cheddar, requeijão', price:'R$ 34,90' },
  { category:'porcao', title:'Calabresa Acebolada', desc:'', price:'R$ 34,90' },
  { category:'porcao', title:'Estrogonofe de Carne', desc:'Acompanhamento: arroz, batata palha e salada (porção para 2 pessoas)', price:'R$ 54,90' },
  { category:'porcao', title:'Estrogonofe de Frango', desc:'Acompanhamento: arroz, batata palha e salada (porção para 2 pessoas)', price:'R$ 47,90' },
  { category:'porcao', title:'Frango no Varal', desc:'Porção de frango no varal acompanhado de fritas', price:'R$ 34,90' },

  // — BEBIDAS – ÁGUAS E REFRIGERANTES —
  { category:'bebida-agua', title:'Água c/ gás 500ml', desc:'', price:'R$ 4,00' },
  { category:'bebida-agua', title:'Água sem gás 500ml', desc:'', price:'R$ 3,50' },
  { category:'bebida-agua', title:'Coca-Cola 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'Coca-Cola 600ml', desc:'', price:'R$ 8,90' },
  { category:'bebida-agua', title:'Coca-Cola Lata', desc:'', price:'R$ 6,50' },
  { category:'bebida-agua', title:'Coca-Cola Zero 600ml', desc:'', price:'R$ 8,90' },
  { category:'bebida-agua', title:'Coca-Cola Zero Lata', desc:'', price:'R$ 6,50' },
  { category:'bebida-agua', title:'Fanta laranja 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'Fanta laranja Lata', desc:'', price:'R$ 6,50' },
  { category:'bebida-agua', title:'Fanta uva Lata', desc:'', price:'R$ 6,50' },
  { category:'bebida-agua', title:'Guaraná Antarctica 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'Guaraná Antarctica 600ml', desc:'', price:'R$ 8,90' },
  { category:'bebida-agua', title:'Guaraná Zero 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'H2O Limoneto 500ml', desc:'', price:'R$ 7,90' },
  { category:'bebida-agua', title:'Sprite 2 litros', desc:'', price:'R$ 13,50' },
  { category:'bebida-agua', title:'Sprite Lata', desc:'', price:'R$ 6,50' },

  // — BEBIDAS – SUCOS NATURAIS —
  { category:'bebida-suco', title:'Del Valle Goiaba Lata', desc:'', price:'R$ 6,90' },
  { category:'bebida-suco', title:'Del Valle Manga Lata', desc:'', price:'R$ 6,90' },
  { category:'bebida-suco', title:'Del Valle Pêssego Lata', desc:'', price:'R$ 6,90' },
  { category:'bebida-suco', title:'Del Valle Uva Lata', desc:'', price:'R$ 6,90' },
  { category:'bebida-suco', title:'Suco Natural Abacaxi (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Abacaxi c/ Ameixa (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Abacaxi c/ Hortelã (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Natural Laranja (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Laranja c/ Morango (350ml)', desc:'', price:'R$ 15,90' },
  { category:'bebida-suco', title:'Suco Natural Limão (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Natural Maracujá (350ml)', desc:'', price:'R$ 11,90' },
  { category:'bebida-suco', title:'Suco Natural Morango (350ml)', desc:'', price:'R$ 11,90' },

  // — BEBIDAS – CERVEJAS —
  { category:'bebida-cerveja', title:'Amstel (Puro Malte) Lata 350ml', desc:'', price:'R$ 6,90' },
  { category:'bebida-cerveja', title:'Antarctica Lata 350ml', desc:'', price:'R$ 6,90' },
  { category:'bebida-cerveja', title:'Brahma Lata 350ml', desc:'', price:'R$ 6,90' },
  { category:'bebida-cerveja', title:'Corona Extra Long Neck 330ml', desc:'', price:'R$ 12,90' },
  { category:'bebida-cerveja', title:'Heineken (Puro Malte) Long Neck 330ml', desc:'', price:'R$ 11,90' },
  { category:'bebida-cerveja', title:'Heineken Zero Long Neck 330ml', desc:'', price:'R$ 11,90' },
  { category:'bebida-cerveja', title:'Skol Lata 350ml', desc:'', price:'R$ 6,90' },
  { category:'bebida-cerveja', title:'Spaten Long Neck 330ml', desc:'', price:'R$ 10,90' },
  { category:'bebida-cerveja', title:'Stella Artois Long Neck 330ml', desc:'', price:'R$ 11,90' },

  // — BEBIDAS – VINHOS —
  { category:'bebida-vinho', title:'Vinho Girola Branco Seco 750ml', desc:'', price:'R$ 32,50' },
  { category:'bebida-vinho', title:'Vinho Girola Branco Suave 750ml', desc:'', price:'R$ 32,50' },
  { category:'bebida-vinho', title:'Vinho Girola Rosé Suave 750ml', desc:'', price:'R$ 32,50' },
  { category:'bebida-vinho', title:'Vinho Girola Tinto Seco 750ml', desc:'', price:'R$ 32,50' },
  { category:'bebida-vinho', title:'Vinho Girola Tinto Suave 750ml', desc:'', price:'R$ 32,50' }
];

// Função que renderiza todo o cardápio
function renderCardapio() {
  const panel = document.getElementById('panelContent');
  panel.innerHTML = '';

  // 1) Colunas de Pizzas
  const wrapper = document.createElement('div');
  wrapper.className = 'menu-columns';
  ['salgada','doce'].forEach(tipo => {
    const col = document.createElement('div');
    col.className = `menu-column ${tipo}`;
    col.innerHTML = `<h2 class="headline-central">${tipo === 'salgada' ? 'Pizzas Salgadas' : 'Pizzas Doces'}</h2>`;

    pizzas
      .filter(item => item.category === tipo)
      .sort((a, b) => a.title.localeCompare(b.title, 'pt'))
      .forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
          <h3>${item.title}<span class="price">${item.price}</span></h3>
          <p>${item.desc}</p>
        `;
        col.appendChild(div);
      });
    wrapper.appendChild(col);
  });
  panel.appendChild(wrapper);

  // Seções adicionais para outras categorias, como Fondue, Caldos, etc
  const sections = [
    { key: 'fondue', title: 'Fondue' },
    { key: 'caldo', title: 'Caldos' },
    { key: 'salada', title: 'Saladas' },
    { key: 'massa', title: 'Massas' },
    { key: 'talharim', title: 'Massas – Talharim' },
    { key: 'porcao', title: 'Porções' },
    { key: 'bebida-agua', title: 'Bebidas – Águas/Refri' },
    { key: 'bebida-suco', title: 'Bebidas – Sucos' },
    { key: 'bebida-cerveja', title: 'Bebidas – Cervejas' },
    { key: 'bebida-vinho', title: 'Bebidas – Vinhos' }
  ];

  sections.forEach(sec => {
    const itens = pizzas.filter(i => i.category === sec.key);
    if (!itens.length) return;

    // Linha na Seção de Fondue
    if (sec.key === 'fondue') {
      const hr = document.createElement('hr');
      hr.style.border = 'none';
      hr.style.height = '2px';
      hr.style.backgroundColor = '#e63946';
      hr.style.opacity = '0.5';
      hr.style.margin = '30px';
      panel.appendChild(hr);
    }

    // título da seção
    const H2 = document.createElement('h2');
    H2.className = 'headline-central';
    H2.textContent = sec.title;
    panel.appendChild(H2);
    // itens
    itens.forEach(item => {
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = `
        <h3>${item.title}<span class="price">${item.price}</span></h3>
        <p>${item.desc}</p>
      `;
      panel.appendChild(div);
    });
  });
}


// Modifique o evento DOMContentLoaded para incluir a carga de conteúdo específico
document.addEventListener('DOMContentLoaded', () => {
  carregarConteudoEspecifico(); // Carregar conteúdo específico para a página atual
  addDecorativeUtensils();
  aplicarEstiloItalianoPainel();
if (!document.querySelector('.galeria-modal')) {
    const modal = document.createElement('div');
    modal.className = 'galeria-modal';
    modal.innerHTML = `
      <span class="galeria-fechar">&times;</span>
      <img class="galeria-modal-content">
      <div class="galeria-caption"></div>
    `;
    document.body.appendChild(modal);
    
    // Adicionar evento para fechar o modal
    modal.querySelector('.galeria-fechar').addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    // Fechar o modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    console.log('Modal da galeria criado');
  }
  if (getCurrentPage() === 'cardapio') {
    renderCardapio();
  }
   setupUtensils();  

  debugButton.addEventListener('click', () => {
    carregarConteudoEspecifico();
    if (getCurrentPage() === 'cardapio') renderCardapio();
    corrigirVisibilidadeConteudo();
  });
  document.body.appendChild(debugButton);
}); 


// Observar mudanças no DOM que possam afetar a visibilidade do painel
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
  
  console.log('Talheres decorativos adicionados à página');
  // Configurar a interação com o bottom panel
  setupUtensilsInteraction();
}

// Função para configurar a interação dos talheres com o bottom panel
function setupUtensilsInteraction() {
  const bottomPanel = document.getElementById('bottomPanel');
  if (!bottomPanel) return;
  
  const leftUtensil = document.querySelector('.left-utensil');
  const rightUtensil = document.querySelector('.right-utensil');
  
  // Atualizar a classe dos talheres quando o painel mudar
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        const isPanelOpen = bottomPanel.classList.contains('open');
        leftUtensil.classList.toggle('panel-open', isPanelOpen);
        rightUtensil.classList.toggle('panel-open', isPanelOpen);
      }
    });
  });
  
  observer.observe(bottomPanel, { attributes: true });
  
  // Também atualizar quando togglePanel for chamado diretamente
  const originalTogglePanel = window.togglePanel;
  if (originalTogglePanel) {
    window.togglePanel = function() {
      originalTogglePanel.apply(this, arguments);
      const isPanelOpen = bottomPanel.classList.contains('open');
      leftUtensil.classList.toggle('panel-open', isPanelOpen);
      rightUtensil.classList.toggle('panel-open', isPanelOpen);
    };
  }
  
}
// Adicione esta função para inicializar a galeria de fotos
function initGaleria() {
  const galeriaItems = document.querySelectorAll('.galeria-item');
  const modal = document.querySelector('.galeria-modal');
  
  // Se não existir modal, crie um
  if (!modal && galeriaItems.length > 0) {
    const newModal = document.createElement('div');
    newModal.className = 'galeria-modal';
    newModal.innerHTML = `
      <span class="galeria-fechar">&times;</span>
      <img class="galeria-modal-content">
      <div class="galeria-caption"></div>
    `;
    document.body.appendChild(newModal);
    
    const fecharBtn = modal.querySelector('.galeria-fechar');
  fecharBtn.onclick = function() {
    modal.style.display = 'none';
  };
  }
  
  // Adicionar eventos de clique aos itens da galeria
  galeriaItems.forEach(item => {
    // Remover eventos antigos para evitar duplicação
    item.removeEventListener('click', handleGaleriaClick);
    
    // Adicionar novo evento de clique
    item.addEventListener('click', handleGaleriaClick);
  });
  
  // Função para lidar com o clique na galeria
  function handleGaleriaClick() {
    const img = this.querySelector('img');
    const modalImg = modal.querySelector('.galeria-modal-content');
    const captionText = modal.querySelector('.galeria-caption');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    captionText.innerHTML = this.getAttribute('data-description');
    
    console.log('Imagem clicada:', img.src);
  }
  
  console.log('Galeria inicializada com', galeriaItems.length, 'itens');
}


// Adicione esta função para animar a timeline
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    // Adicionar atraso baseado no índice
    setTimeout(() => {
      item.classList.add('visible');
    }, index * 300);
  });
}
function removerSecoesDuplicadas() {
  // Obter todas as seções de depoimentos
  const secoes = document.querySelectorAll('.depoimentos');
  
  // Se houver mais de uma seção de depoimentos, manter apenas a última
  if (secoes.length > 1) {
    // Remover todas exceto a última
    for (let i = 0; i < secoes.length - 1; i++) {
      secoes[i].remove();
    }
  }
}
function aplicarEstiloItalianoPainel() {
  const currentPage = getCurrentPage();
  const bottomPanel = document.getElementById('bottomPanel');
  
  if (!bottomPanel) return;
  
  // Remover qualquer classe de tema anterior
  bottomPanel.classList.remove('tema-italiano');
  
  // Aplicar o tema italiano apenas na página Sobre Nós
  if (currentPage === 'sobre') {
    console.log('Aplicando tema italiano ao painel na página Sobre Nós');
    bottomPanel.classList.add('tema-italiano');
  }
}
function adicionarManchasMolho() {
  if (getCurrentPage() !== 'sobre') return;
  
  const bottomPanel = document.getElementById('bottomPanel');
  if (!bottomPanel) return;
  
  // Criar 3 manchas aleatórias
  for (let i = 0; i < 3; i++) {
    const mancha = document.createElement('div');
    mancha.className = 'mancha-molho';
    
    // Posição aleatória
    const top = Math.random() * 80 + 10; // 10-90%
    const left = Math.random() * 80 + 10; // 10-90%
    
    // Tamanho aleatório
    const size = Math.random() * 100 + 50; // 50-150px
    
    // Rotação aleatória
    const rotate = Math.random() * 360;
    
    mancha.style.position = 'absolute';
    mancha.style.top = `${top}%`;
    mancha.style.left = `${left}%`;
    mancha.style.width = `${size}px`;
    mancha.style.height = `${size}px`;
    mancha.style.borderRadius = '50%';
    mancha.style.background = 'radial-gradient(circle, rgba(206,43,55,0.15) 0%, rgba(206,43,55,0) 70%)';
    mancha.style.transform = `rotate(${rotate}deg)`;
    mancha.style.zIndex = '-1';
    mancha.style.pointerEvents = 'none';
    
    bottomPanel.appendChild(mancha);
  }
}

// Chamar a função após carregar o conteúdo
document.addEventListener('DOMContentLoaded', () => {
  // Código existente...
  
  // Adicionar manchas de molho
  setTimeout(adicionarManchasMolho, 500);
});

function aplicarCursoresPizza() {
  if (getCurrentPage() !== 'sobre') return;
  
  const bottomPanel = document.getElementById('bottomPanel');
  if (!bottomPanel || !bottomPanel.classList.contains('tema-italiano')) return;
  
  console.log('Aplicando cursores de pizza personalizados');
  
  // Garantir que os cursores personalizados sejam aplicados a elementos dinâmicos
  const elementosClicaveis = bottomPanel.querySelectorAll('a, button, .accordion-header, .galeria-item, .swiper-button-next, .swiper-button-prev, .timeline-dot, .estatistica-item');
  
  elementosClicaveis.forEach(elemento => {
    // Adicionar classe para facilitar a aplicação do CSS
    elemento.classList.add('cursor-pizza-fatia');
    
    // Adicionar eventos para garantir que o cursor mude corretamente
    elemento.addEventListener('mousedown', () => {
      elemento.classList.add('cursor-pizza-mordida');
    });
    
    elemento.addEventListener('mouseup', () => {
      elemento.classList.remove('cursor-pizza-mordida');
    });
    
    elemento.addEventListener('mouseleave', () => {
      elemento.classList.remove('cursor-pizza-mordida');
    });
  });
}

// Chamar a função após carregar o conteúdo e sempre que o conteúdo for atualizado
document.addEventListener('DOMContentLoaded', () => {
  // Código existente...
  
  // Aplicar cursores de pizza
  setTimeout(aplicarCursoresPizza, 500);
  
  // Observar mudanças no DOM para aplicar cursores a elementos dinâmicos
  const observer = new MutationObserver(() => {
    aplicarCursoresPizza();
  });
  
  const bottomPanel = document.getElementById('bottomPanel');
  if (bottomPanel) {
    observer.observe(bottomPanel, { childList: true, subtree: true });
  }
});
const swiper = new Swiper('.depoimento-swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});
// Função para o calendário modal
// Adicione este código ao seu arquivo script.js
document.addEventListener('DOMContentLoaded', function() {
  const btnCalendario = document.getElementById('btn-calendario-completo');
  const calendarioModal = document.getElementById('calendario-modal');
  const closeModal = document.querySelector('.close-modal');
  
  if (btnCalendario && calendarioModal) {
    btnCalendario.addEventListener('click', function(e) {
      e.preventDefault();
      calendarioModal.style.display = 'block';
    });
  }
  
  if (closeModal && calendarioModal) {
    closeModal.addEventListener('click', function() {
      calendarioModal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
      if (e.target === calendarioModal) {
        calendarioModal.style.display = 'none';
      }
    });
  }
});
function gerarCalendario(ano, mes) {
  // Obter o elemento onde o calendário será renderizado
  const calendario = document.getElementById('dias-calendario');
  calendario.innerHTML = '';
  
  // Criar uma data para o primeiro dia do mês
  const primeiroDia = new Date(ano, mes, 1);
  // Obter o último dia do mês
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  // Obter o dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
  const primeiroDiaSemana = primeiroDia.getDay();
  
  // Nomes dos meses em português
  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  // Atualizar o título do mês
  document.getElementById('mes-atual').textContent = `${nomesMeses[mes]} ${ano}`;
  
  // Eventos (exemplo)
  const eventos = [
    { data: new Date(2023, 5, 15), titulo: 'Noite Napolitana', tipo: 'degustacao' },
    { data: new Date(2023, 5, 22), titulo: 'Workshop de Massas', tipo: 'workshop' },
    { data: new Date(2023, 5, 30), titulo: 'Festival de Sabores', tipo: 'festival' },
    { data: new Date(2023, 6, 5), titulo: 'Vinhos Italianos', tipo: 'degustacao' },
    { data: new Date(2023, 6, 18), titulo: 'Segredos do Molho', tipo: 'workshop' },
    { data: new Date(2023, 7, 10), titulo: 'Pizza Week', tipo: 'festival' }
  ];
  
  // Adicionar células vazias para os dias antes do primeiro dia do mês
  for (let i = 0; i < primeiroDiaSemana; i++) {
    const diaVazio = document.createElement('div');
    diaVazio.className = 'dia';
    calendario.appendChild(diaVazio);
  }
  
  // Adicionar células para cada dia do mês
  for (let dia = 1; dia <= ultimoDia; dia++) {
    const diaAtual = new Date(ano, mes, dia);
    const diaEl = document.createElement('div');
    diaEl.className = 'dia';
    diaEl.textContent = dia;
    
    // Verificar se é o dia atual
    const hoje = new Date();
    if (diaAtual.getDate() === hoje.getDate() && 
        diaAtual.getMonth() === hoje.getMonth() && 
        diaAtual.getFullYear() === hoje.getFullYear()) {
      diaEl.classList.add('dia-atual');
    }
    
    // Verificar se há eventos neste dia
    const eventosNoDia = eventos.filter(evento => 
      evento.data.getDate() === dia && 
      evento.data.getMonth() === mes && 
      evento.data.getFullYear() === ano
    );
    
    if (eventosNoDia.length > 0) {
      diaEl.classList.add('dia-evento');
      
      // Adicionar os eventos do dia
      eventosNoDia.forEach(evento => {
        const eventoEl = document.createElement('div');
        eventoEl.className = `evento-item evento-${evento.tipo}`;
        eventoEl.textContent = evento.titulo;
        diaEl.appendChild(eventoEl);
      });
    }
    
    calendario.appendChild(diaEl);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth();
  
  // Gerar o calendário inicial
  gerarCalendario(anoAtual, mesAtual);
  
  // Adicionar eventos para os botões de navegação
  document.getElementById('mes-anterior').addEventListener('click', function() {
    const mesAtualEl = document.getElementById('mes-atual');
    const [nomeMes, ano] = mesAtualEl.textContent.split(' ');
    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    let mes = nomesMeses.indexOf(nomeMes);
    let anoNum = parseInt(ano);
    
    mes--;
    if (mes < 0) {
      mes = 11;
      anoNum--;
    }
    
    gerarCalendario(anoNum, mes);
  });
  
  document.getElementById('proximo-mes').addEventListener('click', function() {
    const mesAtualEl = document.getElementById('mes-atual');
    const [nomeMes, ano] = mesAtualEl.textContent.split(' ');
    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    let mes = nomesMeses.indexOf(nomeMes);
    let anoNum = parseInt(ano);
    
    mes++;
    if (mes > 11) {
      mes = 0;
      anoNum++;
    }
    
    gerarCalendario(anoNum, mes);
  });
  
  // Abrir modal do calendário
  document.getElementById('btn-calendario-completo').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('calendario-modal').style.display = 'block';
  });
  
  // Fechar modal
  document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('calendario-modal').style.display = 'none';
  });
  
  // Fechar modal ao clicar fora
  window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('calendario-modal')) {
      document.getElementById('calendario-modal').style.display = 'none';
    }
  });
});
function gerarCalendario(ano, mes) {
  // Obter o elemento onde o calendário será renderizado
  const calendario = document.getElementById('dias-calendario');
  calendario.innerHTML = '';
  
  // Criar uma data para o primeiro dia do mês
  const primeiroDia = new Date(ano, mes, 1);
  // Obter o último dia do mês
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  // Obter o dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
  const primeiroDiaSemana = primeiroDia.getDay();
  
  // Nomes dos meses em português
  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  // Atualizar o título do mês
  document.getElementById('mes-atual').textContent = `${nomesMeses[mes]} ${ano}`;
  
  // Eventos (exemplo)
  const eventos = [
    { data: new Date(2023, 5, 15), titulo: 'Noite Napolitana', tipo: 'degustacao' },
    { data: new Date(2023, 5, 22), titulo: 'Workshop de Massas', tipo: 'workshop' },
    { data: new Date(2023, 5, 30), titulo: 'Festival de Sabores', tipo: 'festival' },
    { data: new Date(2023, 6, 5), titulo: 'Vinhos Italianos', tipo: 'degustacao' },
    { data: new Date(2023, 6, 18), titulo: 'Segredos do Molho', tipo: 'workshop' },
    { data: new Date(2023, 7, 10), titulo: 'Pizza Week', tipo: 'festival' }
  ];
  
  // Adicionar células vazias para os dias antes do primeiro dia do mês
  for (let i = 0; i < primeiroDiaSemana; i++) {
    const diaVazio = document.createElement('div');
    diaVazio.className = 'dia';
    calendario.appendChild(diaVazio);
  }
  
  // Adicionar células para cada dia do mês
  for (let dia = 1; dia <= ultimoDia; dia++) {
    const diaAtual = new Date(ano, mes, dia);
    const diaEl = document.createElement('div');
    diaEl.className = 'dia';
    diaEl.textContent = dia;
    
    // Verificar se é o dia atual
    const hoje = new Date();
    if (diaAtual.getDate() === hoje.getDate() && 
        diaAtual.getMonth() === hoje.getMonth() && 
        diaAtual.getFullYear() === hoje.getFullYear()) {
      diaEl.classList.add('dia-atual');
    }
    
    // Verificar se há eventos neste dia
    const eventosNoDia = eventos.filter(evento => 
      evento.data.getDate() === dia && 
      evento.data.getMonth() === mes && 
      evento.data.getFullYear() === ano
    );
    
    if (eventosNoDia.length > 0) {
      diaEl.classList.add('dia-evento');
      
      // Adicionar os eventos do dia
      eventosNoDia.forEach(evento => {
        const eventoEl = document.createElement('div');
        eventoEl.className = `evento-item evento-${evento.tipo}`;
        eventoEl.textContent = evento.titulo;
        diaEl.appendChild(eventoEl);
      });
    }
    
    calendario.appendChild(diaEl);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth();
  
  // Gerar o calendário inicial
  gerarCalendario(anoAtual, mesAtual);
  
  // Adicionar eventos para os botões de navegação
  document.getElementById('mes-anterior').addEventListener('click', function() {
    const mesAtualEl = document.getElementById('mes-atual');
    const [nomeMes, ano] = mesAtualEl.textContent.split(' ');
    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    let mes = nomesMeses.indexOf(nomeMes);
    let anoNum = parseInt(ano);
    
    mes--;
    if (mes < 0) {
      mes = 11;
      anoNum--;
    }
    
    gerarCalendario(anoNum, mes);
  });
  
  document.getElementById('proximo-mes').addEventListener('click', function() {
    const mesAtualEl = document.getElementById('mes-atual');
    const [nomeMes, ano] = mesAtualEl.textContent.split(' ');
    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    let mes = nomesMeses.indexOf(nomeMes);
    let anoNum = parseInt(ano);
    
    mes++;
    if (mes > 11) {
      mes = 0;
      anoNum++;
    }
    
    gerarCalendario(anoNum, mes);
  });
  
  // Abrir modal do calendário
  document.getElementById('btn-calendario-completo').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('calendario-modal').style.display = 'block';
  });
  
  // Fechar modal
  document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('calendario-modal').style.display = 'none';
  });
  
  // Fechar modal ao clicar fora
  window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('calendario-modal')) {
      document.getElementById('calendario-modal').style.display = 'none';
    }
  });
});
// Aguarda o EmailJS carregar antes de inicializar
function inicializarEmailJS() {
    if (typeof emailjs !== 'undefined') {
        console.log('EmailJS carregado com sucesso!');
        // Substitua pela sua chave pública do EmailJS
        emailjs.init("9UpfNm6FwZcwsTu9c");
        return true;
    } else {
        console.log('EmailJS ainda não carregado...');
        return false;
    }
}

// Função para enviar email de boas-vindas
function enviarEmailBoasVindas(email) {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS não está carregado!');
        return Promise.reject('EmailJS não disponível');
    }

    const templateParams = {
        to_email: email,
        to_name: email.split('@')[0],
        from_name: "Nostra Massa Pizzaria",
        subject: "Bem-vindo ao Clube Nostra Massa! 🍕",
        message: `Bem-vindo(a) ao Clube Nostra Massa! 🍕

Obrigado por se juntar à nossa família italiana! Agora você faz parte de um clube exclusivo de amantes da verdadeira pizza italiana.

Como membro do Clube Nostra Massa, você terá acesso a:

🎯 Degustações exclusivas de novos sabores
💰 15% de desconto em todas as compras  
🎉 Convites para eventos gastronômicos especiais
👨‍🍳 Receitas exclusivas do nosso chef italiano

Fique de olho em seu email para receber nossas ofertas especiais e novidades!

Buon appetito!
Equipe Nostra Massa`
    };

    // Substitua pelos seus IDs do EmailJS
    return emailjs.send('service_5gck5a5', 'template_90imnpo', templateParams);
}

// Função para salvar email localmente
function salvarEmailLocalmente(email) {
    let emails = JSON.parse(localStorage.getItem('clubeEmails') || '[]');
    
    const novoEmail = {
        email: email,
        dataRegistro: new Date().toISOString(),
        timestamp: Date.now()
    };
    
    const emailExiste = emails.some(item => item.email === email);
    
    if (!emailExiste) {
        emails.push(novoEmail);
        localStorage.setItem('clubeEmails', JSON.stringify(emails));
        console.log('Email salvo localmente:', email);
        return true;
    }
    return false;
}

// Função para mostrar mensagem
function mostrarMensagem(tipo, mensagem) {
    const elementoSucesso = document.getElementById('mensagem-sucesso');
    const elementoErro = document.getElementById('mensagem-erro');
    
    if (elementoSucesso) elementoSucesso.style.display = 'none';
    if (elementoErro) elementoErro.style.display = 'none';
    
    if (tipo === 'sucesso' && elementoSucesso) {
        elementoSucesso.textContent = mensagem;
        elementoSucesso.style.display = 'block';
        setTimeout(() => elementoSucesso.style.display = 'none', 5000);
    } else if (tipo === 'erro' && elementoErro) {
        elementoErro.textContent = mensagem;
        elementoErro.style.display = 'block';
        setTimeout(() => elementoErro.style.display = 'none', 5000);
    }
}

// Event listener principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado...');
    
    // Aguarda o EmailJS carregar
    let tentativas = 0;
    const maxTentativas = 10;
    
    function aguardarEmailJS() {
        if (inicializarEmailJS()) {
            console.log('EmailJS inicializado!');
            configurarFormulario();
        } else if (tentativas < maxTentativas) {
            tentativas++;
            setTimeout(aguardarEmailJS, 500);
        } else {
            console.warn('EmailJS não carregou. Funcionará apenas salvamento local.');
            configurarFormulario();
        }
    }
    
    aguardarEmailJS();
});

function configurarFormulario() {
    const clubeForm = document.getElementById('clube-form');
    const emailInput = document.getElementById('email-input');
    
    console.log('Configurando formulário...', clubeForm, emailInput);
    
    if (clubeForm && emailInput) {
        console.log('Formulário encontrado! Adicionando event listener...');
        
        clubeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulário submetido!');
            
            const email = emailInput.value.trim();
            console.log('Email:', email);
            
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                mostrarMensagem('erro', 'Por favor, insira um email válido.');
                return;
            }

            const submitBtn = clubeForm.querySelector('.btn-clube');
            const textoOriginal = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Salva localmente
            const emailSalvo = salvarEmailLocalmente(email);
            
            if (!emailSalvo) {
                mostrarMensagem('erro', 'Este email já está cadastrado!');
                submitBtn.textContent = textoOriginal;
                submitBtn.disabled = false;
                return;
            }

            // Tenta enviar email se EmailJS estiver disponível
            if (typeof emailjs !== 'undefined') {
                enviarEmailBoasVindas(email)
                    .then(function(response) {
                        console.log('Email enviado!', response);
                        mostrarMensagem('sucesso', '✅ Email cadastrado com sucesso! Verifique sua caixa de entrada.');
                        emailInput.value = '';
                    })
                    .catch(function(error) {
                        console.error('Erro ao enviar email:', error);
                        mostrarMensagem('erro', '❌ Erro ao enviar email. Mas seu cadastro foi salvo!');
                    })
                    .finally(function() {
                        submitBtn.textContent = textoOriginal;
                        submitBtn.disabled = false;
                    });
            } else {
                // Apenas salvamento local
                mostrarMensagem('sucesso', '✅ Email cadastrado com sucesso!');
                emailInput.value = '';
                submitBtn.textContent = textoOriginal;
                submitBtn.disabled = false;
            }
        });
    } else {
        console.error('Formulário não encontrado!');
    }
}

// Funções utilitárias
function verEmailsCadastrados() {
    const emails = JSON.parse(localStorage.getItem('clubeEmails') || '[]');
    console.table(emails);
    return emails;
}

function exportarEmails() {
    const emails = JSON.parse(localStorage.getItem('clubeEmails') || '[]');
    const dataStr = JSON.stringify(emails, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'clube-emails-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
}
