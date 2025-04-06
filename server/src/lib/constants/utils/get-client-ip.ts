import { Request } from 'express';

export function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const rawIp =
    typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : req.socket.remoteAddress || req.ip || 'unknown';

  // IPv6 localhost 처리
  if (rawIp === '::1') return '127.0.0.1';

  // IPv6에서 IPv4 추출
  if (rawIp?.startsWith('::ffff:')) {
    return rawIp.replace('::ffff:', '');
  }

  return rawIp;
}
