{
  window.userbase
    .init({
      appId: process.env.APP_ID,
      allowServerSideEncryption: true,
    })
    .then(() => {
      window.userbase.signOut().then(() => {
        window.location.href = '/';
      });
    });
}
