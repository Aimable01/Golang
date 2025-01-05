import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Auth layout</p>
      <Outlet />
    </div>
  );
}
