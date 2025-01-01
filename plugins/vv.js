const viewOnceCommand = {
    pattern: 'vv',
    react: '🌠',
    alias: ["rvo"],
    desc: "Check bot's ping"
  };
  
  viewOnceCommand.category = "main";
  viewOnceCommand.use = ".vv";
  viewOnceCommand.filename = __filename;
  
  cmd(viewOnceCommand, async (
    conn, // Represents the bot instance
    mek, // Message object
    store, // Data store
    {
      from, // Sender of the message
      quoted, // Quoted message object
      body, // Message body content
      isCmd, // If the message is a command
      command, // Command name
      args, // Command arguments
      q, // Query parameter
      isGroup, // Whether the message is from a group
      sender, // Sender of the message
      senderNumber, // Sender's number
      botNumber2, // Secondary bot number
      botNumber, // Primary bot number
      pushname, // Display name of the sender
      isMe, // Whether the bot itself sent the message
      isOwner, // Whether the sender is the bot owner
      groupMetadata, // Metadata of the group
      groupName, // Name of the group
      participants, // List of group participants
      groupAdmins, // List of group admins
      isBotAdmins, // Whether the bot is an admin
      isAdmins, // Whether the sender is an admin
      reply // Function to reply to the message
    }
  ) => {
    try {
      const viewOnceData = mek.msg.contextInfo.quotedMessage.viewOnceMessageV2;
      
  
      if (viewOnceData) {
        // If the quoted message is an image
        if (viewOnceData.message.imageMessage) {
          console.log("Quoting an image");
          let caption = viewOnceData.message.imageMessage.caption;
          let savedPath = await conn.downloadAndSaveMediaMessage(viewOnceData.message.imageMessage);
  
          return conn.sendMessage(mek.chat, {
            image: { url: savedPath },
            caption: caption
          });
        }
  
        // If the quoted message is a video
        if (viewOnceData.message.videoMessage) {
          let caption = viewOnceData.message.videoMessage.caption;
          let savedPath = await conn.downloadAndSaveMediaMessage(viewOnceData.message.videoMessage);
  
          return conn.sendMessage(mek.chat, {
            video: { url: savedPath },
            caption: caption
          });
        }
      }
    } catch (error) {
      console.log("Error processing viewOnce message:", error);
    }
  
    // Handle when the quoted message is not a ViewOnce message
    if (!mek.quoted) {
      return reply("Please reply to a ViewOnce message");
    }
  
    if (mek.quoted.mtype === "viewOnceMessage") {
      console.log("Processing a ViewOnce message");
  
      // If the ViewOnce message is an image
      if (mek.quoted.message.imageMessage) {
        let caption = message.quoted.message.imageMessage.caption;
        let savedPath = await conn.downloadAndSaveMediaMessage(message.quoted.message.imageMessage);
  
        return conn.sendMessage(mek.chat, {
          image: { url: savedPath },
          caption: caption
        });
      }
  
      // If the ViewOnce message is a video
      if (mek.quoted.message.videoMessage) {
        let caption = mek.quoted.message.videoMessage.caption;
        let savedPath = await conn.downloadAndSaveMediaMessage(mek.quoted.message.videoMessage);
  
        return conn.sendMessage(mek.chat, {
          video: { url: savedPath },
          caption: caption
        });
      }
    } else {
      return reply("This is not a ViewOnce message");
    }
  })
