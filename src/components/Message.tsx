// components/Message.tsx
import React from "react";
import { observer } from "mobx-react-lite";
import messageStore from "../stores/messageStore";

const Message: React.FC = observer(() => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2">
      {messageStore.errorMessage && (
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-2">
          {messageStore.errorMessage}
        </div>
      )}
      {messageStore.successMessage && (
        <div className="bg-green-500 text-white px-4 py-2 rounded mb-2">
          {messageStore.successMessage}
        </div>
      )}
    </div>
  );
});

export default Message;
