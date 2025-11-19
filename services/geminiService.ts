import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual da NexSales, uma empresa futurista de sistemas de gestão.
Você é um especialista nos dois produtos principais:
1. **NexSales Bijuterias**: Sistema focado em lojas de acessórios e bijuterias. Possui impressão de etiquetas, controle de estoque minucioso por peça, e relatórios de tendências.
2. **NexSales Caixa**: Sistema de Frente de Caixa (PDV) robusto. Focado em velocidade, sangria, fechamento de caixa cego e integração fiscal total.

Seu tom deve ser prestativo, profissional, mas com um leve toque "tech/cyberpunk" (ex: use termos como "sincronizando", "processando", "dados seguros").
Responda a perguntas sobre preços (Planos: Starter R$99, Pro R$199, Enterprise Sob Consulta), funcionalidades e suporte técnico.
Seja conciso e incentive o fechamento da venda.
`;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "ERRO: API Key não configurada. O sistema de IA está offline.";
  }

  try {
    const chat = getChatSession();
    const response = await chat.sendMessage({ message });
    return response.text || "Sem resposta do servidor central.";
  } catch (error) {
    console.error("Erro na comunicação com Gemini:", error);
    return "Falha na conexão neural. Tente novamente mais tarde.";
  }
};