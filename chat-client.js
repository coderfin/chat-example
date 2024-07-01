{
  const chatInput = document.querySelector('#chat');
  const sendButton = document.querySelector('#send');
  const chatsList = document.querySelector('#chats > ul');

  const databaseConfig = {};
  window.chatClient = {
    chats: (chats) => {
      const lastRecievedId = chatsList.querySelector(
        ':scope > li:first-of-type'
      )?.id;

      if (lastRecievedId) {
        const indexOfLastRecieved = chats.findIndex(
          (chat) => chat.itemId === lastRecievedId
        );
        chats.splice(0, indexOfLastRecieved + 1);
      }

      chats.forEach((chat) => {
        const li = document.createElement('li');
        li.id = chat.itemId;
        li.textContent = `${chat.item.chat} - From: ${chat.createdBy.username}`;
        chatsList.prepend(li);
      });
    },
    connect: ({ room, share }) => {
      if (!room) {
        return;
      }

      window.userbase.getDatabases().then(({ databases }) => {
        const databaseName = `room-${room}`;

        const foundDatabase = databases.find(
          ({ databaseName: currentDatabaseName }) =>
            currentDatabaseName === databaseName
        );

        if (!foundDatabase || foundDatabase.isOwner) {
          databaseConfig.databaseName = databaseName;
        } else if (foundDatabase && !foundDatabase.isOwner) {
          // Required when trying to access a shared database
          databaseConfig.databaseId = foundDatabase.databaseId;
        }

        window.userbase
          .openDatabase({
            ...databaseConfig,
            changeHandler: window.chatClient.chats,
          })
          .then(() => {
            if (
              (!foundDatabase && share) ||
              (foundDatabase &&
                share &&
                !foundDatabase.users.find((user) => user.username === share))
            ) {
              window.userbase
                .shareDatabase({
                  databaseName: databaseConfig.databaseName,
                  readOnly: false,
                  requireVerified: false,
                  username: share,
                })
                .then(() => {
                  chatInput.disabled = false;
                  sendButton.disabled = false;
                });
            } else {
              chatInput.disabled = false;
              sendButton.disabled = false;
            }
          });
      });
    },
    send: () => {
      window.userbase
        .insertItem({
          ...databaseConfig,
          item: { chat: chat.value },
        })
        .then(() => {
          chatInput.value = '';
        });
    },
  };
}
