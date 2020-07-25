export default {
  tabs: {
    numbers: 'TELEFONES',
    interested: 'INTERESSADOS',
    settings: 'AJUSTES',
  },
  phones: {
    title: 'Telefones',
    emptyContentButton: 'ADICIONAR NÚMEROS',
    create: {
      title: 'Adicionar Telefones',
      tip: 'Informe o código de área (DDD)',
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
      updatedAt: 'atualizado ',
      addInterested: 'Deseja adicionar um interessado?',
      addInterestedConfirm: 'Sim',
      addInterestedCancel: 'Não',
    },
  },
  interested: {
    title: 'Interessados',
    empty: 'ADICIONAR INTERESSADO',
    create: {
      title: 'Adicionar Interessado',
      nameLabel: 'Nome (optional)',
      genderLabel: 'Gênero',
      genderPlaceholder: 'Selecione',
      lifeStageLabel: 'Esta pessoa é',
      lifeStagePlaceholder: 'Selecione',
      addressLabel: 'Endereço (optional)',
      addressPlaceholder: 'Cidade, Estado, etc.',
      phoneNumberLabel: 'Telefone (obrigatório)',
      buttonText: 'Adicionar interessado',
    },
    notes: {
      title: 'Notas',
      addTitle: 'Adicionar Notas',
      btnAdd: 'add notes',
      btnSave: 'Salvar nota',
      titleDelete: 'Deseja excluir esta nota?',
      confirmDelete: 'Sim, excluir',
      cancelDelete: 'CANCELAR',
    },
    show: {
      title: 'Detalhes',
      deleteTitle: 'Excluir este interessado?',
      deleteOk: 'SIM, EXCLUIR',
      deleteCancel: 'CANCELAR',
      deleteConfimText: 'Isso não poderá ser desfeito',
      call: 'Toque para chamar',
      btnAddPhone: 'adicionar',
      unnamed: 'Sem nome',
    },
    edit: {
      title: 'Editar Interessado',
      buttonText: 'Salvar Alterações',
    },
    validation: {
      phoneNumber: 'Informe um telefone',
      invalidPhone: 'Este telefone não é válido',
      note: 'Escreva uma nota',
    },
  },
  interestedPhones: {
    modalTitle: 'Adicionar telefone',
    addButton: 'Salvar',
    invalidPhone: 'Este telefone não é válido',
  },
  settings: {
    title: 'Ajustes',
    language: {
      label: 'Idioma',
      placeholder: 'Selecione',
    },
    country: {
      label: 'Seu país',
      placeholder: 'Selecione',
    },
    dialCode: {
      label: 'Código do país',
      placeholder: 'Selecione',
    },
    searchPlaceholder: 'Buscar',
    privacy: 'Política de Privacidade',
    site: 'Site do Desenvolvedor',
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
  gender: {
    M: 'Masculino',
    F: 'Feminino',
  },
  lifeStages: {
    child: 'Criança',
    young: 'Jovem',
    adult: 'Adulto',
    elderly: 'Idoso',
  },
};
