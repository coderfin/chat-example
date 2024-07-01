{
  window.userbase
    .init({
      appId: window.config.APP_ID,
      allowServerSideEncryption: true,
    })
    .then(() => {
      window.userbase.signOut().then(() => {
        window.location.href = '/chat-example';
      });
    });
}
