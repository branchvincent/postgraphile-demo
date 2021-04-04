import { Command } from "@oclif/command";
import createClient from './client';

interface QueryHandlerProps {
    command: Command;
    query: string;
    variables?: Record<string, any>;
}

export default async function handler({ command, query, variables }: QueryHandlerProps) {
    const client = createClient();
    try {
        const result = await client.request(query, variables);
        return command.log(result);
    } catch (input) {
        return command.error(input);
    }
};
