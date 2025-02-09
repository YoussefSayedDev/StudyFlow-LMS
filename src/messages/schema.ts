export type Messages = {
  auth: {
    signIn: {
      title: string;
      description: string;
      noAccount: string;
      signUp: string;
      form: {
        username: {
          label: string;
          placeholder: string;
        };
        password: {
          label: string;
          placeholder: string;
        };
        submit: string;
        error: string;
      };
    };
    signUp: {
      // ... similar structure
    };
  };
  navigation: {
    menu: {
      sections: {
        main: string;
        other: string;
      };
      items: {
        home: string;
        teachers: string;
        // ... other items
        academic: {
          subjects: string;
          classes: string;
          lessons: string;
          exams: string;
        };
        // ... other sections
      };
    };
  };
  common: {
    actions: {
      submit: string;
      cancel: string;
      save: string;
      delete: string;
    };
    errors: {
      generic: string;
      required: string;
      invalid: string;
    };
  };
};
