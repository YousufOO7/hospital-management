export function getChatSessionId(): string {
  if (typeof window === "undefined") {
    throw new Error("Cannot access localStorage on the server");
  }

  let id = localStorage.getItem("chatSession");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chatSession", id);
  }
  return id;
}