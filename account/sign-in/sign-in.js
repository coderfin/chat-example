{
  const signInForm = document.querySelector('#sign-in');
  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    window.account.signIn(event);
  });

  window.userbase.init({
    appId: window.config.APP_ID,
    allowServerSideEncryption: true,
  });

  window.account = {
    signIn: (event) => {
      const { password, username } = Object.fromEntries(
        new FormData(event.target).entries()
      );

      window.userbase.signIn({ username, password }).then(() => {
        window.location.href = '/chat-example';
      });
    },
  };
}
