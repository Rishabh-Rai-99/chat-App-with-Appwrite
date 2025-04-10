import { useEffect, useState } from "react";
import client, { databases } from "../appwrite/config.js";
import { ID, Query, Role, Permission } from "appwrite";
import { FaTrashAlt } from "react-icons/fa";
import Header from "../components/Header.jsx";
import { useAuth } from "../utils/AuthContext.jsx";


function Room() {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(`databases.${import.meta.env.VITE_DATABASE_ID}.collections.${import.meta.env.VITE_COLLECTION_ID}.documents`, response => { 
      
    const { events, payload } = response;

      if (events.includes(`databases.*.collections.*.documents.*.create`)) {
        console.log("message was created");
        setMessages((prev) => [payload, ...prev]);
      }
      if (response.events.includes(`databases.*.collections.*.documents.*.delete`)) {
        console.log("message was deleted");
        setMessages(prevState =>
          prevState.filter((message) => message.$id !== payload.$id)
        );
        }
  });

  return ()=>{
    unsubscribe()
  }

  }, []);

  const getMessages = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      setMessages(response.documents);
      console.log("Documents:", response);
    } catch (error) {
      console.error("Error Fetching Documents:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id:user.$id,
      username:user.name,
      body:messageBody
    }

    const permissions = [
        Permission.write(Role.user(user.$id))
    ]

    const response = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      ID.unique(),
      payload,
      permissions
    );
    
    // setMessages((prev) => [response, ...prev]);

    setMessageBody("");
  };

  const deleteMessage = async (message_id) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        message_id,
        
      );
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  

  return (
    <>

      <main className="w-full overflow-hidden text-white flex flex-col items-center h-screen bg-[rgba(20,20,31,11)]">
      <Header  />
        <div className="bg-[#22222d] border-2 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-0 border-[rgba(40,41,57,1)] w-[100%]  md:w-[40%] p-4 h-[100%] md:h-[80%] rounded-b-xl  mx-auto">
          <form onSubmit={handleSubmit}>
            <div>
              <textarea
                className="w-full bg-[rgba(20,20,31,11)] max-h-40 p-2 rounded-lg border-none outline-none"
                required
                maxLength="1000"
                placeholder="Say Something..."
                onChange={(e) => {
                  setMessageBody(e.target.value);
                }}
                value={messageBody}
              ></textarea>
            </div>
            <div className="flex justify-end ">
              <input
                className="bg-[#55c6e3] focus:bg-[#50a0b4] cursor-pointer font-semibold text-black p-2 rounded-lg"
                type="submit"
                value="Send"
              />
            </div>
          </form>
          {messages.map((message) => (
            <div className=" flex gap-4 flex-col" key={message.$id}>
              <div className="mt-6 flex justify-between">
                <p>
                  {message?.username ? (
                    <span>{message.username}</span>
                  ):(
                    <span>'anonymous user'</span>
                  )}
                </p>
                <p>
                  {new Date(message.$createdAt).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </p>
                  
                  { message.$permissions.includes(`delete(\"user:${user.$id}\")`) &&
                <button onClick={()=>deleteMessage(message.$id)} className="hover:text-[rgba(219,26,90,1)] cursor-pointer">
                  <FaTrashAlt />
                </button>
}
              </div>
              <div className="max-w-[70%] w-fit">
                <span className="break-words  md:text-lg  bg-[rgba(219,26,90,1)] rounded-xl p-3 text-md block">
                  {message.body}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Room;
