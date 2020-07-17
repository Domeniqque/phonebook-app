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
      updatedAt: 'Atualizado no',
    },
  },
  interested: {
    title: 'Interessados',
    create: {
      title: 'Adicionar Interessado',
      nameLabel: 'Nome',
      genderLabel: 'Gênero',
      genderPlaceholder: 'Selecione',
      lifeStageLabel: 'Esta pessoa é',
      lifeStagePlaceholder: 'Selecione',
      addressLabel: 'Endereço',
      addressPlaceholder: 'Cidade, Estado, etc.',
      phoneNumberLabel: 'Telefone (obrigatório)',
      buttonText: 'Adicionar interessado',
    },
    show: {
      title: 'Visualizar',
    },
    validation: {
      phoneNumber: 'Informe um telefone',
    },
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
