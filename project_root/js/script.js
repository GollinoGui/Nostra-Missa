// script.js
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('cardapio.html')) return 'cardapio';
  if (path.includes('unidades.html')) return 'unidades';
  if (path.includes('contato.html')) return 'contato';
  if (path.includes('index.html') || path === '/' || path === '') return 'home';
  return 'home';
}



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
    inicializarReservas();
  }
});

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
  
 
  
  
  
  // Corrigir visibilidade e estilos
  
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

  debugButton.addEventListener('click', () => {
    carregarConteudoEspecifico();
    if (getCurrentPage() === 'cardapio') renderCardapio();
    
  });
  document.body.appendChild(debugButton);
}); 

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
  
  // Lista de eventos possíveis para gerar aleatoriamente
  const tiposEventos = [
    { titulo: 'Noite Napolitana', tipo: 'degustacao' },
    { titulo: 'Workshop de Massas', tipo: 'workshop' },
    { titulo: 'Festival de Sabores', tipo: 'festival' },
    { titulo: 'Vinhos Italianos', tipo: 'degustacao' },
    { titulo: 'Segredos do Molho', tipo: 'workshop' },
    { titulo: 'Pizza Week', tipo: 'festival' },
    { titulo: 'Degustação Especial', tipo: 'degustacao' },
    { titulo: 'Aula de Culinária', tipo: 'workshop' },
    { titulo: 'Noite Italiana', tipo: 'festival' },
    { titulo: 'Harmonização', tipo: 'degustacao' },
    { titulo: 'Master Class', tipo: 'workshop' },
    { titulo: 'Festa da Pizza', tipo: 'festival' },
    { titulo: 'Prova de Vinhos', tipo: 'degustacao' },
    { titulo: 'Curso de Massas', tipo: 'workshop' },
    { titulo: 'Rodízio Especial', tipo: 'festival' }
  ];
  
  // Função para gerar eventos aleatórios para o mês
  function gerarEventosAleatorios(ano, mes, ultimoDia) {
    const eventos = [];
    
    // Gerar entre 8 a 15 eventos aleatórios no mês
    const numeroEventos = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < numeroEventos; i++) {
      // Dia aleatório do mês (evita os primeiros 3 dias para parecer mais realista)
      const diaAleatorio = Math.floor(Math.random() * (ultimoDia - 3)) + 4;
      
      // Evento aleatório da lista
      const eventoAleatorio = tiposEventos[Math.floor(Math.random() * tiposEventos.length)];
      
      // Verifica se já não existe um evento neste dia
      const jaExiste = eventos.some(evento => 
        evento.data.getDate() === diaAleatorio && 
        evento.data.getMonth() === mes && 
        evento.data.getFullYear() === ano
      );
      
      if (!jaExiste) {
        eventos.push({
          data: new Date(ano, mes, diaAleatorio),
          titulo: eventoAleatorio.titulo,
          tipo: eventoAleatorio.tipo
        });
      }
    }
    
    return eventos;
  }
  
  // Gerar eventos aleatórios para este mês
  const eventos = gerarEventosAleatorios(ano, mes, ultimoDia);
  
  // Adicionar alguns eventos fixos para os próximos meses (para consistência)
  const eventosFixos = [
    { data: new Date(2023, 5, 15), titulo: 'Noite Napolitana', tipo: 'degustacao' },
    { data: new Date(2023, 5, 22), titulo: 'Workshop de Massas', tipo: 'workshop' },
    { data: new Date(2023, 5, 30), titulo: 'Festival de Sabores', tipo: 'festival' },
    { data: new Date(2023, 6, 5), titulo: 'Vinhos Italianos', tipo: 'degustacao' },
    { data: new Date(2023, 6, 18), titulo: 'Segredos do Molho', tipo: 'workshop' },
    { data: new Date(2023, 7, 10), titulo: 'Pizza Week', tipo: 'festival' }
  ];
  
  // Adicionar eventos fixos se estiverem no mês atual
  eventosFixos.forEach(eventoFixo => {
    if (eventoFixo.data.getMonth() === mes && eventoFixo.data.getFullYear() === ano) {
      // Verifica se não conflita com eventos aleatórios
      const conflito = eventos.some(evento => 
        evento.data.getDate() === eventoFixo.data.getDate()
      );
      
      if (!conflito) {
        eventos.push(eventoFixo);
      }
    }
  });
  
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
      
      // Adicionar os eventos do dia (máximo 2 para não sobrecarregar visualmente)
      const eventosParaMostrar = eventosNoDia.slice(0, 2);
      eventosParaMostrar.forEach(evento => {
        const eventoEl = document.createElement('div');
        eventoEl.className = `evento-item evento-${evento.tipo}`;
        eventoEl.textContent = evento.titulo;
        diaEl.appendChild(eventoEl);
      });
      
      // Se houver mais de 2 eventos, mostrar um indicador
      if (eventosNoDia.length > 2) {
        const maisEventos = document.createElement('div');
        maisEventos.className = 'evento-item mais-eventos';
        maisEventos.textContent = `+${eventosNoDia.length - 2} eventos`;
        diaEl.appendChild(maisEventos);
      }
    }
    
    calendario.appendChild(diaEl);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth();
  
  // Gerar o calendário inicial
  if (document.getElementById('dias-calendario')) {
    gerarCalendario(anoAtual, mesAtual);
  }
  
  // Adicionar eventos para os botões de navegação
  const btnAnterior = document.getElementById('mes-anterior');
  const btnProximo = document.getElementById('proximo-mes');
  const btnCalendario = document.getElementById('btn-calendario-completo');
  const closeModal = document.querySelector('.close-modal');
  const calendarioModal = document.getElementById('calendario-modal');
  
  if (btnAnterior) {
    btnAnterior.addEventListener('click', function() {
      const mesAtualEl = document.getElementById('mes-atual');
      if (!mesAtualEl) return;
      
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
  }
  
  if (btnProximo) {
    btnProximo.addEventListener('click', function() {
      const mesAtualEl = document.getElementById('mes-atual');
      if (!mesAtualEl) return;
      
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
  }
  
  // Abrir modal do calendário
  if (btnCalendario && calendarioModal) {
    btnCalendario.addEventListener('click', function(e) {
      e.preventDefault();
      calendarioModal.style.display = 'block';
    });
  }
  
  // Função para voltar ao mês atual
  function voltarMesAtual() {
    const hoje = new Date();
    console.log('Voltando para:', hoje.getFullYear(), hoje.getMonth());
    gerarCalendario(hoje.getFullYear(), hoje.getMonth());
  }
  
  // Fechar modal e voltar para o mês atual
  if (closeModal && calendarioModal) {
    closeModal.addEventListener('click', function() {
      console.log('Fechando modal pelo X');
      calendarioModal.style.display = 'none';
      voltarMesAtual();
    });
  }
  
  // Fechar modal ao clicar fora e voltar para o mês atual
  if (calendarioModal) {
    window.addEventListener('click', function(e) {
      if (e.target === calendarioModal) {
        console.log('Fechando modal clicando fora');
        calendarioModal.style.display = 'none';
        voltarMesAtual();
      }
    });
  }
});



// Inicializar EmailJS
(function(){
   emailjs.init("QA4Kynn7C1ejXygzH");
   console.log('EmailJS inicializado!');
})();

// Sistema de Reservas
console.log('Carregando sistema de reservas...');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM carregado');
  setTimeout(() => {
    inicializarReservas();
    inicializarClube(); // Adicionar esta linha
  }, 1000);
});

