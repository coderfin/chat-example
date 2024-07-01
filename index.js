{
  const sendButton = document.querySelector('#send');
  sendButton.addEventListener('click', window.chatClient.send);

  const chatInput = document.querySelector('#chat');
  chatInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && !sendButton.disabled) {
      window.chatClient.send();
    }
  });

  const searchParams = new URL(document.location).searchParams;

  window.userbase
    .init({
      appId: process.env.APP_ID,
      allowServerSideEncryption: true,
    })
    .then(({ user }) => {
      if (user) {
        window.chatClient.connect({
          room: searchParams?.get('room'),
          share: searchParams?.get('share'),
        });
      }
    });
}
