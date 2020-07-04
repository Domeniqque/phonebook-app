export default {
  tabs: {
    numbers: 'PHONES',
    settings: 'SETTINGS',
  },
  phones: {
    title: 'Phones',
    create: {
      title: 'Add New Phone List',
      tip: '💡 Enter the area code (DDD)',
      label: {
        first: 'First phone in the list',
        last: 'Last phone in the list',
      },
      button: 'Add Phones',
      validation: {
        isInvalidTitle: 'Check your numbers',
        isInvalidText:
          'It is not possible to create a sequence with the numbers provided',
        firstNumberRequired: 'What is the first phone on the list?',
        lastNumberRequired: "Don't forget the last number on the list",
        veryLargeTitle: 'Your new list \n has {{distanceBetween}} numbers',
        veryLargeQuestion: 'Do you want to create anyway?',
        veryLargeOk: 'YES, CREATE',
        veryLargeCancel: 'NO',
      },
    },
    show: {
      title: 'Change Situation',
      clickToCall: 'touch to call',
      deleteTitle: 'Delete this number?',
      deleteOk: 'YES, DELETE',
      deleteCancel: 'CANCEL',
    },
  },
  settings: {
    title: 'Settings',
    language: {
      label: 'Language',
      placeholder: 'Select a language',
    },
    countryCode: {
      label: 'Country',
      placeholder: 'Select your country',
    },
    searchPlaceholder: 'Search',
  },
  phoneFilter: {
    new: 'New',
    received: 'Answered calls',
    missed: 'Missed calls',
    notExist: 'Does not exist',
    removed: 'Removed',
  },
  phoneStatus: {
    new: 'New',
    received: 'Answered call',
    missed: 'Missed call',
    notExist: 'Do not exist',
    removed: 'Removed',
  },
  defaultError: {
    title: "Please i'm sorry! 😢",
    text:
      'There was an unexpected error. What do you think of closing the application and trying again? \n\nIf you still did not succeed, contact me.',
  },
};
