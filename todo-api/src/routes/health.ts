import { Router, Request, Response } from 'express';

const router = Router();

interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
}

router.get('/', (_req: Request, res: Response<HealthResponse>) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

router.get('/live', (_req: Request, res: Response<{ status: string }>) => {
  res.json({ status: 'ok' });
});

router.get('/ready', (_req: Request, res: Response<{ status: string }>) => {
  res.json({ status: 'ok' });
});

export { router as healthRouter };
