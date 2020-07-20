export default {
  tabs: {
    numbers: 'PHONES',
    interested: 'INTERESTED',
    settings: 'SETTINGS',
  },
  phones: {
    title: 'Phones',
    emptyContentButton: 'ADD PHONE LIST',
    create: {
      title: 'Add Phone List',
      tip: 'Enter the area code (DDD)',
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
      updatedAt: 'Updated on',
    },
  },
  interested: {
    title: 'Interested',
    create: {
      title: 'Add Interested',
      nameLabel: 'Name',
      genderLabel: 'Gender',
      genderPlaceholder: 'Select',
      lifeStageLabel: 'This person is',
      lifeStagePlaceholder: 'Select',
      addressLabel: 'Address',
      addressPlaceholder: 'City, State, etc.',
      phoneNumberLabel: 'Phone Number (required)',
      buttonText: 'Add Interested',
    },
    show: {
      title: 'Details',
      deleteTitle: 'Delete this interested?',
      deleteOk: 'YES, DELETE',
      deleteCancel: 'CANCEL',
      call: 'Touch to call',
      btnAddPhone: 'add phone',
      unnamed: 'Unnamed',
    },
    edit: {
      title: 'Edit Interested',
      buttonText: 'Save Changes',
    },
    validation: {
      phoneNumber: 'Phone number is required',
      invalidPhone: 'This phone is not valid',
    },
  },
  interestedPhones: {
    modalTitle: 'Add Phone',
    addButton: 'Save',
  },
  settings: {
    title: 'Settings',
    language: {
      label: 'Language',
      placeholder: 'Select',
    },
    country: {
      label: 'Country',
      placeholder: 'Select',
    },
    dialCode: {
      label: 'Dial code',
      placeholder: 'Select',
    },
    searchPlaceholder: 'Search',
    privacy: 'Privacy Policy',
    site: 'Developer Site',
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
  gender: {
    M: 'Male',
    F: 'Female',
  },
  lifeStages: {
    child: 'Child',
    young: 'Young',
    adult: 'Adult',
    elderly: 'Elderly',
  },
};
