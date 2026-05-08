import api from "../../../lib/api";

export async function sendMessage(messages) {
  const response = await api.post("/ai_tutor/chat", {
    messages,
  });

  return response.data;
}