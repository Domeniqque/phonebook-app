export default {
  tabs: {
    numbers: 'TELEFONES',
    settings: 'AJUSTES',
  },
  phones: {
    title: 'Telefones',
    create: {
      title: 'Adicionar Telefones',
      tip: '💡 Informe o código de área (DDD)',
      label: {
        first: 'Primeiro telefone da lista',
        last: 'Último telefone da lista',
      },
      button: 'Adicionar Telefones',
      validation: {
        isInvalidTitle: 'Verifique seus números',
        isInvalidText:
          'Não é possível criar uma sequência com os números informados',
        firstNumberRequired: 'Qual o primeiro telefone da lista?',
        lastNumberRequired: 'Não esqueça do último número da lista',
        veryLargeTitle:
          'Esta nova sequência possui \n {{distanceBetween}} números',
        veryLargeQuestion: 'Deseja criar mesmo assim?',
        veryLargeOk: 'SIM, CADASTRAR',
        veryLargeCancel: 'NÃO',
      },
    },
    show: {
      title: 'Atualizar Situação',
      clickToCall: 'toque para chamar',
      deleteTitle: 'Excluir este número?',
      deleteOk: 'SIM, EXCLUIR',
      deleteCancel: 'CANCELAR',
    },
  },
  settings: {
    title: 'Ajustes',
    language: {
      label: 'Idioma',
      placeholder: 'Selecione um idioma',
    },
    countryCode: {
      label: 'Seu país',
      placeholder: 'Selecione seu país',
    },
    searchPlaceholder: 'Buscar',
  },
  phoneFilter: {
    new: 'Novos',
    received: 'Atendidos',
    missed: 'Não atendidos',
    notExist: 'Não existem',
    removed: 'Removidos',
  },
  phoneStatus: {
    new: 'Novo',
    received: 'Atendido',
    missed: 'Não atendido',
    notExist: 'Não existe',
    removed: 'Removido',
  },
  defaultError: {
    title: 'Por favor, nos desculpe! 😢',
    text:
      'Houve erro inesperado. O que acha de fechar o aplicativo e tentar novamente? \n\nSe mesmo assim não conseguiu, entre em contato!',
  },
};
