// components/Section.js
export default function Section({ title, children }) {
  return (
    <div style={{ marginTop: 30 }}>
      <h1>{title}</h1>
      <div
        style={{
          padding: 20,
          background: "#f7f7f7",
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}
