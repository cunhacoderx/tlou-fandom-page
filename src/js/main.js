// Aguarda o carregamento completo do DOM antes de executar os scripts
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todos os botões de navegação de abas com atributo data-tab-btn
  const buttons = document.querySelectorAll('[data-tab-btn]');
  // Seleciona todas as perguntas do FAQ com atributo data-legacy-question
  const questions = document.querySelectorAll('[data-legacy-question]');

  // Associa evento de clique para cada botão de aba
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (btn) {
      const tabShow = btn.currentTarget.dataset.tabBtn;
      const tab = document.querySelector(`[data-tab-id="${tabShow}"]`);

      if (!tab) return; // Interrompe caso a aba alvo não exista

      hideAllTabs(); // Oculta todas as abas visíveis
      tab.classList.add('characters__list--active'); // Ativa a aba correspondente
      removeBtnActive(); // Remove destaque de todos os botões
      btn.currentTarget.classList.add('characters__tabs__btn--active'); // Destaca o botão ativo
    });
  }

  // Associa evento de clique para abrir/fechar respostas do FAQ
  for (let i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', openCloseAnswer);
  }
});

// Função para alternar visualização da resposta no FAQ
function openCloseAnswer(event) {
  const classe = 'legacy__list__item--is-open';
  const item = event.currentTarget.parentNode; // Elemento pai da pergunta (o item completo)
  item.classList.toggle(classe); // Adiciona ou remove a classe que exibe a resposta
}

// Remove a classe de botão ativo de todas as abas
function removeBtnActive() {
  const buttons = document.querySelectorAll('[data-tab-btn]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('characters__tabs__btn--active');
  }
}

// Oculta todas as abas visíveis
function hideAllTabs() {
  const tabs = document.querySelectorAll('[data-tab-id]');
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('characters__list--active', 'characters__infected');
  }
}
