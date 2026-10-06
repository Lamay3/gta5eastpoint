vimport { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const configs = await base44.asServiceRole.entities.ServerConfig.list();
    const config = configs[0];

    const now = Date.now();
    const startedAt = config?.started_at ? new Date(config.started_at).getTime() : null;
    const nextRestart = config?.next_restart_at ? new Date(config.next_restart_at).getTime() : null;
    const uptimeSeconds = startedAt ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0;

    const baseResult = {
      online: false,
      hostname: config?.server_name || '',
      players: 0,
      max_players: 0,
      player_list: [],
      uptime_seconds: uptimeSeconds,
      next_restart: config?.next_restart_at || null,
      configured: !!(config?.status_host)
    };

    if (!config?.status_host) {
      return Response.json(baseResult);
    }

    const host = String(config.status_host).replace(/^https?:\/\//, '').replace(/\/$/, '');
    const port = config.status_port ? String(config.status_port) : '';
    const base = `http://${host}${port ? ':' + port : ''}`;

    let dynamic = null;
    let players = [];
    try {
      const dRes = await fetch(`${base}/dynamic.json`);
      if (dRes.ok) dynamic = await dRes.json();
    } catch (e) {}
    try {
      const pRes = await fetch(`${base}/players.json`);
      if (pRes.ok) players = await pRes.json();
    } catch (e) {}

    const online = !!dynamic;
    return Response.json({
      ...baseResult,
      online,
      hostname: dynamic?.hostname || config.server_name || '',
      players: dynamic?.clients ?? players.length ?? 0,
      max_players: dynamic?.maxclients ?? 0,
      player_list: Array.isArray(players) ? players.slice(0, 100).map((p) => ({
        id: p.id,
        name: p.name,
        ping: p.ping
      })) : []
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}