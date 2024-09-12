import React, { useState } from "react";

const SendMessage = ({ sender, conversationId }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = null;
    if (file) {
      const formData = new FormData();
      formData.append('attachment', file);

      try {
        const uploadResponse = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload file');
        }
        const uploadData = await uploadResponse.json();
        fileUrl = uploadData.fileUrl;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    try {
      const response = await fetch('/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          sender,
          conversationId,
          fileUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Clear input fields after successful message sending
      setContent("");
      setFile(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Message:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Attach file:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
