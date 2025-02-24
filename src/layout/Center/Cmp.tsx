export default function Cmp({ cmp }) {
  const { style, value } = cmp;
  return <div style={style}>{value}</div>;
}
