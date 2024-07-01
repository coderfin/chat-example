{
  const signUpForm = document.querySelector('#sign-up');
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    window.account.signUp(event);
  });

  window.userbase.init({
    appId: window.config.APP_ID,
    allowServerSideEncryption: true,
  });

  window.account = {
    signUp: (event) => {
      const { email, password, username } = Object.fromEntries(
        new FormData(event.target).entries()
      );

      window.userbase.signUp({ username, password, email }).then(() => {
        window.location.href = '/chat-example';
      });
    },
  };
}