function inicializarReservas() {
  console.log('Inicializando reservas...');
  
  // 1. Configurar botões "Reservar"
  const botoesReserva = document.querySelectorAll('.btn-evento');
  console.log('Botões encontrados:', botoesReserva.length);
  
  botoesReserva.forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Botão reservar clicado:', index);
      
      // DEBUG: Verificar estrutura do evento
      const eventoCard = this.closest('.evento-card');
      console.log('Evento card encontrado:', eventoCard);
      
      if (eventoCard) {
        const h3 = eventoCard.querySelector('h3');
        const dia = eventoCard.querySelector('.evento-dia');
        const mes = eventoCard.querySelector('.evento-mes');
        const p = eventoCard.querySelector('p');
        
        console.log('Elementos encontrados:', {h3, dia, mes, p});
        
        const eventoNome = h3 ? h3.textContent : 'Evento não identificado';
        const eventoData = (dia ? dia.textContent : '??') + ' de ' + (mes ? mes.textContent : '??');
        const eventoDesc = p ? p.textContent : 'Descrição não disponível';
        
        console.log('Dados capturados:', {eventoNome, eventoData, eventoDesc});
        
        // Armazenar dados do evento no modal
        const modal = document.getElementById('modal-reserva');
        modal.setAttribute('data-evento-nome', eventoNome);
        modal.setAttribute('data-evento-data', eventoData);
        modal.setAttribute('data-evento-desc', eventoDesc);
        
        console.log('Dados salvos no modal');
      } else {
        console.error('Evento card não encontrado!');
      }
      
      abrirModal();
    });
  });
  
  // 2. Configurar fechamento do modal
  const closeBtn = document.querySelector('.close-reserva');
  if (closeBtn) {
    closeBtn.addEventListener('click', fecharModal);
  }
  
  // Fechar clicando fora do modal
  window.addEventListener('click', function(e) {
    if (e.target.id === 'modal-reserva') {
      fecharModal();
    }
  });
  
  // 3. Configurar formatação do telefone
  const telefoneInput = document.getElementById('telefone-reserva');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', formatarTelefone);
  }
  
  // 4. Configurar envio do formulário
  const form = document.getElementById('form-reserva');
  if (form) {
    form.addEventListener('submit', enviarReserva);
  }
}

