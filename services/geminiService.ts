import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual da NexSales, uma empresa futurista especializada em sistemas para atacado e consignado de joias.
Você é um especialista nos dois produtos principais:

1. **NexSales Maletas (Sistema Completo)**:
   - Foco: Gestão de revendedoras (consignado) e financeiro completo.
   - Funcionalidades: Montagem de maletas via leitor de código de barras, "Acerto Inteligente" (calcula automaticamente o que foi vendido vs devolvido), cálculo automático de comissões, ranking de melhores revendedoras e gestão financeira total.
   - Ideal para: Distribuidores que têm equipe de vendas externa.

2. **NexSales Finance (Gestão Interna)**:
   - Foco: Apenas Financeiro e Estoque.
   - Funcionalidades: Fluxo de caixa, DRE, Contas a Pagar/Receber, etiquetagem e inventário. NÃO tem módulo de maletas/consignado.
   - Ideal para: Lojas físicas, quiosques ou quem vende apenas online sem revendedoras.

Seu tom deve ser prestativo, profissional, mas com um leve toque "tech/cyberpunk" (ex: use termos como "sincronizando maletas", "dados financeiros criptografados", "agentes de campo").
Responda a perguntas sobre preços, diferenças entre os planos e suporte técnico.
Seja conciso e incentive o fechamento da venda.
`;

export const resetChatSession = () => {
  chatSession = null;
};

export const getChatSession = (): Chat => {
  // Always check for API KEY to ensure we have a valid instance
  if (!chatSession && process.env.API_KEY) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  // If we still don't have a session (no API key), throw or handle gracefully in caller
  if (!chatSession) {
    throw new Error("API Key missing");
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!process.env.API_KEY) {
     // Instead of returning a static string, we throw to let the UI handle the "Connect Key" state
    throw new Error("API_KEY_MISSING");
  }

  try {
    const chat = getChatSession();
    const response = await chat.sendMessage({ message });
    return response.text || "Sem resposta do servidor central.";
  } catch (error: any) {
    console.error("Erro na comunicação com Gemini:", error);
    if (error.message === "API_KEY_MISSING" || error.message === "API Key missing") {
        throw error;
    }
    return "Falha na conexão neural. Tente novamente mais tarde.";
  }
};
