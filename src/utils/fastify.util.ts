import { FastifyAdapter } from '@nestjs/platform-fastify';
import { IncomingMessage } from 'http';
import qs from 'qs';

export const getAdapter = () =>
  new FastifyAdapter({
    rewriteUrl: (req) => req.url.replace(/ws.*?\//, ''),
    // because client currently use qs to stringify
    querystringParser: (str) => qs.parse(str),
    bodyLimit: 20_024_000,
  });