// Função para formatar telefone automaticamente
function formatarTelefone(e) {
  let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
  if (valor.length > 11) {
    valor = valor.substring(0, 11);
  }
  if (valor.length <= 11) {
    // Formatar como (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (valor.length <= 2) {
      valor = valor.replace(/(\d{0,2})/, '($1');
    } else if (valor.length <= 7) {
      valor = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (valor.length <= 10) {
      valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }
  
  e.target.value = valor;
}

function abrirModal() {
  console.log('Abrindo modal...');
  const modal = document.getElementById('modal-reserva');
  
  if (modal) {
    // Pegar os dados salvos e mostrar no modal
    const eventoNome = modal.getAttribute('data-evento-nome') || 'Evento Especial';
    const eventoData = modal.getAttribute('data-evento-data') || 'Data a confirmar';
    const eventoDesc = modal.getAttribute('data-evento-desc') || 'Evento na Nostra Massa';
    
    // Atualizar os elementos visuais do modal
    document.getElementById('evento-nome-modal').textContent = eventoNome;
    document.getElementById('evento-data-modal').textContent = eventoData;
    document.getElementById('evento-descricao-modal').textContent = eventoDesc;
    
    console.log('Modal preenchido com:', {eventoNome, eventoData, eventoDesc});
    
    modal.style.display = 'block';
  } else {
    console.error('Modal não encontrado!');
  }
}

function fecharModal() {
  console.log('Fechando modal...');
  const modal = document.getElementById('modal-reserva');
  if (modal) {
    modal.style.display = 'none';
  }
}

function enviarReserva(e) {
  e.preventDefault();
  console.log('Enviando reserva...');
  
  const nome = document.getElementById('nome-reserva').value;
  const email = document.getElementById('email-reserva').value;
  const telefone = document.getElementById('telefone-reserva').value;
  
  // Validar campos obrigatórios
  if (!nome || !email) {
    mostrarNotificacao('erro', 'Campos obrigatórios', 'Por favor, preencha nome e email!');
    return;
  }
  
  // Validar telefone se foi preenchido
  if (telefone) {
    const numerosSomente = telefone.replace(/\D/g, '');
    if (numerosSomente.length < 10 || numerosSomente.length > 11) {
      mostrarNotificacao('erro', 'Telefone inválido', 'Digite um telefone válido. Ex: (16) 99999-9999');
      return;
    }
    
    if (numerosSomente[2] === '0' || numerosSomente[2] === '1') {
      mostrarNotificacao('erro', 'Telefone inválido', 'O terceiro dígito não pode ser 0 ou 1.');
      return;
    }
  }
  
  // Capturar dados do evento do modal
  const modal = document.getElementById('modal-reserva');
  const eventoNome = modal.getAttribute('data-evento-nome') || 'Evento Especial';
  const eventoData = modal.getAttribute('data-evento-data') || 'Data a confirmar';
  const eventoDesc = modal.getAttribute('data-evento-desc') || 'Evento na Nostra Massa';
  
  const btnSubmit = document.querySelector('.btn-confirmar-reserva');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Enviando...';
  
  // Formatar telefone para o email
  const telefoneFormatado = telefone ? telefone : 'Não informado';
  
  // Parâmetros finais para o email
  const parametrosEmail = {
    to_name: nome,
    to_email: email,
    evento_nome: eventoNome,
    evento_data: eventoData,
    evento_descricao: eventoDesc,
    cliente_telefone: telefoneFormatado
  };
  
  console.log('Parâmetros que serão enviados:', parametrosEmail);
  
  // Enviar email via EmailJS
  emailjs.send('service_5gck5a5', 'template_dc9tzmt', parametrosEmail)
    .then(function(response) {
      console.log('SUCCESS!', response);
      
      // Mostrar notificação de sucesso
      mostrarNotificacao('sucesso', 
        `Reserva confirmada para "${eventoNome}"!`, 
        'Verifique sua caixa de entrada e também a pasta de spam.'
      );
      
      // Fechar modal e limpar formulário
      fecharModal();
      document.getElementById('form-reserva').reset();
      
    }).catch(function(error) {
      console.error('ERROR:', error);
      
      // Mostrar notificação de erro
      mostrarNotificacao('erro', 
        'Erro ao enviar email', 
        'Tente novamente em alguns instantes.'
      );
      
    }).finally(function() {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Confirmar Reserva';
    });
}

// Funções para notificações
function mostrarNotificacao(tipo, titulo, mensagem) {
  const notificacaoId = tipo === 'sucesso' ? 'notificacao-sucesso' : 'notificacao-erro';
  const notificacao = document.getElementById(notificacaoId);
  
  if (notificacao) {
    // Atualizar textos se fornecidos
    if (titulo) {
      notificacao.querySelector('h3').textContent = titulo;
    }
    if (mensagem) {
      notificacao.querySelector('p').textContent = mensagem;
    }
    
    // Mostrar notificação
    notificacao.classList.add('mostrar');
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
      fecharNotificacao(notificacaoId);
    }, 5000);
  }
}

