import { Request } from 'express';

interface CustomRequest extends Request {
  user: { id: string }; // Modify this type according to your user object structure
}

export default CustomRequest;
