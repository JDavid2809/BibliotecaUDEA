import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    const result = streamText({
        model: openai('gpt-4-turbo'),
        system: "You are a helpful virtual library assistant. Your role is to assist students in finding resources, answering questions about the library's services, and providing general academic guidance. Be friendly, patient, and informative.",
        messages,
    });
    return result.toDataStreamResponse();
}