function fecharNotificacao(id) {
  const notificacao = id ? document.getElementById(id) : 
    document.querySelector('.notificacao.mostrar');
  
  if (notificacao) {
    notificacao.classList.add('saindo');
    
    setTimeout(() => {
      notificacao.classList.remove('mostrar', 'saindo');
    }, 400);
  }
}
function inicializarClube() {
  console.log('Inicializando Clube da Pizza...');
  
  const formClube = document.getElementById('clube-form');
  if (formClube) {
    formClube.addEventListener('submit', enviarClubeEmail);
    console.log('Formulário do clube encontrado e configurado');
  }
}

function enviarClubeEmail(e) {
  e.preventDefault();
  console.log('Enviando cadastro do clube...');
  
  const emailInput = document.getElementById('email-input');
  const email = emailInput.value.trim();
  
  console.log('Email digitado:', email);
  
  if (!email) {
    mostrarNotificacao('erro', 'Email obrigatório', 'Por favor, digite seu email!');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarNotificacao('erro', 'Email inválido', 'Por favor, digite um email válido!');
    return;
  }
  
  const nome = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
  console.log('Nome extraído:', nome);
  
  const btnSubmit = document.querySelector('.btn-clube');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Enviando...';
  
  const parametros = {
    to_name: nome,
    to_email: email
  };
  
  console.log('Parâmetros que serão enviados:', parametros);
  console.log('Service ID: service_5gck5a5');
  console.log('Template ID: template_88bct1w');
  
  // Enviar email via EmailJS
  emailjs.send('service_5gck5a5', 'template_88bct1w', parametros)
    .then(function(response) {
      console.log('SUCCESS!', response);
      mostrarNotificacao('sucesso', 
        'Bem-vindo(a) ao Clube Nostra Massa! 🍕', 
        'Verifique seu email para confirmar o cadastro.'
      );
      emailInput.value = '';
    }).catch(function(error) {
      console.error('ERROR COMPLETO:', error);
      console.error('Error text:', error.text);
      console.error('Error status:', error.status);
      
      mostrarNotificacao('erro', 
        'Erro ao cadastrar no clube', 
        'Erro: ' + (error.text || error.message || 'Tente novamente')
      );
    }).finally(function() {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Participar';
    });
}