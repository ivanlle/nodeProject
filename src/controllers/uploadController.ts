import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs-extra';
import path from 'path';

export const uploadProfilePicture = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.isMultipart()) {
    return reply.status(400).send('Request is not multipart');
  }

  const data = await request.file();

  if (!data) {
    return reply.status(404).send('No file uploaded');
  }

  const uploadDir = path.join(__dirname, '../../uploads');
  await fs.ensureDir(uploadDir);

  const filePath = path.join(uploadDir, data.filename);
  await fs.writeFile(filePath, await data.toBuffer());

  reply.send({ message: 'File uploaded successfully', filePath });
};