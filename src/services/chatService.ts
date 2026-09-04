import { ChatMessage, AppNotification } from '../types/database.types';

export const mockMessages: ChatMessage[] = [
  {
    id: 'm1',
    conversation_id: 'conv-101',
    sender_id: 'kaarigar-1',
    sender_name: 'Imran Ali',
    message: 'Assalam-o-Alaikum! I have accepted your request. I am leaving Latifabad Unit 2 now and will arrive in 14 minutes.',
    created_at: new Date(Date.now() - 600000).toISOString()
  },
  {
    id: 'm2',
    conversation_id: 'conv-101',
    sender_id: 'cust-101',
    sender_name: 'Shahid Mehmood',
    message: 'Walaikum Assalam Imran Bhai. Please bring R32 pressure gauge and capacitor tester.',
    created_at: new Date(Date.now() - 300000).toISOString()
  }
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    user_id: 'cust-101',
    type: 'JOB_ACCEPTED',
    title: 'Technician Dispatched',
    message: 'Imran Ali accepted your AC Inverter PCB request (ETA 14 mins). Doorstep PIN: #8942',
    read: false,
    created_at: new Date(Date.now() - 900000).toISOString()
  }
];

export const chatService = {
  getMessages: async (conversationId: string): Promise<ChatMessage[]> => {
    return mockMessages.filter(m => m.conversation_id === conversationId || true);
  },

  sendMessage: async (conversationId: string, senderId: string, senderName: string, text: string): Promise<ChatMessage> => {
    const newMsg: ChatMessage = {
      id: 'm-' + Date.now(),
      conversation_id: conversationId,
      sender_id: senderId,
      sender_name: senderName,
      message: text,
      created_at: new Date().toISOString()
    };
    mockMessages.push(newMsg);
    return newMsg;
  },

  getNotifications: async (): Promise<AppNotification[]> => {
    return mockNotifications;
  }
};
