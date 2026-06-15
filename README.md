# Blue & Green Hotel

Production hotel web application with a **blue/green** frontend: two themed frontends (winter on blue, summer on green) backed by a shared Node.js API. Deploy updates to the inactive slot, validate, then promote traffic with no downtime.

## Stack

- **Backend** — Express (`/api/hotel`, `/api/menu`, `/api/promotion`, `/api/health`)
- **Frontend** — Static HTML/CSS/JS served by nginx, built per slot and theme

## Run locally

```bash
docker compose up --build
```

| Service        | URL                   | Theme / slot      |
|----------------|-----------------------|-------------------|
| Backend API    | http://localhost:8080 | —                 |
| Frontend blue  | http://localhost:8081 | Winter · blue     |
| Frontend green | http://localhost:8082 | Summer · green    |

Stop with `Ctrl+C`, or `docker compose down`.

## Project layout

```text
backend/          API server
frontend/         nginx + themes (winter, summer)
docker-compose.yml
```

Each frontend image is built with a deploy slot (`blue` or `green`) and theme at build time, matching the blue/green rollout pattern used in production.

## License

MIT
