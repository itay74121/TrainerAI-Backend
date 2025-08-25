import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Schema matching the shape used in AgentRequest
export const AgentRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'system', 'assistant']),
      content: z.string(),
    })
  ),
  newMessage: z.object({
    role: z.string(),
    content: z.string(),
  }),
  time: z.union([z.date(), z.string()]),
  uid: z.object({
    uid: z.string(),
    name: z.string().nullable().optional(),
    email: z.string().optional(),
  }),
});

export const validateAgentRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = AgentRequestSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ status: 'invalid_request', errors: result.error.issues });
    return;
  }
  // Normalize body to the parsed shape
  req.body = result.data as any;
  next();
};

export type AgentRequestFromSchema = z.infer<typeof AgentRequestSchema>;


