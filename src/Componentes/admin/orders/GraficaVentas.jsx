import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

function GraficaVentas({ datosGrafica }) {
  return (
    <>
      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px",
          fontFamily: "sans-serif",
        }}
      >
        📈 Ventas por Mes{" "}
      </h2>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosGrafica}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="mes" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(value)
              }
            />

            <Bar dataKey="ventas" maxBarSize={120} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default GraficaVentas;
