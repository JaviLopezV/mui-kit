"use client";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import BoltIcon from "@mui/icons-material/Bolt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  AppShell,
  Button,
  DataTable,
  EmptyState,
  FeatureCard,
  HeroBanner,
  PageHeader,
  SearchField,
  Section,
  StatCard,
} from "@JaviLopezV/mui-kit";

const orders = [
  { id: "#1042", customer: "Lucía Pérez", total: "€148", status: "Pagado" },
  {
    id: "#1043",
    customer: "Mario Santos",
    total: "€82",
    status: "Preparación",
  },
  { id: "#1044", customer: "Irene Vidal", total: "€231", status: "Enviado" },
];

function DemoPage() {
  return (
    <AppShell
      title="Acme UI Kit"
      actions={
        <>
          <Button color="secondary">Secundario</Button>
          <Button color="dystopia">Distópico</Button>
        </>
      }
    >
      <Stack spacing={4}>
        <HeroBanner
          eyebrow="Sistema visual"
          title="Componentes listos para React y Next.js"
          description="Todos los componentes comparten una base visual clara: azul agradable como principal, blanco con borde azul como secundario y una variante distópica para acciones potentes."
          actions={
            <>
              <Button>Primario</Button>
              <Button color="secondary">Secundario</Button>
              <Button color="dystopia">Distópico</Button>
            </>
          }
        />

        <PageHeader
          eyebrow="Dashboard"
          title="Resumen"
          subtitle="Ejemplo de uso con botones, tarjetas, tablas y estados vacíos."
        />

        <div className="acme-card-grid">
          <StatCard
            label="Pedidos"
            value="1.284"
            helperText="Últimos 30 días"
            icon={<BoltIcon fontSize="small" />}
          />
          <StatCard
            label="Conversión"
            value="4.8%"
            helperText="+0.9%"
            icon={<AnalyticsIcon fontSize="small" />}
          />
          <StatCard
            label="Stock"
            value="96%"
            helperText="Sin incidencias"
            icon={<Inventory2Icon fontSize="small" />}
          />
        </div>

        <Section
          title="Módulos"
          subtitle="Cards reutilizables para paneles, listados o landings."
        >
          <div className="acme-card-grid">
            <FeatureCard
              title="Pedidos"
              description="Visualiza pedidos, estados y embudos de conversión."
              badge="Core"
            />
            <FeatureCard
              title="Clientes"
              description="Consulta usuarios activos y segmentos de crecimiento."
              badge="CRM"
            />
            <FeatureCard
              title="Analítica"
              description="Métricas operativas y eventos clave en tiempo real."
              badge="Data"
            />
          </div>
        </Section>

        <Section
          title="Tabla"
          subtitle="DataTable genérica con tipado."
          actions={
            <SearchField placeholder="Buscar pedido" sx={{ width: 280 }} />
          }
        >
          <DataTable
            rows={orders}
            columns={[
              { key: "id", header: "Pedido", render: (row) => row.id },
              {
                key: "customer",
                header: "Cliente",
                render: (row) => row.customer,
              },
              {
                key: "total",
                header: "Total",
                align: "right",
                render: (row) => row.total,
              },
              { key: "status", header: "Estado", render: (row) => row.status },
            ]}
          />
        </Section>

        <Section title="Estado vacío">
          <EmptyState
            title="No hay resultados"
            description="Puedes crear un nuevo recurso o ajustar los filtros de búsqueda."
            action={<Button color="secondary">Crear recurso</Button>}
          />
        </Section>

        <Typography color="text.secondary">
          Este ejemplo importa el provider desde la librería y consume todos los
          componentes sobre el mismo tema.
        </Typography>
      </Stack>
    </AppShell>
  );
}

export default function Page() {
  return <DemoPage />;
}
